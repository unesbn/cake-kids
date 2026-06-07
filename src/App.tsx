import React, { useState, useEffect } from "react";
import { 
  Cake, 
  Sparkles, 
  Calculator, 
  CalendarRange, 
  BookHeart, 
  Heart,
  ChevronRight,
  Info
} from "lucide-react";
import RecipeSection from "./components/RecipeSection";
import BakingGuide from "./components/BakingGuide";
import MealPlanner from "./components/MealPlanner";
import NutritionGuidelines from "./components/NutritionGuidelines";
import { WeeklyPlan } from "./types";

type TabId = "gallery" | "converter" | "planner" | "nutrition";

interface TabItem {
  id: TabId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<any>;
  colorClass: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("gallery");
  const [plannedCakesCount, setPlannedCakesCount] = useState<number>(0);

  useEffect(() => {
    const handleStorageUpdate = () => {
      const saved = localStorage.getItem("healthy_kids_weekly_plan");
      if (saved) {
        try {
          const parsed: WeeklyPlan = JSON.parse(saved);
          let count = 0;
          Object.values(parsed).forEach((dayActivities) => {
            count += dayActivities.length;
          });
          setPlannedCakesCount(count);
        } catch (e) {
          console.error(e);
        }
      }
    };

    handleStorageUpdate();
    window.addEventListener("storage", handleStorageUpdate);
    const interval = setInterval(handleStorageUpdate, 1500);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      clearInterval(interval);
    };
  }, []);

  const TABS: TabItem[] = [
    { 
      id: "gallery", 
      label: "Mini Cake Gallery", 
      sublabel: "Bite-Sized Yummy Cakes", 
      icon: Cake,
      colorClass: "bg-v-coral hover:bg-v-coral/95 text-white"
    },
    { 
      id: "converter", 
      label: "Mini Cake Designer", 
      sublabel: "Playful Virtual Decorator", 
      icon: Calculator,
      colorClass: "bg-v-yellow text-v-teal"
    },
    { 
      id: "planner", 
      label: "Celebration Planner", 
      sublabel: "Grocery Portions Scaler", 
      icon: CalendarRange,
      colorClass: "bg-v-mint hover:bg-v-mint/95 text-white"
    },
    { 
      id: "nutrition", 
      label: "Decorating Lab", 
      sublabel: "Frosting & Piping Skills", 
      icon: BookHeart,
      colorClass: "bg-v-purple text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-v-cream text-v-teal font-sans selection:bg-v-mint selection:text-white flex flex-col justify-between p-4 md:p-6 lg:p-8">
      
      {/* GLOBAL HEADER & BANNER (Hidden on physical printing) */}
      <div className="no-print space-y-6 max-w-6xl mx-auto w-full mb-8">
        
        {/* Playful Top Strip */}
        <div className="bg-v-teal text-v-cream rounded-full border-2 border-v-teal px-6 py-2 text-xs font-extrabold text-center tracking-wider uppercase flex items-center justify-center gap-2 shadow-v-sm">
          <Sparkles className="w-4 h-4 text-v-yellow shrink-0 animate-pulse" />
          <span>Made for sweet fun: Delicious mini bento cakes, custom cupcakes & pops decorated for kids parties</span>
          <span className="hidden md:inline">• Sweet frostings, sprinkles & adorable candy toppers!</span>
        </div>

        {/* Brand Navigation Oval */}
        <nav className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-[32px] px-8 py-5 border-4 border-v-teal shadow-v-md gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-v-coral rounded-full border-2 border-v-teal flex items-center justify-center text-white font-black text-2xl shadow-v-sm animate-bounce-slow">
              🧁
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight uppercase leading-none text-v-teal">TinyTreats</span>
              <span className="text-[10px] font-bold tracking-widest text-v-coral uppercase">Mini Sweet Kids Cakes</span>
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6 md:gap-8 font-black uppercase text-xs tracking-wider">
            <button 
              onClick={() => setActiveTab("gallery")} 
              className={`pb-1 border-b-2 hover:text-v-coral transition-colors cursor-pointer ${activeTab === "gallery" ? "text-v-coral border-v-coral" : "border-transparent text-v-teal"}`}
            >
              Cakes
            </button>
            <button 
              onClick={() => setActiveTab("converter")} 
              className={`pb-1 border-b-2 hover:text-v-coral transition-colors cursor-pointer ${activeTab === "converter" ? "text-v-coral border-v-coral" : "border-transparent text-v-teal"}`}
            >
              Designer
            </button>
            <button 
              onClick={() => setActiveTab("planner")} 
              className={`pb-1 border-b-2 hover:text-v-coral transition-colors cursor-pointer ${activeTab === "planner" ? "text-v-coral border-v-coral" : "border-transparent text-v-teal"}`}
            >
              Planner
            </button>
            <button 
              onClick={() => setActiveTab("nutrition")} 
              className={`pb-1 border-b-2 hover:text-v-coral transition-colors cursor-pointer ${activeTab === "nutrition" ? "text-v-coral border-v-coral" : "border-transparent text-v-teal"}`}
            >
              Decor Lab
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-v-yellow font-black px-3 py-1 rounded-full border-2 border-v-teal text-v-teal shadow-v-sm">
              PARTY HUB
            </span>
          </div>
        </nav>

        {/* HERO CARTOON split section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main message */}
          <div className="md:col-span-8 bg-v-yellow rounded-[40px] border-4 border-v-teal p-6 md:p-8 flex flex-col justify-center relative overflow-hidden shadow-v-md text-v-teal">
            <h1 className="text-3xl md:text-5xl font-black leading-none mb-3 uppercase tracking-tight">
              Sweet Treats,<br />Smoll & Sweet!
            </h1>
            <p className="text-sm md:text-base font-bold opacity-90 max-w-lg leading-relaxed">
              Delight your kids with sweet single-serving bento cakes, mini cupcakes, and fun cake pops.
              Designed for small hands and grand celebrations without high leftover waste!
            </p>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-v-coral rounded-full opacity-10"></div>
          </div>

          {/* Quick Stats sidebar planner */}
          <div className="md:col-span-4 bg-v-coral text-white rounded-[40px] border-4 border-v-teal p-6 flex flex-col justify-center relative shadow-v-md overflow-hidden">
            <div className="absolute top-2 right-2 text-white/10 text-9xl font-black pointer-events-none select-none">
              ★
            </div>
            
            <div className="space-y-4 relative z-10">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-v-teal text-v-cream px-2.5 py-1 rounded-full border border-v-teal">
                  Bake schedule
                </span>
              </div>
              
              <div className="space-y-1.5">
                <h2 className="text-xl md:text-2xl font-black uppercase leading-tight">
                  {plannedCakesCount === 0 
                    ? "Party Checklist!" 
                    : `${plannedCakesCount} Treat${plannedCakesCount > 1 ? "s" : ""} Scheduled`}
                </h2>
                <p className="text-xs font-semibold text-white/90 leading-relaxed">
                  {plannedCakesCount === 0 
                    ? "Add your kid's designed small sweet cakes onto the celebration planner checklist!" 
                    : "Your parent's celebration planner is loaded! Easily print your party grocery list."}
                </p>
              </div>

              <button
                onClick={() => setActiveTab("planner")}
                className="w-full bg-white text-v-teal text-xs font-black uppercase py-2.5 px-4 rounded-2xl border-2 border-v-teal shadow-v-sm hover:translate-y-0.5 hover:shadow-v-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Go to Celebration Planner</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Aesthetic Tabs Selection Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TABS.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-[32px] text-left border-4 border-v-teal transition-all duration-200 cursor-pointer flex flex-col justify-between items-start gap-4 ${
                  isActive 
                    ? `${tab.colorClass} shadow-v-sm translate-y-0.5` 
                    : "bg-white hover:bg-gray-50 text-v-teal shadow-v-md"
                }`}
              >
                <div className={`p-2.5 rounded-2xl border-2 border-v-teal ${
                  isActive ? "bg-white text-v-teal" : "bg-v-cream text-v-teal"
                }`}>
                  <IconComp className="w-5 h-5 shrink-0" />
                </div>

                <div className="space-y-0.5">
                  <p className="font-extrabold text-sm md:text-base tracking-tight leading-tight uppercase">
                    {tab.label}
                  </p>
                  <p className={`text-[10px] font-bold tracking-tight line-clamp-1 ${isActive ? "opacity-90" : "text-gray-500"}`}>
                    {tab.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE DISPLAY WINDOW (Strictly uncovers selected Tab details) */}
      <main className="max-w-6xl mx-auto flex-1 w-full p-2">
        <div className="max-w-none">
          {activeTab === "gallery" && <RecipeSection />}
          {activeTab === "converter" && <BakingGuide />}
          {activeTab === "planner" && <MealPlanner />}
          {activeTab === "nutrition" && <NutritionGuidelines />}
        </div>
      </main>

      {/* GLOBAL FOOTER (Hidden on physical printing) */}
      <footer className="max-w-6xl mx-auto w-full no-print mt-12 bg-white rounded-[32px] border-4 border-v-teal p-6 shadow-v-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-v-coral fill-v-coral shrink-0" />
          <span className="font-bold text-xs md:text-sm text-v-teal uppercase tracking-tight">
            Delicious single-serving kids bento cakes and birthday cupcakes for joyful memories.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-extrabold uppercase">
          <span>© {new Date().getFullYear()} TinyTreats</span>
          <span className="text-gray-300">|</span>
          <span>Bite-Sized Celebration Bakes</span>
        </div>
      </footer>
    </div>
  );
}
