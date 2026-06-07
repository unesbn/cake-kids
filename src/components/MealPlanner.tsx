import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Trash2, 
  Plus, 
  Printer, 
  CheckCircle2, 
  CheckSquare, 
  Square, 
  PlusCircle, 
  Sparkles,
  Info,
  UtensilsCrossed
} from "lucide-react";
import { RECIPES } from "../data/recipes";
import { WeeklyPlan, PlannedActivity, MealType, CustomGroceryItem } from "../types";

export default function MealPlanner() {
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const MEAL_TYPES: MealType[] = ["Morning Snack", "Afternoon Treat", "Birthday/Party", "Weekend Fun"];

  // Initialize weekly plan from localStorage or empty state
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(() => {
    const saved = localStorage.getItem("healthy_kids_weekly_plan");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    const defaultState: WeeklyPlan = {};
    DAYS.forEach((d) => { defaultState[d] = []; });
    return defaultState;
  });

  // Custom grocery items added manually by parents
  const [customItems, setCustomItems] = useState<CustomGroceryItem[]>(() => {
    const saved = localStorage.getItem("healthy_kids_custom_groceries");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: "c1", name: "Biodegradable cake liners", amount: "1 pack", category: "Pantry & Baking", checked: false },
      { id: "c2", name: "Sparkler Birthday Candles", amount: "1 pack", category: "Other", checked: false }
    ];
  });

  // Checklist of recipe-derived ingredients
  const [crossedIngredients, setCrossedIngredients] = useState<string[]>(() => {
    const saved = localStorage.getItem("healthy_kids_crossed_ingredients");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // State to manage modal/form inputs for adding plans
  const [selectedDayToAdd, setSelectedDayToAdd] = useState<string>("Wednesday");
  const [targetRecipeId, setTargetRecipeId] = useState<string>(RECIPES[0].id);
  const [mealType, setMealType] = useState<MealType>("Afternoon Treat");
  const [plannedPortions, setPlannedPortions] = useState<number>(8);
  const [planNotes, setPlanNotes] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New custom item text inputs
  const [newCustomName, setNewCustomName] = useState<string>("Baking paper");
  const [newCustomAmount, setNewCustomAmount] = useState<string>("1 roll");
  const [newCustomCategory, setNewCustomCategory] = useState<string>("Pantry & Baking");

  // Save to localStorage when states alter
  useEffect(() => {
    localStorage.setItem("healthy_kids_weekly_plan", JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem("healthy_kids_custom_groceries", JSON.stringify(customItems));
  }, [customItems]);

  useEffect(() => {
    localStorage.setItem("healthy_kids_crossed_ingredients", JSON.stringify(crossedIngredients));
  }, [crossedIngredients]);

  // Push an activity into a day's schedule
  const handleAddNewActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const newAct: PlannedActivity = {
      id: "act_" + Date.now(),
      recipeId: targetRecipeId,
      mealType,
      portions: plannedPortions,
      notes: planNotes.trim()
    };

    setWeeklyPlan((prev) => ({
      ...prev,
      [selectedDayToAdd]: [...(prev[selectedDayToAdd] || []), newAct]
    }));

    // Reset fields
    setPlanNotes("");
    setShowAddForm(false);
  };

  // Evict an activity from a day's schedule
  const handleRemoveActivity = (day: string, actId: string) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [day]: prev[day].filter((act) => act.id !== actId)
    }));
  };

  // Add individual custom items manually
  const handleAddCustomGrocery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomName.trim()) return;

    const newItem: CustomGroceryItem = {
      id: "cust_" + Date.now(),
      name: newCustomName.trim(),
      amount: newCustomAmount.trim() || "As needed",
      category: newCustomCategory as CustomGroceryItem["category"],
      checked: false
    };

    setCustomItems((prev) => [...prev, newItem]);
    setNewCustomName("");
    setNewCustomAmount("");
  };

  // Toggle check/uncheck for custom ingredients
  const toggleCustomItemCheck = (id: string) => {
    setCustomItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Clear custom grocery list
  const clearCustomItems = () => {
    setCustomItems([]);
  };

  // Clear weekly schedule
  const clearWeeklyPlan = () => {
    if (window.confirm("Are you sure you want to clear your baking schedule?")) {
      const emptyState: WeeklyPlan = {};
      DAYS.forEach((d) => { emptyState[d] = []; });
      setWeeklyPlan(emptyState);
      setCrossedIngredients([]);
    }
  };

  // Toggle check/uncheck for auto-derived ingredients
  const toggleRecipeIngredientCheck = (ingredientKey: string) => {
    setCrossedIngredients((prev) =>
      prev.includes(ingredientKey)
        ? prev.filter((k) => k !== ingredientKey)
        : [...prev, ingredientKey]
    );
  };

  // Compiles and aggregates ingredients from all planned bakes
  const compileAggregatedIngredients = () => {
    const aggregated: { [key: string]: { amount: number; unit: string; category: string; recipeSources: string[] } } = {};

    DAYS.forEach((day) => {
      const activities = weeklyPlan[day] || [];
      activities.forEach((act) => {
        const recipe = RECIPES.find((r) => r.id === act.recipeId);
        if (!recipe) return;

        // Ratio multiplier (planned portions vs default portions of recipe)
        const scale = act.portions / recipe.servings;

        recipe.ingredients.forEach((ing) => {
          // Generate key using lowercase-simplified word
          const key = `${ing.name.toLowerCase().trim()}_${ing.unit.toLowerCase().trim()}`;
          
          if (!aggregated[key]) {
            aggregated[key] = {
              amount: 0,
              unit: ing.unit,
              category: ing.category,
              recipeSources: []
            };
          }
          
          aggregated[key].amount += ing.amount * scale;
          if (!aggregated[key].recipeSources.includes(recipe.name)) {
            aggregated[key].recipeSources.push(recipe.name);
          }
        });
      });
    });

    return Object.entries(aggregated).map(([key, data]) => {
      // Restore appropriate capitalization name
      const cleanName = key.split("_")[0];
      const properName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      return {
        key,
        name: properName,
        amount: data.amount,
        unit: data.unit,
        category: data.category,
        recipeSources: data.recipeSources
      };
    });
  };

  const recipeIngredientsList = compileAggregatedIngredients();

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10" id="parent-planner">
      
      {/* Intro Header */}
      <div className="bg-white border-4 border-v-teal rounded-[40px] p-6 md:p-8 text-center max-w-3xl mx-auto space-y-4 shadow-v-md text-v-teal no-print">
        <span className="inline-block px-4 py-1.5 bg-v-mint text-white text-xs font-black tracking-wider uppercase rounded-full border-2 border-v-teal shadow-v-sm">
          Plan & Bake
        </span>
        <h2 className="text-2xl md:text-4xl font-black uppercase text-v-teal font-sans tracking-tight leading-none">
          Parent's Interactive Bake Planner
        </h2>
        <p className="text-v-teal text-xs md:text-sm font-bold leading-relaxed max-w-xl mx-auto opacity-90">
          Plan upcoming toddler birthdays, afternoon snacks, or holiday weekends. 
          Your combined ingredient list scales and aggregates into a printable checklist automatically.
        </p>
      </div>

      {/* Main Grid: Weekly Schedule Left, Grocery List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: THE WEEK PLANNER */}
        <div className="lg:col-span-7 space-y-6 no-print text-v-teal">
          <div className="bg-white border-4 border-v-teal rounded-[40px] shadow-v-md p-6 md:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-4 border-dashed border-v-teal/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-v-coral" />
                <h3 className="font-extrabold text-v-teal uppercase text-lg">Weekly Planner</h3>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDayToAdd("Wednesday");
                    setShowAddForm(true);
                  }}
                  className="px-4 py-2 bg-v-coral text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-v-teal shadow-v-sm flex items-center gap-1.5 hover:translate-y-0.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                  <span>Add Bake</span>
                </button>
                
                <button
                  type="button"
                  onClick={clearWeeklyPlan}
                  className="px-3.5 py-1.5 bg-v-cream border-2 border-v-teal hover:bg-v-yellow text-v-teal font-black text-xs uppercase rounded-full shadow-v-sm transition-colors cursor-pointer"
                >
                  Reset Week
                </button>
              </div>
            </div>

            {/* Quick Helper Tips */}
            <div className="p-4 bg-v-yellow border-2 border-v-teal rounded-3xl text-xs text-v-teal leading-relaxed flex items-start gap-2.5 shadow-v-sm">
              <Info className="w-5 h-5 text-v-coral shrink-0 mt-0.5" />
              <span className="font-bold">
                <strong>Dynamic Scaling Tip:</strong> Planning a party or cake bake for school batches? Simply customize the portion size value in the scheduler. The ingredients list on the right will recalculate quantities instantly.
              </span>
            </div>

            {/* Add Activity Form Overlay */}
            {showAddForm && (
              <form onSubmit={handleAddNewActivity} className="p-5 bg-v-cream border-4 border-v-teal rounded-[32px] shadow-v-md space-y-4 transition-all animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-v-teal/10">
                  <span className="text-xs font-black text-v-teal uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-v-coral animate-pulse" />
                    Add Treat Event Info
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-v-coral font-black text-xs hover:underline cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black">
                  <div>
                    <label className="block text-[10px] uppercase text-v-teal/75 mb-1.5">Day of Week:</label>
                    <select
                      value={selectedDayToAdd}
                      onChange={(e) => setSelectedDayToAdd(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-v-teal rounded-xl bg-white"
                    >
                      {DAYS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-v-teal/75 mb-1.5">Which Cake Recipe?:</label>
                    <select
                      value={targetRecipeId}
                      onChange={(e) => setTargetRecipeId(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-v-teal rounded-xl bg-white"
                    >
                      {RECIPES.map((r) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-v-teal/75 mb-1.5">Occasion / Spot:</label>
                    <select
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value as MealType)}
                      className="w-full px-3 py-2 border-2 border-v-teal rounded-xl bg-white"
                    >
                      {MEAL_TYPES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-v-teal/75 mb-1.5">Leo / Kids Slices:</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={plannedPortions}
                      onChange={(e) => setPlannedPortions(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border-2 border-v-teal rounded-xl bg-white"
                    />
                  </div>
                </div>

                <div className="text-xs font-black">
                  <label className="block text-[10px] uppercase text-v-teal/75 mb-1.5">Notes (e.g. Leo's birthday bash, no nuts):</label>
                  <input
                    type="text"
                    value={planNotes}
                    onChange={(e) => setPlanNotes(e.target.value)}
                    placeholder="Leo's afternoon holiday treats"
                    className="w-full px-3 py-2 border-2 border-v-teal rounded-xl bg-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-v-teal text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-v-teal shadow-v-sm hover:translate-y-0.5 cursor-pointer"
                  >
                    Confirm & Schedule
                  </button>
                </div>
              </form>
            )}

            {/* Days Schedule Cards */}
            <div className="space-y-4">
              {DAYS.map((day) => {
                const plans = weeklyPlan[day] || [];
                return (
                  <div key={day} className="group border-l-4 border-v-mint pl-4 py-2 transition-all">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-extrabold text-base uppercase text-v-teal tracking-tight">{day}</span>
                      <button
                        onClick={() => {
                          setSelectedDayToAdd(day);
                          setShowAddForm(true);
                        }}
                        className="text-[10px] font-black uppercase text-v-coral hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[3px]" /> Add Bake
                      </button>
                    </div>

                    {plans.length === 0 ? (
                      <p className="text-xs text-v-teal/50 italic font-bold">No sweet kids treats scheduled yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {plans.map((plan) => {
                          const recipe = RECIPES.find((r) => r.id === plan.recipeId);
                          return (
                            <div key={plan.id} className="relative bg-v-cream/10 hover:bg-v-cream/35 border-2 border-v-teal rounded-3xl p-4 flex.col text-xs transition-colors shadow-v-sm">
                              <button
                                onClick={() => handleRemoveActivity(day, plan.id)}
                                className="absolute right-3 top-3 p-1.5 text-v-teal hover:text-white hover:bg-v-coral rounded-xl border border-transparent hover:border-v-teal transition-all cursor-pointer"
                                title="Remove Event"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              <div className="pr-10 space-y-2 font-bold">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2.5 py-0.5 bg-v-yellow text-v-teal border border-v-teal text-[8px] font-black uppercase tracking-wider rounded-full">
                                    {plan.mealType}
                                  </span>
                                  <span className="px-2.5 py-0.5 bg-v-purple text-white border border-v-teal text-[8px] font-black uppercase tracking-wider rounded-full">
                                    {plan.portions} slices
                                  </span>
                                </div>
                                <h4 className="font-black text-sm uppercase text-v-teal">{recipe?.name || "Refined Sugar-free Cake"}</h4>
                                {plan.notes && (
                                  <p className="text-v-teal/80 italic text-[11px] mt-1 pr-4 font-bold border-l-2 border-v-coral pl-2">
                                    &ldquo;{plan.notes}&rdquo;
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GROCERY COMPILER (NO-PRINT EXCLUSION) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* INTERACTIVE GROCERY VIEW inside App */}
          <div className="bg-white border-4 border-v-teal rounded-[40px] shadow-v-md p-6 md:p-8 space-y-6 no-print text-v-teal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-4 border-dashed border-v-teal/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-v-mint" />
                <h3 className="font-extrabold text-v-teal uppercase text-base tracking-tight">Grocery List</h3>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-v-teal text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-v-teal shadow-v-sm flex items-center gap-1.5 hover:translate-y-0.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print List</span>
              </button>
            </div>

            {/* Aggregated Recipe Ingredients Index */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between select-none">
                <span className="text-[10px] uppercase font-black tracking-wider text-v-teal/70">
                  Calculated Ingredients ({recipeIngredientsList.length})
                </span>
                {recipeIngredientsList.length > 0 && (
                  <span className="text-[9px] text-white bg-v-mint px-2.5 py-0.5 rounded-full font-black uppercase border border-v-teal">
                    Bakes Scaled
                  </span>
                )}
              </div>

              {recipeIngredientsList.length === 0 ? (
                <div className="text-center py-8 border-4 border-dashed border-v-teal rounded-3xl bg-v-cream/10 space-y-3">
                  <UtensilsCrossed className="w-10 h-10 text-v-teal/30 mx-auto animate-pulse" />
                  <p className="text-xs text-v-teal/70 font-bold max-w-xs mx-auto leading-relaxed px-4">
                    Select custom cake recipes on the calendar timeline to auto-compile sweet party shopping ingredients.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {recipeIngredientsList.map((item) => {
                    const isChecked = crossedIngredients.includes(item.key);
                    return (
                      <div 
                        key={item.key} 
                        onClick={() => toggleRecipeIngredientCheck(item.key)}
                        className={`flex items-start gap-3 p-3.5 hover:bg-v-cream/20 rounded-2xl cursor-pointer select-none transition-all border-2 ${
                          isChecked ? "opacity-50 bg-v-cream/5 border-dashed border-v-teal/30" : "border-v-teal bg-white shadow-v-sm"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-v-mint" />
                          ) : (
                            <Square className="w-4 h-4 text-v-teal" />
                          )}
                        </div>
                        <div className="text-xs flex-1 font-bold">
                          <p className={`font-black text-v-teal ${isChecked ? "line-through text-v-teal/60" : ""}`}>
                            {item.name}
                          </p>
                          <p className="text-v-teal/70 text-[10px] flex items-center gap-1.5 uppercase tracking-wider mt-0.5 font-extrabold">
                            <span className="font-mono text-v-coral">{item.amount % 1 === 0 ? item.amount : item.amount.toFixed(1)} {item.unit}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                          </p>
                          <p className="text-[9px] text-v-teal/50 italic mt-0.5 leading-none">
                            For: {item.recipeSources.join(", ")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Custom Pantry Items Adding */}
            <div className="pt-4 border-t-4 border-dashed border-v-teal/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-v-teal/70">
                  Parent Items List ({customItems.length})
                </span>
                {customItems.length > 0 && (
                  <button onClick={clearCustomItems} className="text-[10px] font-black uppercase text-v-coral hover:underline cursor-pointer">
                    Clear extra
                  </button>
                )}
              </div>

              {/* Add Custom Form */}
              <form onSubmit={handleAddCustomGrocery} className="flex gap-2 font-black">
                <input
                  type="text"
                  placeholder="e.g. Baking paper"
                  value={newCustomName}
                  onChange={(e) => setNewCustomName(e.target.value)}
                  className="flex-1 px-3 py-1.5 border-2 border-v-teal rounded-xl text-xs bg-white"
                />
                <input
                  type="text"
                  placeholder="e.g. 1 roll"
                  value={newCustomAmount}
                  onChange={(e) => setNewCustomAmount(e.target.value)}
                  className="w-20 px-2 py-1.5 border-2 border-v-teal rounded-xl text-xs bg-white text-center"
                />
                <button
                  type="submit"
                  className="p-1.5 bg-v-yellow text-v-teal border-2 border-v-teal rounded-xl hover:bg-white shadow-v-sm cursor-pointer shrink-0"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
              </form>

              {/* Custom list elements checklist */}
              {customItems.length > 0 && (
                <div className="space-y-2">
                  {customItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleCustomItemCheck(item.id)}
                      className={`flex items-center justify-between p-3 border-2 hover:bg-v-cream/10 rounded-2xl cursor-pointer select-none bg-white font-bold transition-all ${
                        item.checked ? "opacity-50 border-dashed border-v-teal/30 shadow-none bg-v-cream/5" : "border-v-teal shadow-v-sm text-v-teal"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        {item.checked ? (
                          <CheckSquare className="w-4 h-4 text-v-mint" />
                        ) : (
                          <Square className="w-4 h-4 text-v-teal" />
                        )}
                        <span className={`font-extrabold text-v-teal ${item.checked ? "line-through text-v-teal/60" : ""}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[9px] text-v-teal font-extrabold tracking-wider uppercase px-2 py-0.5 bg-v-yellow border border-v-teal rounded-lg">
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EXCLUSIVE PRINTABLE PORTION (STRICTLY FOR PHYSICAL PRINT STYLING) */}
      <div className="hidden print:block print:p-8 space-y-8 bg-white text-black min-h-screen">
        <div className="border-b-4 border-black pb-4 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight">TinyTreats Grocery Checklist</h1>
          <p className="text-sm italic font-bold text-gray-700">Organized Cake Ingredients Planner • Bite-Sized Sweet Treats</p>
          <p className="text-xs text-gray-500 mt-1">Generated Clock: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Display Weekly Bake Summary in Print */}
        <div className="space-y-2">
          <h2 className="text-sm uppercase tracking-wider font-extrabold border-b-2 border-black pb-1">Baking Schedule Summary</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {DAYS.map((day) => {
              const plans = weeklyPlan[day] || [];
              if (plans.length === 0) return null;
              return (
                <div key={day} className="border-2 border-black p-3 rounded-2xl">
                  <span className="font-black uppercase text-[10px]">{day}</span>
                  <div className="mt-1 space-y-1">
                    {plans.map((p) => {
                      const recipe = RECIPES.find((r) => r.id === p.recipeId);
                      return (
                        <p key={p.id} className="font-bold text-gray-800">
                          🍰 {recipe?.name} ({p.portions} slices) - <span className="italic text-gray-500 font-medium">{p.mealType}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main printable ingredients block */}
        <div className="space-y-2 pt-4">
          <h2 className="text-sm uppercase tracking-wider font-black border-b-2 border-black pb-1">Pantry Ingredients to Gather</h2>
          
          {recipeIngredientsList.length === 0 && customItems.length === 0 ? (
            <p className="text-xs italic">No bakes planned this week. Add recipes on the interactive scheduler.</p>
          ) : (
            <div className="space-y-6">
              
              {/* Recipe generated ingredients grouped by category */}
              {["Pantry & Baking", "Fruit & Fresh", "Dairy & Alternatives", "Nuts & Seeds"].map((cat) => {
                const subItems = recipeIngredientsList.filter((item) => item.category === cat);
                if (subItems.length === 0) return null;
                return (
                  <div key={cat} className="space-y-2">
                    <h3 className="text-xs font-black text-black uppercase tracking-widest bg-gray-200 border-2 border-black px-2.5 py-0.5 inline-block rounded-lg">{cat}</h3>
                    <div className="grid grid-cols-1 divide-y-2 divide-gray-200">
                      {subItems.map((item) => (
                        <div key={item.key} className="flex items-center gap-3 py-2 text-xs">
                          {/* Checked boxes rendered as empty circles for physical printing pen checks! */}
                          <div className="w-4 h-4 border-2 border-black rounded-lg mr-2 shrink-0" />
                          <span className="font-bold text-gray-850">{item.name}</span>
                          <span className="text-gray-500 font-black">• {item.amount % 1 === 0 ? item.amount : item.amount.toFixed(1)} {item.unit}</span>
                          <span className="text-gray-400 italic text-[10px] ml-auto font-medium">({item.recipeSources.join(", ")})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Printable Custom Groceries */}
              {customItems.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-black text-black uppercase tracking-widest bg-gray-200 border-2 border-black px-2.5 py-0.5 inline-block rounded-lg">Parent Extras</h3>
                  <div className="grid grid-cols-1 divide-y-2 divide-gray-200">
                    {customItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 py-2 text-xs">
                        <div className="w-4 h-4 border-2 border-black rounded-lg mr-2 shrink-0" />
                        <span className="font-bold text-gray-850">{item.name}</span>
                        <span className="text-gray-400 ml-auto font-black uppercase tracking-wider">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center pt-8 border-t-2 border-dashed border-gray-400 text-[10px] text-gray-400 uppercase font-bold">
          Durable mini bento cakes with TinyTreats guide! Joyful party memories for children.
        </div>
      </div>
    </div>
  );
}
