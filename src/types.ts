export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  category: string; // E.g., "Pantry & Sugar", "Butter & Dairy", "Decor & Sprinkles"
}

export interface SubstitutionGuide {
  original: string;
  substitute: string;
  ratio: string;
  whyItWorks: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number; // in g
  carbs: number; // in g
  fat: number; // in g
  sugar: number; // in g (Standard sweet cake sugar!)
}

export interface Recipe {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string; // E.g., "Bento Cakes", "Cupcakes", "Cake Pops", "Mug Cakes"
  imageUrl: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  suitableAge: string;
  sweetnessRating: string; // E.g., "Sweet Delight!", "Double Choco Rush!"
  ingredients: Ingredient[];
  instructions: string[];
  nutritionalInfo: NutritionalInfo;
  substitutions: SubstitutionGuide[];
  bakerTips: string[];
  difficulty: "Easy Peasy" | "Friendly Baker" | "Showstopper";
}

export type MealType = "Morning Snack" | "Afternoon Treat" | "Birthday/Party" | "Weekend Fun";

export interface PlannedActivity {
  id: string;
  recipeId: string;
  mealType: MealType;
  portions: number;
  notes: string;
}

export interface WeeklyPlan {
  [day: string]: PlannedActivity[];
}

export interface CustomGroceryItem {
  id: string;
  name: string;
  amount: string;
  category: string;
  checked: boolean;
}

