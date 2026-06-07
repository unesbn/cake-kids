import React, { useState } from "react";
import { 
  Sparkles, 
  Info, 
  RotateCcw, 
  Award, 
  Layers, 
  Palette, 
  ChevronRight,
  Heart,
  FileCheck,
  Check
} from "lucide-react";

interface OptionItem {
  id: string;
  name: string;
  color: string;
  class: string;
  description?: string;
}

const CAKE_STYLES: OptionItem[] = [
  { id: "bento", name: "Smoll Bento Cake (4-inch)", color: "#FF6B6B", class: "bg-v-coral text-white", description: "Bouncy round single-tier sweet treat" },
  { id: "cupcake", name: "Bouncy Mini Cupcake", color: "#FFE66D", class: "bg-v-yellow text-v-teal", description: "Soft muffin topped with high swirl cream" },
  { id: "cakepop", name: "Sparkle Cake Pop (Stick)", color: "#4ECDC4", class: "bg-v-mint text-white", description: "Marshmallow crumble sphere on a stick" },
  { id: "mugcake", name: "Cozy Chocolate Mug Cake", color: "#A29BFE", class: "bg-v-purple text-white", description: "Hot sugary single-serving microwave cup" }
];

const BASE_FLAVORS: OptionItem[] = [
  { id: "vanilla", name: "Milky Vanilla", color: "#FFFDF0", class: "bg-amber-50 text-v-teal", description: "Sweet real vanilla extract" },
  { id: "chocolate", name: "Double Choco Fudge", color: "#4E2F1D", class: "bg-[_#5c4033] text-white", description: "Rich buttery cocoa & sweet chips" },
  { id: "strawberry", name: "Strawberry Shortcake", color: "#FF8B8B", class: "bg-rose-100 text-rose-800", description: "Whipped pink berry batter" },
  { id: "funfetti", name: "Rainbow Funfetti", color: "#E0F7FA", class: "bg-sky-50 text-v-teal", description: "Pure white sugar with rainbow stars" }
];

const FROSTING_SHADES: OptionItem[] = [
  { id: "pink", name: "Bubblegum Pink", color: "rgba(255, 107, 107, 0.9)", class: "bg-rose-400 text-white" },
  { id: "blue", name: "Sky Marshmallow Blue", color: "rgba(78, 205, 196, 0.9)", class: "bg-cyan-400 text-white" },
  { id: "purple", name: "Magic Violet Icing", color: "rgba(162, 155, 254, 0.9)", class: "bg-indigo-400 text-white" },
  { id: "brown", name: "Rich Cocoa Ganache", color: "rgba(92, 64, 51, 0.9)", class: "bg-yellow-900 text-white" },
  { id: "white", name: "Velvet Vanilla Cream", color: "rgba(255, 253, 240, 0.95)", class: "bg-amber-50 text-v-teal border border-v-teal/20" }
];

const SPRINKLE_TYPES: OptionItem[] = [
  { id: "none", name: "No Sprinkles (Plain)", color: "transparent", class: "bg-gray-100 text-gray-500" },
  { id: "stars", name: "Rainbow Candy Stars", color: "linear-gradient(45deg, #FF6B6B, #FFE66D, #4ECDC4)", class: "bg-gradient-to-r from-v-coral via-v-yellow to-v-mint text-v-teal" },
  { id: "disco", name: "Pink Unicorn Dust", color: "#FF8B8B", class: "bg-rose-300 text-white" },
  { id: "gold", name: "Golden Magic Pixies", color: "#FFE66D", class: "bg-yellow-400 text-v-teal" },
  { id: "dino", name: "Choco Dino Pebbles", color: "#5C4033", class: "bg-amber-900 text-white" }
];

const TOPPERS: OptionItem[] = [
  { id: "bear", name: "Gummy Teddy Bear 🧸", color: "", class: "" },
  { id: "dino", name: "Candy Dinosaur 🦕", color: "", class: "" },
  { id: "cherry", name: "Sweet Glazed Cherry 🍒", color: "", class: "" },
  { id: "crown", name: "Shining Princess Crown 👑", color: "", class: "" },
  { id: "candle", name: "Bouncy Birthday Candle 🕯️", color: "", class: "" },
  { id: "none", name: "No Topper", color: "", class: "" }
];

export default function BakingGuide() {
  const [style, setStyle] = useState<string>("bento");
  const [base, setBase] = useState<string>("vanilla");
  const [frosting, setFrosting] = useState<string>("pink");
  const [sprinkles, setSprinkles] = useState<string>("stars");
  const [topper, setTopper] = useState<string>("bear");

  const [sizeMultiplier, setSizeMultiplier] = useState<number>(1); // 1 = Simple, 2 = Double sweet sizing, 3 = Party size swap!

  // Derived styling variables for the visual render engine
  const activeStyle = CAKE_STYLES.find(c => c.id === style) || CAKE_STYLES[0];
  const activeBase = BASE_FLAVORS.find(b => b.id === base) || BASE_FLAVORS[0];
  const activeFrosting = FROSTING_SHADES.find(f => f.id === frosting) || FROSTING_SHADES[0];
  const activeSprinkles = SPRINKLE_TYPES.find(s => s.id === sprinkles) || SPRINKLE_TYPES[0];
  const activeTopper = TOPPERS.find(t => t.id === topper) || TOPPERS[0];

  // Helper calculation to output customized dynamic ingredients formula card based on design selections!
  const getDynamicDIYIngredients = () => {
    let ingList = [
      { name: "Caster Sugar", amount: 80 * sizeMultiplier, unit: "g" },
      { name: "Salted Butter (softened)", amount: 60 * sizeMultiplier, unit: "g" },
      { name: "Self-Rising Cake Flour", amount: 100 * sizeMultiplier, unit: "g" },
      { name: "Whole Egg", amount: 1 * sizeMultiplier, unit: "qty" }
    ];

    // Modify base parameters
    if (base === "chocolate") {
      ingList.push({ name: "Pure Cocoa Powder", amount: 20 * sizeMultiplier, unit: "g" });
      ingList.push({ name: "Sweet Chocolate Chips", amount: 40 * sizeMultiplier, unit: "g" });
    } else if (base === "strawberry") {
      ingList.push({ name: "Strawberry Extract Extract Syrup", amount: 10 * sizeMultiplier, unit: "ml" });
    } else if (base === "funfetti") {
      ingList.push({ name: "Rainbow Confetti Crumbles", amount: 25 * sizeMultiplier, unit: "g" });
    } else {
      ingList.push({ name: "Pure Madagascan Vanilla Pod Bean", amount: 1 * sizeMultiplier, unit: "tsp" });
    }

    // Modify frosting parameters
    if (frosting === "pink") {
      ingList.push({ name: "Double-Cream Pink Bubblegum Buttercream", amount: 120 * sizeMultiplier, unit: "g" });
    } else if (frosting === "blue") {
      ingList.push({ name: "Fluffy Sky Marshmallow Whip Icing", amount: 120 * sizeMultiplier, unit: "g" });
    } else if (frosting === "purple") {
      ingList.push({ name: "Super Sweet Grape-Violet Icing Shroud", amount: 120 * sizeMultiplier, unit: "g" });
    } else if (frosting === "brown") {
      ingList.push({ name: "Smooth Milk-Chocolate Velvet Ganache", amount: 150 * sizeMultiplier, unit: "g" });
    } else {
      ingList.push({ name: "Rich Heavy Whipped Vanilla Cream", amount: 120 * sizeMultiplier, unit: "g" });
    }

    // Add topping elements
    if (sprinkles !== "none") {
      ingList.push({ name: `Crunchy Sparkly Icing ${activeSprinkles.name}`, amount: 15 * sizeMultiplier, unit: "g" });
    }
    if (topper !== "none") {
      ingList.push({ name: `Premium Sugar Candy ${activeTopper.name.split(" ").slice(1).join(" ")}`, amount: sizeMultiplier, unit: "pcs" });
    }

    return ingList;
  };

  const diyIngredients = getDynamicDIYIngredients();

  const handleResetDesign = () => {
    setStyle("bento");
    setBase("vanilla");
    setFrosting("pink");
    setSprinkles("stars");
    setTopper("bear");
    setSizeMultiplier(1);
  };

  return (
    <div className="space-y-10" id="cake-designer-workbench">
      
      {/* Intro Header */}
      <div className="bg-white border-4 border-v-teal rounded-[40px] p-6 md:p-8 text-center max-w-3xl mx-auto space-y-4 shadow-v-md text-v-teal">
        <span className="inline-block px-4 py-1.5 bg-v-yellow text-v-teal text-xs font-black tracking-wider uppercase rounded-full border-2 border-v-teal shadow-v-sm">
          Aesthetic Bakery Workbench
        </span>
        <h2 className="text-2xl md:text-4xl font-black uppercase text-v-teal font-sans tracking-tight leading-none">
          Interactive \"Smoll\" Cake Designer
        </h2>
        <p className="text-v-teal text-xs md:text-sm font-bold leading-relaxed max-w-xl mx-auto opacity-90">
          Pick your mini-cake shape, delicious sweet flavors, beautiful colors, sprinkle patterns, 
          and cartoon candies. Build your dream sweet bake and see it designed instantly!
        </p>
      </div>

      {/* Main Work Area split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: THE VISUAL RENDERING CANVAS */}
        <div className="lg:col-span-5 bg-white border-4 border-v-teal rounded-[40px] p-6 flex flex-col justify-between shadow-v-md relative overflow-hidden min-h-[480px]">
          
          {/* Subtle grid background to look like a draft notebook */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1A535C_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] bg-v-yellow border-2 border-v-teal px-3 py-1 font-black text-v-teal rounded-full uppercase shadow-v-sm">
              Live Mockup 🍰
            </span>
            <button 
              onClick={handleResetDesign}
              className="text-xs bg-v-cream border-2 border-v-teal text-v-teal rounded-full p-2 hover:bg-v-coral hover:text-white transition-colors cursor-pointer shadow-v-sm"
              title="Reset Design"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* DYNAMIC RENDERING MACHINE (Interactive CSS Cake drawing) */}
          <div className="flex-1 flex flex-col items-center justify-center py-8 relative">
            
            {/* PLATTER BASE */}
            <div className="w-56 h-4 bg-gray-200 border-4 border-v-teal rounded-full shadow-v-sm relative z-0 mt-36">
              <div className="absolute inset-x-4 -top-1.5 h-1 bg-white/60 rounded-full"></div>
            </div>

            {/* CAKE MAIN FORMULATION AND LAYERING SHELL (Styled absolutely centered over the platter) */}
            <div className="absolute bottom-[30px] flex flex-col items-center justify-end w-full">
              
              {/* STICK FOR CAKE POP */}
              {style === "cakepop" && (
                <div className="w-3 h-32 bg-amber-100 border-2 border-v-teal rounded-b-full shadow-v-sm"></div>
              )}

              {/* MUG CONTAINER FOR MUG CAKE */}
              {style === "mugcake" && (
                <div className="w-48 h-32 bg-rose-200 border-4 border-v-teal rounded-b-[40px] relative flex justify-center shadow-v-sm">
                  {/* Mug Handle */}
                  <div className="absolute -right-8 top-6 w-10 h-16 border-4 border-v-teal bg-rose-200 rounded-r-3xl z-10"></div>
                  {/* Outer heart print on mug */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Heart className="w-10 h-10 text-v-coral fill-v-coral stroke-v-teal stroke-2" />
                  </div>
                </div>
              )}

              {/* DYNAMIC SPONGE / FROSTING ASSEMBLER RENDERING */}
              <div className="absolute bottom-[10px] flex flex-col items-center justify-center">
                
                {/* STAGE TO DESIGN TOPPERS absolutely positioned on peak */}
                {topper !== "none" && (
                  <div className={`text-4xl z-40 animate-bounce-slow filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] ${
                    style === "cupcake" ? "mb-20" : style === "cakepop" ? "mb-16" : style === "mugcake" ? "mb-28" : "mb-[108px]"
                  }`}>
                    {activeTopper.name.split(" ").slice(-1)[0]}
                  </div>
                )}

                {/* THE MAIN FROSTING SHROUD CLOUD */}
                <div 
                  className={`border-4 border-v-teal transition-all duration-300 shadow-v-sm relative overflow-hidden flex flex-col justify-end items-center z-10 ${
                    style === "bento" 
                      ? "w-40 h-24 rounded-t-[50px] rounded-b-[15px]" 
                      : style === "cupcake" 
                        ? "w-28 h-16 rounded-full -mb-6" 
                        : style === "cakepop"
                          ? "w-24 h-24 rounded-full"
                          : "w-40 h-12 rounded-t-[32px]" // Mug cake top frosting puff
                  }`}
                  style={{ backgroundColor: activeFrosting.color }}
                >
                  
                  {/* Dynamic Color shine overlay (for 3D icing vibe) */}
                  <div className="absolute top-2 left-4 right-4 h-2 bg-white/40 rounded-full blur-[1px]"></div>

                  {/* LAYER FOR DYNAMIC SPRINKLES MATRICES */}
                  {sprinkles !== "none" && (
                    <div className="absolute inset-0 pointer-events-none opacity-90 z-20 overflow-hidden">
                      {sprinkles === "stars" && (
                        <div className="absolute inset-0 flex flex-wrap gap-4 p-4 text-[11px] justify-center text-v-yellow drop-shadow-sm font-extrabold rotate-12">
                          ★ ✦ ★ ✦ ★ ✦ ✦ ★ ★ ✦
                        </div>
                      )}
                      {sprinkles === "disco" && (
                        <div className="absolute inset-0 flex flex-wrap gap-3.5 p-4 text-[10px] justify-center text-rose-200 drop-shadow-sm font-extrabold -rotate-12">
                          • ✿ • ✿ • ✿ • ✿ •
                        </div>
                      )}
                      {sprinkles === "gold" && (
                        <div className="absolute inset-0 flex flex-wrap gap-3 p-4 text-[12px] justify-center text-yellow-300 drop-shadow-sm font-extrabold">
                          ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
                        </div>
                      )}
                      {sprinkles === "dino" && (
                        <div className="absolute inset-0 flex flex-wrap gap-3 p-4 text-[13px] justify-center text-amber-900 leading-none font-bold">
                          ▲ ■ ▲ ■ ▲ ■
                        </div>
                      )}
                    </div>
                  )}

                  {/* Buttercream frosting folds layer decoration */}
                  <div className="absolute bottom-0 inset-x-0 h-4 bg-black/10 z-10"></div>
                </div>

                {/* THE SPONGE BODY LAYER */}
                {(style === "bento" || style === "cupcake") && (
                  <div 
                    className={`border-4 border-v-teal transition-all duration-300 relative z-0 flex flex-col justify-center items-center ${
                      style === "bento" 
                        ? "w-44 h-11 rounded-b-[20px] rounded-t-[4px] -mt-1 shadow-v-sm" 
                        : "w-24 h-16 rounded-b-[24px] rounded-t-[6px] shadow-v-sm bg-amber-100" 
                    }`}
                    style={{ backgroundColor: activeBase.color }}
                  >
                    {/* Chocolate chips or sprinkles visual embed inside raw crumbs */}
                    {base === "chocolate" && (
                      <div className="text-amber-950 font-black text-[9px] tracking-widest leading-none drop-shadow-sm mt-1 select-none pointer-events-none">
                        🍪 🍪 🍪
                      </div>
                    )}
                    {base === "funfetti" && (
                      <div className="text-v-mint font-black text-[13px] tracking-wider leading-none drop-shadow-sm mt-1 space-x-1 select-none pointer-events-none">
                        • • • •
                      </div>
                    )}
                    {base === "strawberry" && (
                      <div className="text-rose-400 font-extrabold text-[12px] tracking-normal mt-1 leading-none select-none pointer-events-none">
                        ♥ ♥ ♥
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Design Status Output Overlay footer */}
          <div className="bg-v-cream border-2 border-v-teal p-3.5 rounded-3xl mt-4 space-y-1 text-v-teal">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-tight">Your Mini Design Formula:</p>
            <h4 className="font-extrabold text-sm uppercase text-v-teal leading-tight font-sans">
              The {activeBase.name} {activeStyle.name.split(" ").slice(-1)[0]}
            </h4>
            <p className="text-[10px] font-bold text-v-coral uppercase tracking-wide leading-none">
              ★ {activeFrosting.name} • {activeSprinkles.name.split(" (")[0]} toppered with {activeTopper.name}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE DESIGN PANEL CONTROLS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border-4 border-v-teal rounded-[40px] shadow-v-md p-6 md:p-8 space-y-6 text-v-teal flex flex-col justify-between h-full">
            
            {/* Tuning controller sections */}
            <div className="space-y-6">
              
              {/* SECTION 1: STYLE SELECTOR */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-v-coral flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  Step 1: Choose Cake Sizing Shape
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {CAKE_STYLES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setStyle(st.id)}
                      className={`p-3 text-left border-3 rounded-2xl transition-all cursor-pointer shadow-v-sm ${
                        style === st.id 
                          ? "bg-v-teal text-white border-v-teal scale-[1.02]" 
                          : "bg-white text-v-teal hover:bg-gray-50 border-gray-200 hover:border-v-teal"
                      }`}
                    >
                      <p className="font-extrabold text-xs uppercase leading-none">{st.name.split(" (")[0]}</p>
                      <p className={`text-[9px] font-medium leading-none mt-1 ${style === st.id ? "text-v-yellow" : "text-gray-400"}`}>
                        {st.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 2: FLAVOR BASE SELECTOR */}
              <div className="space-y-2 pt-4 border-t-2 border-dashed border-v-teal/10">
                <span className="text-[10px] uppercase font-black tracking-widest text-v-coral flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" />
                  Step 2: Choose Cake Base Flavor
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {BASE_FLAVORS.map((ba) => (
                    <button
                      key={ba.id}
                      onClick={() => setBase(ba.id)}
                      className={`p-2.5 text-center border-2 rounded-xl transition-all cursor-pointer shadow-v-sm ${
                        base === ba.id 
                          ? "bg-v-yellow text-v-teal border-v-teal font-black scale-[1.03]" 
                          : "bg-v-cream/30 text-v-teal hover:bg-white border-v-teal/15"
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-tight block truncate font-black">{ba.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 3: FROSTING SHADE SELECTOR */}
              <div className="space-y-2 pt-4 border-t-2 border-dashed border-v-teal/10">
                <span className="text-[10px] uppercase font-black tracking-widest text-v-coral flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" />
                  Step 3: Frosting Shade & Flavor
                </span>
                <div className="flex flex-wrap gap-2">
                  {FROSTING_SHADES.map((fr) => (
                    <button
                      key={fr.id}
                      onClick={() => setFrosting(fr.id)}
                      className={`px-3 py-1.5 border-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all cursor-pointer shadow-v-sm flex items-center gap-1.5 ${
                        frosting === fr.id 
                          ? "bg-v-teal text-white border-v-teal" 
                          : "bg-white hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-v-teal" style={{ backgroundColor: fr.color }} />
                      <span>{fr.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 4: SPRINKLES & TOPPERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-dashed border-v-teal/10">
                
                {/* Sprinkle child */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-black tracking-widest text-v-coral">Step 4: Sprinkles Dusting</label>
                  <select
                    value={sprinkles}
                    onChange={(e) => setSprinkles(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-v-teal rounded-xl text-xs font-black bg-white cursor-pointer shadow-v-sm"
                  >
                    {SPRINKLE_TYPES.map((sp) => (
                      <option key={sp.id} value={sp.id}>{sp.name}</option>
                    ))}
                  </select>
                </div>

                {/* Toppers child */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-black tracking-widest text-v-coral">Step 5: Gummy / Topper candy</label>
                  <select
                    value={topper}
                    onChange={(e) => setTopper(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-v-teal rounded-xl text-xs font-black bg-white cursor-pointer shadow-v-sm"
                  >
                    {TOPPERS.map((tp) => (
                      <option key={tp.id} value={tp.id}>{tp.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DYNAMIC MULTIPLIER SIZING REGULATOR */}
              <div className="pt-4 border-t-2 border-dashed border-v-teal/10 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-black tracking-widest text-v-coral">Step 6: Sweet Sizing multiplier</span>
                  <span className="text-xs bg-v-purple text-white border border-v-teal px-2 py-0.5 rounded-md font-mono font-black shadow-v-sm">
                    {sizeMultiplier === 1 ? "Mini Single Portion" : sizeMultiplier === 2 ? "Duo Sweet Portion" : "Bake Party Sizing (3x)"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSizeMultiplier(num)}
                      className={`flex-1 py-1.5 border-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-v-sm ${
                        sizeMultiplier === num
                          ? "bg-v-mint text-white border-v-teal"
                          : "bg-v-cream/20 text-v-teal hover:bg-white border-v-teal/10"
                      }`}
                    >
                      {num}x {num === 1 ? "Simple" : num === 2 ? "Duo" : "Party"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DYNAMIC FORMULA INGREDIENTS AUTOCALCULATOR CARD */}
            <div className="pt-6 border-t-4 border-dashed border-v-teal/15 space-y-3.5">
              <div className="flex items-center gap-1.5 text-v-teal">
                <FileCheck className="w-5 h-5 text-v-mint shrink-0" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider">Dynamic DIY Baking Recipe Ingredients Formula</h4>
              </div>

              <p className="text-[11px] font-bold text-gray-500 leading-none">
                Baking formula compiled dynamically based on your designed custom smoll cake specs.
              </p>

              {/* Ingredient formula list */}
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto bg-v-cream/35 border-2 border-v-teal rounded-2xl p-3 shadow-v-inner">
                {diyIngredients.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-[10.5px] font-bold py-0.5 border-b border-v-teal/5 text-v-teal">
                    <span className="truncate pr-1">• {item.name}</span>
                    <span className="font-mono bg-white border border-v-teal/35 px-1.5 py-0.5 rounded font-black text-[9px] text-v-coral shrink-0">
                      {item.amount}{item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
