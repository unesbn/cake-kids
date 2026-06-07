import React, { useState } from "react";
import { 
  Search, 
  Clock, 
  Users, 
  Baby, 
  Flame, 
  ArrowRight,
  Sparkles,
  Award,
  ChevronLeft,
  PieChart,
  RotateCcw
} from "lucide-react";
import { RECIPES } from "../data/recipes";
import { Recipe } from "../types";

export default function RecipeSection() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedAge, setSelectedAge] = useState<string>("All");
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  // Servings multiplier state inside the recipe detail panel
  const [servingScale, setServingScale] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Filter recipes based on parameters
  const filteredRecipes = RECIPES.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.sweetnessRating.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === "All" || r.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || r.difficulty === selectedDifficulty;
    const matchesAge = selectedAge === "All" || r.suitableAge === selectedAge;

    return matchesSearch && matchesCat && matchesDifficulty && matchesAge;
  });

  const categories = ["All", "Bento Cakes", "Cupcakes", "Mug Cakes", "Cake Pops"];
  const ages = ["All", ...Array.from(new Set(RECIPES.map(r => r.suitableAge)))];
  
  // Handles opening detailed view
  const openRecipeDetails = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setServingScale(recipe.servings); // reset to default servings of this recipe
    setCompletedSteps([]); // reset checklist
  };

  const closeRecipeDetails = () => {
    setActiveRecipe(null);
  };

  const toggleStepCompleted = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-10" id="recipes-gallery">
      
      {/* If detailed recipe modal or pane is active */}
      {activeRecipe ? (
        <div className="bg-white border-4 border-v-teal rounded-[40px] shadow-v-lg overflow-hidden animate-fade-in text-v-teal">
          
          {/* Header Banner Image */}
          <div className="relative h-64 md:h-96 w-full bg-v-teal border-b-4 border-v-teal">
            <img
              src={activeRecipe.imageUrl}
              alt={activeRecipe.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
            {/* Soft dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-v-teal via-v-teal/40 to-transparent" />
            
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <button
                onClick={closeRecipeDetails}
                className="px-4 py-2.5 bg-white text-v-teal hover:bg-v-cream font-black text-xs uppercase tracking-wider rounded-full border-2 border-v-teal shadow-v-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Gallery</span>
              </button>

              <span className="px-4 py-1.5 bg-v-mint text-white border-2 border-v-teal font-black text-xs uppercase tracking-wider rounded-full shadow-v-sm">
                {activeRecipe.category}
              </span>
            </div>

            {/* Title Block Embedded in Banner */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-[10px] font-extrabold text-v-teal uppercase tracking-widest bg-v-yellow px-3 py-1 rounded-full border-2 border-v-teal">
                {activeRecipe.suitableAge}
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {activeRecipe.name}
              </h3>
              <p className="text-v-cream text-xs md:text-sm font-bold opacity-95">
                &ldquo;{activeRecipe.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* Recipe Content Area */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-v-cream/10">
            
            {/* Left Content Column (Ingredients, Steps, Guide) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Overviews Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b-4 border-dashed border-v-teal/20">
                <div className="bg-v-yellow/30 border-2 border-v-teal rounded-2xl p-4 text-center space-y-1">
                  <span className="text-[10px] uppercase font-black text-v-teal/60">Delight</span>
                  <p className="text-xs font-black text-v-teal leading-tight block truncate" title={activeRecipe.sweetnessRating}>
                    {activeRecipe.sweetnessRating}
                  </p>
                </div>
                <div className="bg-v-cream border-2 border-v-teal rounded-2xl p-4 text-center space-y-1">
                  <span className="text-[10px] uppercase font-black text-v-teal/60">Prep Work</span>
                  <p className="text-sm font-black text-v-teal leading-tight">
                    {activeRecipe.prepTime} Mins
                  </p>
                </div>
                <div className="bg-v-cream border-2 border-v-teal rounded-2xl p-4 text-center space-y-1">
                  <span className="text-[10px] uppercase font-black text-v-teal/60">Baking Time</span>
                  <p className="text-sm font-black text-v-teal leading-tight">
                    {activeRecipe.cookTime} Mins
                  </p>
                </div>
                <div className="bg-v-mint/20 border-2 border-v-teal rounded-2xl p-4 text-center space-y-1">
                  <span className="text-[10px] uppercase font-black text-v-teal/60">Difficulty</span>
                  <p className="text-sm font-black text-v-coral leading-tight">
                    {activeRecipe.difficulty}
                  </p>
                </div>
              </div>

              {/* Description Block */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-v-coral">The Story Behind the Bake</h4>
                <p className="text-v-teal text-sm leading-relaxed font-bold">
                  {activeRecipe.description}
                </p>
              </div>

              {/* INGREDIENTS WITH PORTION SCALER */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-v-teal/15">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-black uppercase tracking-wider text-v-teal">Required Ingredients</h4>
                    <p className="text-[11px] font-bold text-v-teal/60">Recalculates ingredient quantities instantly</p>
                  </div>

                  {/* Scaler Widget */}
                  <div className="flex items-center gap-2 bg-v-yellow border-2 border-v-teal px-3 py-1.5 rounded-2xl shrink-0 shadow-v-sm">
                    <span className="text-xs font-extrabold text-v-teal uppercase tracking-wide">Servings:</span>
                    <button
                      onClick={() => setServingScale(Math.max(1, servingScale - 1))}
                      className="w-7 h-7 bg-white hover:bg-v-cream text-v-teal rounded-lg flex items-center justify-center font-black text-sm border-2 border-v-teal cursor-pointer shadow-v-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-black text-v-teal text-base">{servingScale}</span>
                    <button
                      onClick={() => setServingScale(servingScale + 1)}
                      className="w-7 h-7 bg-white hover:bg-v-cream text-v-teal rounded-lg flex items-center justify-center font-black text-sm border-2 border-v-teal cursor-pointer shadow-v-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setServingScale(activeRecipe.servings)}
                      className="ml-1 p-1 text-v-coral hover:bg-white hover:border-2 hover:border-v-teal rounded-md transition-all cursor-pointer"
                      title="Reset Servings"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scaled Ingredients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeRecipe.ingredients.map((ing, k) => {
                    const baseSvc = activeRecipe.servings;
                    const scaledAmt = (ing.amount / baseSvc) * servingScale;
                    
                    return (
                      <div key={k} className="p-3.5 bg-white border-2 border-v-teal rounded-2xl flex items-center justify-between text-xs transition-colors shadow-v-sm">
                        <div className="space-y-1">
                          <p className="font-extrabold text-v-teal">{ing.name}</p>
                          <span className="px-2 py-0.5 bg-v-cream border border-v-teal text-v-teal font-black uppercase tracking-wider rounded text-[8px]">
                            {ing.category}
                          </span>
                        </div>
                        <span className="font-mono font-black text-v-teal bg-v-yellow border-2 border-v-teal px-2 py-1 rounded-lg">
                          {scaledAmt % 1 === 0 ? scaledAmt : scaledAmt.toFixed(1)} {ing.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP-BY-STEP INSTRUCTIONS CHECKLIST */}
              <div className="space-y-4">
                <div className="pb-2 border-b-2 border-v-teal/15">
                  <h4 className="text-sm font-black uppercase tracking-wider text-v-teal font-sans">Baking Guide & Instructions</h4>
                  <p className="text-[11px] font-bold text-v-teal/65">Check off the baking steps as you work inside your kitchen!</p>
                </div>

                <div className="space-y-4">
                  {activeRecipe.instructions.map((step, idx) => {
                    const isDone = completedSteps.includes(idx);
                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleStepCompleted(idx)}
                        className={`flex items-start gap-4 p-4 border-2 rounded-3xl cursor-pointer select-none transition-all shadow-v-sm ${
                          isDone 
                            ? "bg-v-mint/10 border-v-teal opacity-60 text-v-teal/65" 
                            : "bg-white border-v-teal text-v-teal hover:border-v-coral"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border-2 border-v-teal shadow-v-sm transition-colors ${
                          isDone ? "bg-v-mint text-white" : "bg-v-yellow text-v-teal"
                        }`}>
                          {isDone ? "✓" : idx + 1}
                        </div>
                        <p className={`text-xs md:text-sm leading-relaxed ${isDone ? "line-through font-medium" : "font-black"}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Sidebar Column (Allergen alternatives, baker tricks, nutrition stats) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* NUTRITION METRICS DISPLAY (with elegant vertical/horizontal micro charts) */}
              <div className="bg-v-teal text-white rounded-[32px] border-4 border-v-teal p-6 shadow-v-md space-y-5">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-v-yellow" />
                  <h4 className="font-black uppercase text-base tracking-tight">Portion Nutrition</h4>
                </div>

                <div className="space-y-4">
                  
                  {/* Big Number Highlight */}
                  <div className="text-center bg-white border-4 border-v-teal text-v-teal p-4 rounded-2xl shadow-v-sm">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-v-teal/60">Calories per slice</span>
                    <p className="text-4xl font-extrabold font-sans tracking-tight mt-1">
                      {activeRecipe.nutritionalInfo.calories} <span className="text-sm font-bold">kcal</span>
                    </p>
                  </div>

                  {/* Sugars Banner */}
                  <div className="bg-v-coral border-2 border-v-teal p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-v-sm font-black">
                    <span className="text-white uppercase text-[10px]">Total Sugar Content:</span>
                    <span className="px-2 py-0.5 bg-v-yellow text-v-teal border border-v-teal font-extrabold tracking-wide uppercase rounded">
                      {activeRecipe.nutritionalInfo.sugar}g Sweet Sugar
                    </span>
                  </div>

                  {/* Nutrient bars mapping */}
                  <div className="space-y-3.5 text-xs font-black uppercase tracking-tight">
                    {[
                      { label: "Pure Sweet Sugars", value: activeRecipe.nutritionalInfo.sugar, color: "bg-v-yellow", max: 45 },
                      { label: "Carbohydrates", value: activeRecipe.nutritionalInfo.carbs, color: "bg-v-mint", max: 60 },
                      { label: "Bake Proteins", value: activeRecipe.nutritionalInfo.protein, color: "bg-v-purple", max: 5 },
                      { label: "Cream & Butter Fats", value: activeRecipe.nutritionalInfo.fat, color: "bg-v-coral", max: 20 }
                    ].map((nut) => {
                      const pct = Math.min(100, (nut.value / nut.max) * 100);
                      return (
                        <div key={nut.label} className="space-y-1">
                          <div className="flex justify-between text-v-cream text-[10px]">
                            <span>{nut.label}</span>
                            <span className="text-v-yellow">{nut.value}g</span>
                          </div>
                          <div className="h-3.5 bg-black/20 rounded-full overflow-hidden border-2 border-v-teal">
                            <div className="h-full bg-v-mint transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: nut.color === 'bg-v-yellow' ? '#FFE66D' : nut.color === 'bg-v-mint' ? '#4ECDC4' : nut.color === 'bg-v-purple' ? '#A29BFE' : '#FF6B6B' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ALLERGEN REPLACEMENTS / SUBSTITUTIONS */}
              <div className="bg-v-yellow/30 border-4 border-v-teal rounded-[32px] p-6 space-y-4 text-v-teal shadow-v-md">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-v-coral animate-pulse" />
                  <h4 className="font-black uppercase text-base tracking-tight text-v-teal">Child Substitutions</h4>
                </div>

                <div className="space-y-4">
                  {activeRecipe.substitutions.map((sub, sIdx) => (
                    <div key={sIdx} className="p-4 bg-white border-2 border-v-teal rounded-2xl text-xs space-y-2 shadow-v-sm">
                      <p className="font-bold text-v-teal/70 uppercase text-[9px] tracking-wider">
                        Replacing {sub.original} with:
                      </p>
                      <p className="font-black text-v-coral text-sm uppercase">
                        {sub.substitute}
                      </p>
                      <p className="text-[11px] font-bold">
                        <strong>Ratio:</strong> {sub.ratio}
                      </p>
                      <p className="text-[11.5px] leading-relaxed pt-2 border-t-2 border-dashed border-v-teal/10 font-bold text-v-teal">
                        {sub.whyItWorks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* HANDY BAKER TRICKS */}
              <div className="bg-v-purple bg-opacity-10 border-4 border-v-teal rounded-[32px] p-6 space-y-3 text-v-teal shadow-v-md">
                <h4 className="text-xs uppercase font-black tracking-widest text-v-purple">Pro Baker Note</h4>
                <div className="space-y-2.5">
                  {activeRecipe.bakerTips.map((tip, tIdx) => (
                    <p key={tIdx} className="text-xs font-bold leading-relaxed text-v-teal">
                      ★ {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        
        // GALLERY & SEARCH FILTER VIEWS INDEX
        <div className="space-y-8 animate-fade-in text-v-teal">
          
          {/* Filter Bar Controls */}
          <div className="bg-white border-4 border-v-teal rounded-[32px] p-6 shadow-v-md space-y-5">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-v-teal w-5 h-5" />
              <input
                type="text"
                placeholder="Search bento cakes, mini cupcakes, cake pops, sprinkles, frosting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-4 border-v-teal rounded-2xl focus:outline-none focus:ring-2 focus:ring-v-coral text-sm text-v-teal placeholder-v-teal/50 font-black shadow-v-inset"
              />
            </div>

            {/* Chips filters */}
            <div className="flex flex-col gap-4 text-xs font-bold pt-2">
              
              {/* Category selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-extrabold uppercase tracking-wider text-[10px] text-v-teal/60 shrink-0 w-32">Cake Category:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full border-2 border-v-teal transition-all cursor-pointer font-black text-[11px] uppercase shadow-v-sm ${
                        selectedCategory === cat 
                          ? "bg-v-coral text-white scale-[1.03]" 
                          : "bg-v-cream hover:bg-v-yellow text-v-teal"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age recommendation filters */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t-2 border-dashed border-v-teal/10">
                <span className="font-extrabold uppercase tracking-wider text-[10px] text-v-teal/60 shrink-0 w-32">Suitable Age:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {ages.map((age) => (
                    <button
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      className={`px-3 py-1.5 rounded-full border-2 border-v-teal transition-all cursor-pointer font-black text-[11px] uppercase shadow-v-sm ${
                        selectedAge === age 
                          ? "bg-v-teal text-white scale-[1.03]" 
                          : "bg-v-cream hover:bg-v-yellow text-v-teal"
                      }`}
                    >
                      {age === "All" ? "All Ages" : age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recipes Card Grid - Showing visually attractive recipes */}
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16 bg-white border-4 border-dashed border-v-teal rounded-[40px] space-y-4">
              <Users className="w-12 h-12 text-v-teal/30 mx-auto" />
              <p className="text-v-teal font-black text-base uppercase">We couldn't find any recipes matching your tags.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedAge("All");
                }}
                className="text-xs bg-v-coral text-white border-2 border-v-teal shadow-v-sm rounded-full px-4 py-2 font-black uppercase hover:translate-y-0.5 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRecipes.map((recipe) => (
                <div 
                  key={recipe.id}
                  onClick={() => openRecipeDetails(recipe)}
                  className="group bg-white border-4 border-v-teal rounded-[40px] overflow-hidden hover:shadow-v-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col shadow-v-md text-v-teal"
                >
                  
                  {/* Thumbnail Image display */}
                  <div className="relative aspect-video w-full bg-v-cream overflow-hidden border-b-4 border-v-teal">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Age Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-v-teal text-white border-2 border-v-teal font-black rounded-full text-[10px] tracking-wide shadow-v-sm">
                        {recipe.suitableAge}
                      </span>
                    </div>

                    {/* Sweetener code overlay bottom */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-v-cream/95 text-v-teal px-3 py-1.5 rounded-2xl border-2 border-v-teal shadow-v-sm font-black">
                      <span className="text-[10px] uppercase tracking-widest text-v-coral">
                        🍬 {recipe.sweetnessRating}
                      </span>
                      <span className="text-[10px] font-black uppercase flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-v-teal" />
                        {recipe.cookTime + recipe.prepTime}m
                      </span>
                    </div>
                  </div>

                  {/* Body Text details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-v-mint uppercase tracking-widest bg-v-mint/10 border border-v-mint px-2 py-0.5 rounded">
                          {recipe.category}
                        </span>
                        <span className="text-[11px] font-black text-v-coral flex items-center gap-0.5">
                          ★ {recipe.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="font-black text-xl text-v-teal font-sans tracking-tight leading-snug uppercase group-hover:text-v-coral transition-colors">
                        {recipe.name}
                      </h3>
                      
                      <p className="text-v-teal/80 text-xs font-bold leading-relaxed line-clamp-2">
                        {recipe.tagline}
                      </p>
                    </div>

                    <div className="pt-4 border-t-2 border-dashed border-v-teal/10 flex items-center justify-between text-xs text-v-coral font-black group-hover:translate-x-1.5 transition-transform">
                      <span className="uppercase tracking-wider">Explore Baking Steps</span>
                      <ArrowRight className="w-4 h-4 shrink-0 border-2 border-v-teal rounded-full p-0.5 bg-v-yellow text-v-teal shadow-v-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
