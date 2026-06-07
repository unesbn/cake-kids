-- --------------------------------------------------------
-- TinyTreats MySQL Database Schema
-- Compatible with MySQL 5.7+ and MySQL 8.0
-- --------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `tinytreats_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tinytreats_db`;

-- 1. Table for Sweet Kids Cakes Recipes
CREATE TABLE IF NOT EXISTS `recipes` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `tagline` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `category` VARCHAR(50) NOT NULL, -- 'Bento Cakes', 'Cupcakes', 'Mug Cakes', 'Cake Pops'
    `image_url` VARCHAR(255) NOT NULL,
    `prep_time` INT NOT NULL DEFAULT '0', -- in minutes
    `cook_time` INT NOT NULL DEFAULT '0', -- in minutes
    `servings` INT NOT NULL DEFAULT '1',
    `suitable_age` VARCHAR(55) NOT NULL,
    `sweetness_rating` VARCHAR(100) NOT NULL,
    `difficulty` VARCHAR(50) NOT NULL,
    `calories` INT NOT NULL DEFAULT '0',
    `protein` DECIMAL(5,2) NOT NULL DEFAULT '0.00',
    `carbs` DECIMAL(5,2) NOT NULL DEFAULT '0.00',
    `fat` DECIMAL(5,2) NOT NULL DEFAULT '0.00',
    `sugar` DECIMAL(5,2) NOT NULL DEFAULT '0.00',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Table for Recipe Ingredients
CREATE TABLE IF NOT EXISTS `recipe_ingredients` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `recipe_id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `unit` VARCHAR(20) NOT NULL,
    `category` VARCHAR(50) NOT NULL, -- 'Pantry & Sugar', 'Butter & Dairy', 'Decor & Sprinkles'
    PRIMARY KEY (`id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table for Celebration Planner / Scheduled Treats
CREATE TABLE IF NOT EXISTS `planner_events` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(20) NOT NULL, -- 'Monday', 'Tuesday', ...
    `recipe_id` VARCHAR(50) NOT NULL,
    `meal_type` VARCHAR(50) NOT NULL, -- 'Morning Tea', 'Afternoon Party', 'After-School Treat'
    `kids_count` INT NOT NULL DEFAULT '1',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Populate Initial Mini Sweet Cakes Seed Data
-- --------------------------------------------------------

INSERT INTO `recipes` (`id`, `name`, `tagline`, `description`, `category`, `image_url`, `prep_time`, `cook_time`, `servings`, `suitable_age`, `sweetness_rating`, `difficulty`, `calories`, `protein`, `carbs`, `fat`, `sugar`) VALUES
('rainbow-bento', 'Sweet Rainbow Bento Cake', 'A beautiful 4-inch mini birthday bento cake with vanilla buttercream and rainbow stars', 'The ultimate sweet smoll bento cake designed for little celebrations with classic sponge cake layered with butter and rich bubblegum frosting.', 'Bento Cakes', '/src/assets/images/rainbow_bento_cake_1780844606590.png', 20, 25, 4, 'Kids & Toddlers 3y+', 'Sugary Dream!', 'Friendly Baker', 280, 3.5, 42.0, 11.2, 28.5),
('dino-cupcakes', 'Dino Candy Choco-Cupcakes', 'Fluffy chocolate muffin cups topped with rich milk chocolate frosting and candy dinosaurs', 'Cute, bouncy mini chocolate cupcakes topped with creamy fudge swirl and crunchy mini-dinosaur candies.', 'Cupcakes', '/src/assets/images/dino_cupcakes_1780844621984.png', 15, 18, 12, 'Kids 2y+', 'Double Choco Rush!', 'Easy Peasy', 210, 2.8, 29.5, 9.8, 19.0),
('donut-bundt', 'Glazed Mini Carnival Bundts', 'Bite-sized baked ring cakes drenched in marshmallow glaze and sprinkles', 'Adorable baked single-portion bundts coated in a warm, sweet sugar glaze that sets into a beautiful crackly shell.', 'Mug Cakes', '/src/assets/images/mini_bundt_cakes_1780844635741.png', 15, 20, 8, 'Kids 2y+', 'Glaze Heaven!', 'Friendly Baker', 185, 3.1, 34.0, 6.2, 22.0),
('cookie-tarts', 'Marshmallow Sparkle Cookie Tarts', 'Chilled cookie-butter tarts layered with sweet marshmallow cream and pink dust', 'Cute, sweet, single-portion refrigerated no-bake tarts filed with gooey marshmallow spreads and sprinkles.', 'Cake Pops', '/src/assets/images/cookie_tarts_1780844650317.png', 20, 60, 6, 'Kids & Toddlers 18m+', 'Gooey Sparkle Delight!', 'Easy Peasy', 245, 1.9, 36.5, 10.5, 26.0);

-- Ingredients for Bento Cake
INSERT INTO `recipe_ingredients` (`recipe_id`, `name`, `amount`, `unit`, `category`) VALUES
('rainbow-bento', 'All-Purpose Cake Flour', 120, 'g', 'Pantry & Sugar'),
('rainbow-bento', 'Caster Sugar', 100, 'g', 'Pantry & Sugar'),
('rainbow-bento', 'Unsalted Butter', 80, 'g', 'Butter & Dairy'),
('rainbow-bento', 'Eggs', 2, 'qty', 'Butter & Dairy'),
('rainbow-bento', 'Whole Milk', 50, 'ml', 'Butter & Dairy'),
('rainbow-bento', 'Icing Sugar', 150, 'g', 'Pantry & Sugar'),
('rainbow-bento', 'Rainbow Star Sprinkles', 30, 'g', 'Decor & Sprinkles');

-- Ingredients for Dino Cupcakes
INSERT INTO `recipe_ingredients` (`recipe_id`, `name`, `amount`, `unit`, `category`) VALUES
('dino-cupcakes', 'Plain Cake Flour', 150, 'g', 'Pantry & Sugar'),
('dino-cupcakes', 'Granulated Sugar', 120, 'g', 'Pantry & Sugar'),
('dino-cupcakes', 'Cocoa Powder', 30, 'g', 'Pantry & Sugar'),
('dino-cupcakes', 'Semi-sweet Chocolate Chips', 80, 'g', 'Decor & Sprinkles'),
('dino-cupcakes', 'Chocolate Fudge Frosting (piping tub)', 150, 'g', 'Decor & Sprinkles'),
('dino-cupcakes', 'Candy Dinosaur Toppers', 12, 'pcs', 'Decor & Sprinkles');
