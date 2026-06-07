<?php
/**
 * TinyTreats PHP REST API Backend
 * Outputs JSON content for our classic frontend HTML to display & plan mini cakes.
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 1. Connection Configurations (Adjust to your local MySQL Setup)
$host = "localhost";
$db_name = "tinytreats_db";
$username = "root";
$password = ""; // Your MySQL password

try {
    $pdo = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $exception) {
    http_response_code(500);
    echo json_encode(["error" => "Database Connection Failed: " . $exception->getMessage()]);
    exit();
}

// 2. Fetch Request URL Action Endpoint Routing
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    
    // GET /api.php?action=recipes - Fetches all delicious mini cakes
    case 'recipes':
        try {
            $stmt = $pdo->prepare("SELECT * FROM recipes");
            $stmt->execute();
            $recipes = $stmt->fetchAll();
            
            // Nested ingredient lists inside each recipe
            foreach ($recipes as &$recipe) {
                $ing_stmt = $pdo->prepare("SELECT name, amount, unit, category FROM recipe_ingredients WHERE recipe_id = ?");
                $ing_stmt->execute([$recipe['id']]);
                $recipe['ingredients'] = $ing_stmt->fetchAll();
            }
            
            echo json_encode($recipes);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    // GET /api.php?action=planner - Fetches list of planned party cake events
    case 'planner':
        try {
            $stmt = $pdo->prepare("
                SELECT p.id, p.day, p.meal_type, p.kids_count, r.name as recipe_name, r.id as recipe_id, r.category
                FROM planner_events p
                INNER JOIN recipes r ON p.recipe_id = r.id
                ORDER BY p.id DESC
            ");
            $stmt->execute();
            echo json_encode($stmt->fetchAll());
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    // POST /api.php?action=add_planner - Adds a custom designed sweet treat to the calendar database
    case 'add_planner':
        $raw_data = file_get_contents("php://input");
        $data = json_decode($raw_data, true);
        
        if (empty($data['day']) || empty($data['recipe_id']) || empty($data['meal_type'])) {
            http_response_code(400);
            echo json_encode(["error" => "Incomplete request parameters (day, recipe_id, and meal_type are required)"]);
            break;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO planner_events (day, recipe_id, meal_type, kids_count) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['day'],
                $data['recipe_id'],
                $data['meal_type'],
                isset($data['kids_count']) ? (int)$data['kids_count'] : 1
            ]);
            
            echo json_encode(["status" => "success", "message" => "Mini cake scheduled onto calendar successfully!"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    // DELETE /api.php?action=delete_planner&id=X - Removes a planned event
    case 'delete_planner':
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid ID parameter specified."]);
            break;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM planner_events WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Item removed from party list!"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Welcome to TinyTreats Backend Rest API! Use ?action=recipes or ?action=planner endpoints."]);
        break;
}
?>
