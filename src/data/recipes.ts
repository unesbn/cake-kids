import { Recipe } from "../types";

export const RECIPES: Recipe[] = [
  {
    id: "rainbow-bento",
    name: "Sweet Rainbow Bento Cake",
    tagline: "A beautiful 4-inch mini birthday bento cake with vanilla buttercream and rainbow stars",
    description: "The ultimate sweet 'smoll' bento cake designed for little celebrations. It uses a soft classic sponge baked with real butter and sweet milk, layered and smothered with rich pink buttercream icing and a generous crown of rainbow candy star sprinkles.",
    category: "Bento Cakes",
    imageUrl: "/src/assets/images/rainbow_bento_cake_1780844606590.png",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    suitableAge: "Kids & Toddlers 3y+",
    sweetnessRating: "Sugary Dream!",
    ingredients: [
      { name: "All-Purpose Cake Flour", amount: 120, unit: "g", category: "Pantry & Sugar" },
      { name: "Caster Sugar", amount: 100, unit: "g", category: "Pantry & Sugar" },
      { name: "Unsalted Butter (softened)", amount: 80, unit: "g", category: "Butter & Dairy" },
      { name: "Eggs (beaten)", amount: 2, unit: "large", category: "Butter & Dairy" },
      { name: "Whole Milk", amount: 50, unit: "ml", category: "Butter & Dairy" },
      { name: "Baking Powder", amount: 1, unit: "tsp", category: "Pantry & Sugar" },
      { name: "Pure Vanilla Extract", amount: 1, unit: "tsp", category: "Pantry & Sugar" },
      { name: "Icing Sugar (for buttercream)", amount: 150, unit: "g", category: "Pantry & Sugar" },
      { name: "Softened Butter (for buttercream)", amount: 75, unit: "g", category: "Butter & Dairy" },
      { name: "Pink Icing Gel Color", amount: 2, unit: "drops", category: "Decor & Sprinkles" },
      { name: "Rainbow Star Sprinkles", amount: 30, unit: "g", category: "Decor & Sprinkles" }
    ],
    instructions: [
      "Preheat your oven to 175°C (345°F). Butter and line two mini 4-inch (10cm) cake tins with parchment paper.",
      "In a medium bowl, cream the softened butter (80g) and caster sugar together with an electric whisk until pale, light, and fluffy.",
      "Slowly add the beaten eggs one by one, continuously whisking. Fold in the vanilla extract.",
      "Sift the cake flour and baking powder into the bowl. Add the whole milk and fold gently with a rubber spatula until the batter is smooth and uniform.",
      "Divide the batter evenly between the two mini cake tins. Smooth the tops.",
      "Bake for 22-25 minutes, or until golden and a toothpick inserted in the center comes out clean. Let cool completely on a wire rack.",
      "Prepare your buttercream frosting: Whip 75g of very soft butter with 150g of icing sugar and the pink gel color until a fluffy, sweet, bubblegum-pink icing forms.",
      "Level the tops of the mini cakes. Place the first layer on a small plate, spread a thick layer of frosting, and place the second layer on top.",
      "Frost the entire mini cake with the remaining pink buttercream, leaving a slightly textured rustic finish. Toss a mountain of rainbow star sprinkles on top!"
    ],
    nutritionalInfo: {
      calories: 280,
      protein: 3.5,
      carbs: 42.0,
      fat: 11.2,
      sugar: 28.5
    },
    substitutions: [
      {
        original: "Caster Sugar",
        substitute: "Brown Sugar",
        ratio: "1:1",
        whyItWorks: "Gives the mini cake a deeper, caramel-molasses flavor and a fudgy crumb."
      },
      {
        original: "Milk",
        substitute: "Condensed Milk (for ultra-rich finish)",
        ratio: "1:1 override",
        whyItWorks: "Makes the small bakes super moist, rich, and sweet!"
      }
    ],
    bakerTips: [
      "To get pristine sides on a tiny bento cake, chill the cakes in the freezer for 15 minutes before frosting to lock in loose crumbs."
    ],
    difficulty: "Friendly Baker"
  },
  {
    id: "dino-cupcakes",
    name: "Dino Candy Choco-Cupcakes",
    tagline: "Fluffy chocolate muffin cups topped with rich milk chocolate frosting and candy dinosaurs",
    description: "Cute, bouncy mini chocolate cupcakes topped with creamy fudge swirl. These are bite-sized delights with zero heavy whole grains — just pure chocolate-chip goodness, standard sweet sugar, and crunchy mini-dinosaur candies.",
    category: "Cupcakes",
    imageUrl: "/src/assets/images/dino_cupcakes_1780844621984.png",
    prepTime: 15,
    cookTime: 18,
    servings: 12,
    suitableAge: "Kids 2y+",
    sweetnessRating: "Double Choco Rush!",
    ingredients: [
      { name: "Plain Cake Flour", amount: 150, unit: "g", category: "Pantry & Sugar" },
      { name: "Granulated Sugar", amount: 120, unit: "g", category: "Pantry & Sugar" },
      { name: "Cocoa Powder", amount: 30, unit: "g", category: "Pantry & Sugar" },
      { name: "Unsalted Butter (melted)", amount: 70, unit: "g", category: "Butter & Dairy" },
      { name: "Semi-sweet Chocolate Chips", amount: 80, unit: "g", category: "Decor & Sprinkles" },
      { name: "Buttermilk", amount: 100, unit: "ml", category: "Butter & Dairy" },
      { name: "Egg", amount: 1, unit: "large", category: "Butter & Dairy" },
      { name: "Chocolate Fudge Frosting (piping tub)", amount: 150, unit: "g", category: "Decor & Sprinkles" },
      { name: "Candy Dinosaur Toppers", amount: 12, unit: "pieces", category: "Decor & Sprinkles" }
    ],
    instructions: [
      "Preheat the oven to 180°C (350°F). Line a 12-hole cupcake muffin tin with colorful dinosaur paper liners.",
      "In a large bowl, whisk together the dry ingredients: cake flour, granulated sugar, and cocoa powder.",
      "In a separate bowl, whisk the melted butter, buttermilk, egg, and a splash of warm water.",
      "Pour the wet mixture into the dry cocoa mixture, stirring gently with a fork until just combined. Fold in the chocolate chips.",
      "Spoon the batter into the 12 cupcake liners, filling each roughly 3/4 full.",
      "Bake for 16-18 minutes until the tops spring back when pressed gently. Let cool completely.",
      "Using a star piping nozzle, pipe high swirls of rich milk chocolate fudge frosting onto each cupcake.",
      "Triumphantly place a crunchy dinosaur candy topper right on the peak of every chocolate hill!"
    ],
    nutritionalInfo: {
      calories: 210,
      protein: 2.8,
      carbs: 29.5,
      fat: 9.8,
      sugar: 19.0
    },
    substitutions: [
      {
        original: "Buttermilk",
        substitute: "Full Fat Yogurt",
        ratio: "1:1",
        whyItWorks: "Keeps the cupcakes unbelievably soft, spongy, and decadent."
      },
      {
        original: "Candy Dinosaurs",
        substitute: "Gummy Bears",
        ratio: "1 bear per cupcake",
        whyItWorks: "A sweet chewable alternative that fits any small party animal theme!"
      }
    ],
    bakerTips: [
      "Let the cupcakes cool completely to absolute room temp. If they are even slightly warm, your chocolate fudge icing will slide right off!"
    ],
    difficulty: "Easy Peasy"
  },
  {
    id: "donut-bundt",
    name: "Glazed Mini Carnival Bundts",
    tagline: "Bite-sized baked ring cakes drenched in marshmallow glaze and sprinkles",
    description: "Adorable baked single-portion bundts that taste just like a festive carnival donut. These soft vanilla rings are coated in a warm, sweet sugar glaze that sets into a beautiful crackly shell, perfect for tiny fingers to grab.",
    category: "Mug Cakes",
    imageUrl: "/src/assets/images/mini_bundt_cakes_1780844635741.png",
    prepTime: 15,
    cookTime: 20,
    servings: 8,
    suitableAge: "Kids 2y+",
    sweetnessRating: "Glaze Heaven!",
    ingredients: [
      { name: "Self-Rising Flour", amount: 180, unit: "g", category: "Pantry & Sugar" },
      { name: "White Sugar", amount: 90, unit: "g", category: "Pantry & Sugar" },
      { name: "Egg", amount: 1, unit: "large", category: "Butter & Dairy" },
      { name: "Butter (melted)", amount: 50, unit: "g", category: "Butter & Dairy" },
      { name: "Whole Milk", amount: 80, unit: "ml", category: "Butter & Dairy" },
      { name: "Icing Sugar (for glaze)", amount: 120, unit: "g", category: "Pantry & Sugar" },
      { name: "Warm Marshmallow Fluff", amount: 30, unit: "g", category: "Decor & Sprinkles" },
      { name: "Rainbow Tens and Thousands sprinkles", amount: 20, unit: "g", category: "Decor & Sprinkles" }
    ],
    instructions: [
      "Preheat the oven to 175°C (345°F). Spray a 6-cavity or 8-cavity mini bundt mold generously with cooking grease or melted butter.",
      "Whisk flour and white sugar in a bowl. In another jug, blend the egg, melted butter, and whole milk.",
      "Stir the wet ingredients into the dry bowl until smooth. The batter will be silky and thick.",
      "Spoon or pipe into the mini bundt cavities about half-way to allow proper rising room.",
      "Bake for 18-20 minutes. Cool in the mold for 10 mins, then gently turn out onto a wire cooling rack.",
      "For the crackly glaze: whisk icing sugar, warm marshmallow fluff, and 1.5 tablespoons of boiling water until a thick, shiny pourable glaze forms.",
      "Drizzle glaze generously over the warm golden bundts, letting it cascade down the sides, and shower them with rainbow sprinkles instantly!"
    ],
    nutritionalInfo: {
      calories: 185,
      protein: 3.1,
      carbs: 34.0,
      fat: 6.2,
      sugar: 22.0
    },
    substitutions: [
      {
        original: "White Sugar",
        substitute: "Golden Syrup",
        ratio: "1:1",
        whyItWorks: "Adds a sweet, buttery crunch and golden caramel texture to the donut sponges."
      }
    ],
    bakerTips: [
      "To avoid bubbles in your mini bundts, tap the mold firmly on the kitchen counter 3-4 times before sliding it into the baking oven."
    ],
    difficulty: "Friendly Baker"
  },
  {
    id: "cookie-tarts",
    name: "Marshmallow Sparkle Cookie Tarts",
    tagline: "Chilled cookie-butter tarts layered with sweet marshmallow cream and pink dust",
    description: "Cute, sweet, single-portion refrigerated no-bake tarts. Made from standard sweet cookies and melted butter, filled with gooey marshmallow spread, and garnished with sweet white chocolate shards and bright pink sugar sparkles.",
    category: "Cake Pops",
    imageUrl: "/src/assets/images/cookie_tarts_1780844650317.png",
    prepTime: 20,
    cookTime: 60, // chilled refrigeration
    servings: 6,
    suitableAge: "Kids & Toddlers 18m+",
    sweetnessRating: "Gooey Sparkle Delight!",
    ingredients: [
      { name: "Digestive Sweet Cookies / Graham Crackers", amount: 150, unit: "g", category: "Pantry & Sugar" },
      { name: "Melted Salted Butter", amount: 60, unit: "g", category: "Butter & Dairy" },
      { name: "Marshmallow Fluff Cream", amount: 200, unit: "g", category: "Decor & Sprinkles" },
      { name: "White Chocolate Grated Shards", amount: 50, unit: "g", category: "Decor & Sprinkles" },
      { name: "Sweet Strawberry Pink Sugar", amount: 15, unit: "g", category: "Decor & Sprinkles" }
    ],
    instructions: [
      "Place your sweet cookies or graham crackers in a zip-lock bag and crush them into super fine crumbs using a rolling pin.",
      "In a bowl, combine the sweet crumbs and melted salted butter, stirring with a spoon until the texture resembles wet sand.",
      "Press the mixture firmly into small 3-inch tart rings or muffin pan holes until you form cute little crust bases. Freeze for 10 minutes.",
      "Spoon gooey white marshmallow fluff cream generously into each mini tart shell.",
      "Garnish with beautiful grated shards of premium white chocolate.",
      "Shower with sweet pink strawberry sparkling sugar.",
      "Refrigerate for 1 hour to set, then pop them out of the molds and serve chilled!"
    ],
    nutritionalInfo: {
      calories: 245,
      protein: 1.9,
      carbs: 36.5,
      fat: 10.5,
      sugar: 26.0
    },
    substitutions: [
      {
        original: "Marshmallow Fluff",
        substitute: "Nutella or Chocolate Cream spread",
        ratio: "1:1",
        whyItWorks: "Converts the tart into a heavy hazelnut-chocolate mud cake that is extremely sweet!"
      }
    ],
    bakerTips: [
      "Lightly grease your spoon when handling marshmallow fluff cream—it is extremely sticky but sweet!"
    ],
    difficulty: "Easy Peasy"
  }
];
