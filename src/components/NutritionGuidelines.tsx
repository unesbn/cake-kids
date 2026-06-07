import React, { useState } from "react";
import { 
  Sparkles, 
  HelpCircle, 
  Pipette, 
  Info,
  ChevronDown,
  ChevronUp,
  Award,
  Layers
} from "lucide-react";

interface DecoratingStage {
  technique: string;
  focusTitle: string;
  explanation: string;
  visualGraphicIcon: string;
  bakerChecklist: string;
  complexityLevel: string;
  panelStyle: string;
}

const DECORATING_STAGES: { [key: string]: DecoratingStage } = {
  buttercream: {
    technique: "Buttercream Color Science",
    focusTitle: "Whipping Sweet Gradients",
    explanation: "Standard sweet buttercream gains its silky structure from aerated real butter beaten with fine icing sugar. Use tiny drops of gel icing coloring (not liquid colors!) to create vibrant pink unicorn shades or rich dinosaur grass greens without liquefying your frosting.",
    visualGraphicIcon: "🎨 Color Mix",
    bakerChecklist: "Whip butter for 5 full minutes until pale white before adding sugar, then fold coloring drops gently utilizing a silicone baking paddle.",
    complexityLevel: "Friendly Baker",
    panelStyle: "w-12 h-12 rounded-full border-4 border-v-coral bg-rose-200"
  },
  piping: {
    technique: "Piping Bag Mastery",
    focusTitle: "Delicate Miniature Stars & Swirls",
    explanation: "Small cakes require narrow star nozzles (like open star nozzles) to fit the limited canvas. Guide the piping bag steadily from the center outward, releasing pressure cleanly at the end of each round to avoid uneven spikes on your mini bento or cupcake crown.",
    visualGraphicIcon: "🧁 Icing Bag",
    bakerChecklist: "Fill bags only halfway to maximize single-handed grip pressure, and use reusable silicone sleeves for perfect heat isolation.",
    complexityLevel: "Showstopper Pro",
    panelStyle: "w-16 h-16 border-t-8 border-l-8 border-v-mint bg-emerald-50 rounded-lg"
  },
  decor: {
    technique: "Sprinkle Physics & Candy Layers",
    focusTitle: "Symmetric Topping Placements",
    explanation: "When throwing star sprinkles on 4-inch cakes, use a pinch-and-release style from higher up (approx. 15cm) so gravitational pull scatters them randomly. For precise teddy bears or dinosaur placements, use small plastic kitchen tweezers.",
    visualGraphicIcon: "✨ Sprinkle Art",
    bakerChecklist: "Apply sprinkles immediately after icing. Buttercream develops a dry exterior crust within 10 minutes, causing sprinkles to bounce off!",
    complexityLevel: "Easy Peasy",
    panelStyle: "w-20 h-20 border-4 border-v-purple bg-purple-50 rounded-b-2xl"
  }
};

const FAQS = [
  {
    id: "f1",
    question: "Why should I choose gel food coloring over liquid grocery coloring?",
    answer: "Liquid food coloring contains high ratios of water, which breaks down the emulsified fat bonds inside buttercream, causing your frosting to sweat, curdle, or collapse. Sugar-rich Gel or Paste colors are concentrated, offering vivid colors with just 1-2 drops!"
  },
  {
    id: "f2",
    question: "How do I make my small bento cake frosting perfectly smooth?",
    answer: "Apply a very thin 'crumb-coat' of vanilla icing first and refrigerate the mini cake for 15 minutes. This traps loose golden cake crumbs and provides a flat foundation. Then, apply your final thick colored buttercream layer using an offset metal spatula."
  },
  {
    id: "f3",
    question: "Any tips for keeping cupcakes moist for a kid's birthday party?",
    answer: "Brush your cooled cupcake sponges with simple sugar syrup (equal parts water and sugar boiled until clear) using a clean pastry brush. This locks in internal humidity for up to 48 hours, keeping the cake bouncy even when exposed to active air."
  }
];

export default function NutritionGuidelines() {
  const [selectedStageKey, setSelectedStageKey] = useState<string>("buttercream");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const activeStage = DECORATING_STAGES[selectedStageKey];

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="space-y-10" id="decorating-lab-corner">
      
      {/* Intro Header */}
      <div className="bg-white border-4 border-v-teal rounded-[40px] p-6 md:p-8 text-center max-w-3xl mx-auto space-y-4 shadow-v-md text-v-teal">
        <span className="inline-block px-4 py-1.5 bg-v-purple text-white text-xs font-black tracking-wider uppercase rounded-full border-2 border-v-teal shadow-v-sm">
          Aesthetic Decorating School
        </span>
        <h2 className="text-2xl md:text-4xl font-black uppercase text-v-teal font-sans tracking-tight leading-none">
          Mini-Cake Decorating Lab
        </h2>
        <p className="text-v-teal text-xs md:text-sm font-bold leading-relaxed max-w-xl mx-auto opacity-90">
          Learn professional bakery secrets on whipped buttercream coloring, steady piping bags handles, 
          and precise star sprinkle scattering for single-serving bento bakes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core details panel (Left) */}
        <div className="lg:col-span-8 bg-white border-4 border-v-teal rounded-[40px] p-6 md:p-8 shadow-v-md space-y-6 text-v-teal">
          
          <div className="flex items-center gap-2 pb-4 border-b-4 border-dashed border-v-teal/10">
            <Layers className="w-6 h-6 text-v-mint" />
            <h3 className="font-extrabold text-v-teal uppercase text-lg">
              Decor Techniques & Methods
            </h3>
          </div>

          {/* Age Selection Buttons Tab */}
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(DECORATING_STAGES).map(([key, stg]) => {
              const isActive = selectedStageKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStageKey(key)}
                  className={`p-3 rounded-2xl text-[10px] md:text-xs font-black uppercase transition-all tracking-tight border-2 border-v-teal cursor-pointer ${
                    isActive 
                      ? "bg-v-coral text-white shadow-v-sm scale-[1.03]" 
                      : "bg-v-cream hover:bg-v-yellow text-v-teal"
                  }`}
                >
                  <p className="leading-tight">{stg.technique}</p>
                </button>
              );
            })}
          </div>

          {/* Visual board */}
          <div className="p-6 bg-v-cream/50 border-4 border-v-teal rounded-[32px] grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-v-sm text-v-teal">
            
            {/* Visual Plate Graphic */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3 shrink-0">
              <div className="relative w-32 h-32 rounded-full bg-white border-4 border-v-teal flex items-center justify-center shadow-v-inner">
                {/* Visual shape representation */}
                <div className={`absolute transition-all duration-300 border-2 border-v-teal ${activeStage.panelStyle}`} />
                
                <span className="absolute text-[10px] font-black text-v-teal tracking-tight text-center px-1 uppercase leading-none">
                  {activeStage.visualGraphicIcon}
                </span>
              </div>
              
              <p className="text-[10px] font-black text-v-teal bg-v-yellow border-2 border-v-teal px-3 py-1 rounded-full uppercase shadow-v-sm">
                Complexity: {activeStage.complexityLevel}
              </p>
            </div>

            {/* Left aligned stage data */}
            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-v-teal/55">
                  Decor Method Focus:
                </span>
                <p className="font-black text-base md:text-lg text-v-teal uppercase tracking-tight leading-snug">
                  {activeStage.focusTitle}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-v-teal/55">
                  How It Performs:
                </span>
                <p className="text-xs font-bold leading-relaxed text-v-teal">
                  {activeStage.explanation}
                </p>
              </div>

              <div className="space-y-1 pt-3.5 border-t-2 border-dashed border-v-teal/15">
                <span className="text-[10px] uppercase font-black text-v-coral tracking-wider">
                  Baker Action Rule & Checklist:
                </span>
                <p className="text-xs font-semibold leading-relaxed text-v-teal">
                  {activeStage.bakerChecklist}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ panel (Right) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-v-teal text-white rounded-[40px] border-4 border-v-teal p-6 shadow-v-md space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-white/10">
              <HelpCircle className="w-5 h-5 text-v-yellow" />
              <h4 className="font-extrabold text-v-cream uppercase text-sm tracking-tight">Decorating Q&A</h4>
            </div>

            <div className="space-y-3 divide-y-2 divide-dashed divide-white/10">
              {FAQS.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div key={faq.id} className="pt-3 first:pt-0 pb-1">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between text-left text-xs font-black uppercase tracking-tight py-1 text-v-cream hover:text-v-yellow transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 shrink-0 text-v-yellow" />
                      ) : (
                        <ChevronDown className="w-4 h-4 shrink-0 text-v-cream/50" />
                      )}
                    </button>

                    {isOpen && (
                      <p className="text-[11px] font-bold text-v-cream/90 leading-relaxed pt-2.5 animate-fade-in normal-case">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick fiber integration diagram / Temperature rules */}
          <div className="bg-v-yellow border-4 border-v-teal rounded-[40px] p-6 shadow-v-md space-y-3.5 text-xs text-v-teal">
            <p className="font-black flex items-center gap-1.5 uppercase text-v-teal text-sm">
              <Pipette className="w-5 h-5 text-v-coral stroke-[3px]" />
              The Melted Icing Trap
            </p>
            
            <p className="font-bold leading-relaxed text-v-teal/90 text-[11px]">
              Always bake your small kids cupcakes or bento bases and let them rest on wire rods for at least 1 hour. 
              Decorating a slightly warm sponge cake acts as an instant heater, transferring energy that melts fats 
              and sugars inside your cute buttercream icing and turns your lovely smiley piping faces into a soup!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
