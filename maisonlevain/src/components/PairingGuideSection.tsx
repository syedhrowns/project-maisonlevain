import React, { useState } from 'react';
import { Sparkles, Utensils, Wine, Coffee, Plus, Check, ChevronRight } from 'lucide-react';
import { BakeryItem } from '../types';
import { motion } from 'motion/react';

interface PairingProfile {
  itemId: string;
  itemName: string;
  itemImage: string;
  frenchTitle: string;
  cheesePairing: {
    name: string;
    origin: string;
    description: string;
  };
  pantryPairing: {
    name: string;
    description: string;
  };
  beveragePairing: {
    name: string;
    type: string;
    description: string;
  };
  chefAdvice: string;
}

const PAIRING_PROFILES: PairingProfile[] = [
  {
    itemId: 'country-batard',
    itemName: 'Country Batard (Pain de Campagne)',
    itemImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/USS_John_C._Stennis_baker.jpg/1280px-USS_John_C._Stennis_baker.jpg',
    frenchTitle: 'L\'Harmonie Champêtre',
    cheesePairing: {
      name: '24-Month Cave-Aged Comté AOP',
      origin: 'Jura Mountains, France',
      description: 'The roasted hazelnut notes of Comté melt seamlessly with the lactic tang and toasted crust of our wild batard.'
    },
    pantryPairing: {
      name: 'Beurre de Baratte & Confit Shallots',
      description: 'Thick-cut slices slathered with cold-churned Normandy salt butter and slow-simmered rosemary shallot confit.'
    },
    beveragePairing: {
      name: 'Domaine de la Romanée Red Burgundy or Filtered Geisha Coffee',
      type: 'Pinot Noir / Pour-Over',
      description: 'Earthy forest-floor tannins cut through the crisp crust while enhancing the mineral sourdough complexity.'
    },
    chefAdvice: 'Toast thick 18mm slices over cast iron with grass-fed butter until the edges bronze.'
  },
  {
    itemId: 'walnut-fig-levain',
    itemName: 'Roasted Walnut & Black Fig Levain',
    itemImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Home_made_sour_dough_bread.jpg/1280px-Home_made_sour_dough_bread.jpg',
    frenchTitle: 'L\'Accord Doux & Rustique',
    cheesePairing: {
      name: 'Roquefort AOP Papillon & Aged Goat Chèvre',
      origin: 'Aveyron, France',
      description: 'The intense saline blue bite of Roquefort is instantly tamed and balanced by sweet Mission black figs.'
    },
    pantryPairing: {
      name: 'Lavender Wildflower Honey & Prosciutto di Parma',
      description: 'Drizzled with raw Provencal lavender honey and layered with paper-thin 24-month dry-cured ham.'
    },
    beveragePairing: {
      name: 'Sauternes Dessert Wine or Japanese Hojicha Tea',
      type: 'Sweet White / Roasted Green Tea',
      description: 'Honeyed stone fruit aromas in Sauternes echo the figs, creating an unforgettable cheese board climax.'
    },
    chefAdvice: 'Serve at room temperature alongside a charcuterie board with fresh thyme.'
  },
  {
    itemId: 'classic-croissant',
    itemName: 'Isigny Butter Croissant',
    itemImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Croissant-Petr_Kratochvil.jpg',
    frenchTitle: 'Le Grand Classique Parisien',
    cheesePairing: {
      name: 'Triple-Crème Brillat-Savarin AOP',
      origin: 'Normandy, France',
      description: 'Lush, decadent triple-cream cheese matching the 84% butterfat richness of Isigny lamination.'
    },
    pantryPairing: {
      name: 'Mara des Bois Wild Strawberry Confiture',
      description: 'Slow-cooked copper pot strawberry jam with natural pectin for a tart berry counterpoint.'
    },
    beveragePairing: {
      name: 'Single-Origin Ethiopian Yirgacheffe Flat White',
      type: 'Light Roast Espresso & Velvety Milk',
      description: 'Bright citrus floral notes in the espresso cut through the shatteringly flaky butter layers.'
    },
    chefAdvice: 'Enjoy within 3 hours of the 8:00 AM or 12:00 PM morning drop.'
  },
  {
    itemId: 'sourdough-focaccia-rosemary',
    itemName: 'Heritage Sourdough Focaccia',
    itemImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Focaccia_with_Crumb.jpg/1280px-Focaccia_with_Crumb.jpg',
    frenchTitle: 'La Table Méditerranéenne',
    cheesePairing: {
      name: 'Fresh Stracciatella di Bufala',
      origin: 'Puglia, Italy',
      description: 'Creamy sweet buffalo shreds dripping over the warm rosemary, sea salt, and confit garlic pockets.'
    },
    pantryPairing: {
      name: '25-Year Traditional Balsamic of Modena & EVOO',
      description: 'First cold-pressed Tuscan olive oil paired with syrupy aged balsamic vinegar.'
    },
    beveragePairing: {
      name: 'Crisp Vermentino or Franciacorta Brut',
      type: 'Mineral White / Italian Sparkling',
      description: 'Crisp saline minerality and lively effervescence highlight the olive oil and blistered bottom crust.'
    },
    chefAdvice: 'Warm in a hot dry skillet for 90 seconds to re-crisp the olive oil crust.'
  }
];

interface PairingGuideSectionProps {
  products: BakeryItem[];
  onQuickAdd: (item: BakeryItem) => void;
  onOpenItemDetail: (item: BakeryItem) => void;
}

export const PairingGuideSection: React.FC<PairingGuideSectionProps> = ({
  products,
  onQuickAdd,
  onOpenItemDetail,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<PairingProfile>(PAIRING_PROFILES[0]);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const matchedProduct = products.find((p) => p.id === selectedProfile.itemId);

  const handleAddMatchingItem = () => {
    if (matchedProduct) {
      onQuickAdd(matchedProduct);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 1500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="pairings-section" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EDE2]/50 border-b border-[#E5DACD] relative overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#E8C5A0]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-[#8D4B26]">
            <Utensils className="w-3.5 h-3.5 text-[#C17D44]" />
            <span>L'Accord Parfait</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#341C02]">
            Sommelier Pairing Guide & Artisanal Tables
          </h2>
          <p className="text-sm sm:text-base text-[#5E5244] leading-relaxed">
            Bread is the canvas of the French gastronomic table. Explore our master baker's curated pairings of raw-milk artisan cheeses, biodynamic wines, and estate preserves.
          </p>
        </motion.div>

        {/* Pairing Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Selection Cards */}
          <motion.div 
            className="lg:col-span-4 space-y-3 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[#8C7A68] px-1">
              Select Signature Loaf / Pastry
            </p>
            {PAIRING_PROFILES.map((profile) => {
              const isSelected = selectedProfile.itemId === profile.itemId;
              return (
                <button
                  key={profile.itemId}
                  onClick={() => setSelectedProfile(profile)}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-white border-[#A8794E] shadow-md ring-1 ring-[#A8794E]/30'
                      : 'glass-card border-[#E5DACD] hover:bg-white/70'
                  }`}
                >
                  <img
                    src={profile.itemImage}
                    alt={profile.itemName}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold text-[#8D4B26] tracking-wider">
                      {profile.frenchTitle}
                    </p>
                    <p className="font-serif font-bold text-sm text-[#341C02] truncate">
                      {profile.itemName.split('(')[0]}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#341C02]' : 'text-[#A89887]'}`} />
                </button>
              );
            })}
          </motion.div>

          {/* Right Sommelier Tasting Board */}
          <motion.div 
            className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-[#E2D7CA] flex flex-col justify-between space-y-6 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            
            <div className="space-y-6">
              
              {/* Header with Title & Advice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DACD] pb-4">
                <div>
                  <span className="text-xs italic font-serif text-[#8D4B26]">
                    Sommelier Tasting Notes
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#341C02]">
                    {selectedProfile.itemName}
                  </h3>
                </div>

                {matchedProduct && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenItemDetail(matchedProduct)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#D9CEBF] text-[#341C02] hover:bg-[#FAF7F2] transition-colors"
                    >
                      View Loaf Specs
                    </button>
                    <button
                      onClick={handleAddMatchingItem}
                      className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#341C02] text-[#FAF7F2] hover:bg-[#45372B] transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                    >
                      {addedSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#A8D5BA]" />
                          <span>Added to Basket</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Loaf (${matchedProduct.price.toFixed(2)})</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* 3 Pairing Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Artisanal Cheese */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8DFD1] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8D4B26] uppercase tracking-wider">
                    <Utensils className="w-4 h-4 text-[#C17D44]" />
                    <span>Fromage Affiné</span>
                  </div>
                  <p className="font-serif font-bold text-sm text-[#341C02]">
                    {selectedProfile.cheesePairing.name}
                  </p>
                  <p className="text-[11px] text-[#8C7A68] font-medium">
                    {selectedProfile.cheesePairing.origin}
                  </p>
                  <p className="text-xs text-[#5E5244] leading-relaxed">
                    {selectedProfile.cheesePairing.description}
                  </p>
                </div>

                {/* 2. Pantry & Spread */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8DFD1] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8D4B26] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#C17D44]" />
                    <span>Gourmet Pantry</span>
                  </div>
                  <p className="font-serif font-bold text-sm text-[#341C02]">
                    {selectedProfile.pantryPairing.name}
                  </p>
                  <p className="text-xs text-[#5E5244] leading-relaxed pt-3">
                    {selectedProfile.pantryPairing.description}
                  </p>
                </div>

                {/* 3. Wine / Coffee Beverage */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8DFD1] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8D4B26] uppercase tracking-wider">
                    <Wine className="w-4 h-4 text-[#C17D44]" />
                    <span>Wine & Roast Accord</span>
                  </div>
                  <p className="font-serif font-bold text-sm text-[#341C02]">
                    {selectedProfile.beveragePairing.name}
                  </p>
                  <p className="text-[11px] text-[#8C7A68] font-medium">
                    {selectedProfile.beveragePairing.type}
                  </p>
                  <p className="text-xs text-[#5E5244] leading-relaxed">
                    {selectedProfile.beveragePairing.description}
                  </p>
                </div>

              </div>

              {/* Master Baker's Serving Ritual */}
              <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F0DFCF] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F7EBE1] flex items-center justify-center text-[#8D4B26] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#8D4B26] uppercase tracking-wider">
                    Master Baker's Serving Ritual
                  </p>
                  <p className="text-xs text-[#6E5D4C] leading-relaxed">
                    "{selectedProfile.chefAdvice}"
                  </p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
