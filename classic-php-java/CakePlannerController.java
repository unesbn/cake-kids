package com.tinytreats.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

import java.io.Serializable;
import java.util.*;

/**
 * REST controller for TinyTreats Mini-Cake Recipes & Celebration Planner APIs.
 * Supports Spring Boot 3+ standard web routing.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CakePlannerController {

    // Mock Database Repository simulation using Spring JPA references
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private PlannerEventRepository plannerEventRepository;

    // 1. GET /api/recipes - Fetch all sweet bento cakes
    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeEntity>> getAllRecipes() {
        try {
            List<RecipeEntity> recipes = recipeRepository.findAll();
            return new ResponseEntity<>(recipes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. GET /api/planner - Fetch planned events for children parties
    @GetMapping("/planner")
    public ResponseEntity<List<PlannerEventEntity>> getPlannerEvents() {
        try {
            return new ResponseEntity<>(plannerEventRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 3. POST /api/planner - Save designed treat onto calendar database
    @PostMapping("/planner")
    public ResponseEntity<?> addPlannerEvent(@Valid @RequestBody PlannerEventRequest request) {
        try {
            Optional<RecipeEntity> recipeOpt = recipeRepository.findById(request.getRecipeId());
            if (recipeOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Recipe Sweet ID not found."));
            }

            PlannerEventEntity event = new PlannerEventEntity();
            event.setDay(request.getDay());
            event.setRecipe(recipeOpt.get());
            event.setMealType(request.getMealType());
            event.setKidsCount(request.getKidsCount());

            PlannerEventEntity saved = plannerEventRepository.save(event);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Database execution error: " + e.getMessage()));
        }
    }

    // 4. DELETE /api/planner/{id} - Remove scheduled item
    @DeleteMapping("/planner/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable("id") Long id) {
        try {
            if (!plannerEventRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Event slot ID does not exist."));
            }
            plannerEventRepository.deleteById(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Treat event deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Failed to delete: " + e.getMessage()));
        }
    }

    // ----------------------------------------------------
    // Nested Spring Boot Request Models & Database Entities
    // ----------------------------------------------------

    public static class PlannerEventRequest {
        @NotBlank(message = "Day is required")
        private String day;

        @NotBlank(message = "Recipe ID is required")
        private String recipeId;

        @NotBlank(message = "Meal / Occasion slot is required")
        private String mealType;

        @Min(value = 1, message = "Leo portion count must be at least 1")
        private int kidsCount = 1;

        // Getters and Setters
        public String getDay() { return day; }
        public void setDay(String d) { this.day = d; }
        public String getRecipeId() { return recipeId; }
        public void setRecipeId(String rId) { this.recipeId = rId; }
        public String getMealType() { return mealType; }
        public void setMealType(String m) { this.mealType = m; }
        public int getKidsCount() { return kidsCount; }
        public void setKidsCount(int k) { this.kidsCount = k; }
    }
}

// ----------------------------------------------------
// Entity representations mapping perfectly to our SQL DDL schemas
// ----------------------------------------------------

@Entity
@Table(name = "recipes")
class RecipeEntity implements Serializable {
    @Id
    private String id;
    private String name;
    private String tagline;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String category;
    private String imageUrl;
    private int prepTime;
    private int cookTime;
    private int servings;
    private String suitableAge;
    private String sweetnessRating;
    private String difficulty;
    private int calories;
    private double protein;
    private double carbs;
    private double fat;
    private double sugar;

    // Getters and Setters...
    public String getId() { return id; }
    public String getName() { return name; }
    public double getSugar() { return sugar; }
}

@Entity
@Table(name = "planner_events")
class PlannerEventEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id", nullable = false)
    private RecipeEntity recipe;

    private String mealType;
    private int kidsCount;

    // Getters and Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }
    public RecipeEntity getRecipe() { return recipe; }
    public void setRecipe(RecipeEntity r) { this.recipe = r; }
    public String getMealType() { return mealType; }
    public void setMealType(String m) { this.mealType = m; }
    public int getKidsCount() { return kidsCount; }
    public void setKidsCount(int k) { this.kidsCount = k; }
}

// Repositories Interface representations boilerplate placeholder
interface RecipeRepository {
    List<RecipeEntity> findAll();
    Optional<RecipeEntity> findById(String id);
}
interface PlannerEventRepository {
    List<PlannerEventEntity> findAll();
    PlannerEventEntity save(PlannerEventEntity event);
    boolean existsById(Long id);
    void deleteById(Long id);
}
