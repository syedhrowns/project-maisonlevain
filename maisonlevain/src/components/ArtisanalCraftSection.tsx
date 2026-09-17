import React, { useState } from 'react';
import { CRAFT_PHILOSOPHY } from '../data/products';
import { Wheat, Droplets, Sparkles, Flame, CheckCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const ArtisanalCraftSection: React.FC = () => {
  const [hydrationLevel, setHydrationLevel] = useState<number>(82);

  // Helper text based on hydration slider
  const getHydrationAnalysis = (lvl: number) => {
    if (lvl < 75) {
      return {
        crumb: 'Dense, uniform sandwich crumb',
        crust: 'Thick, firm, golden',
        keeping: '2-3 days freshness',
        description: 'Traditional standard bread dough with tight structure.',
      };
    } else if (lvl <= 82) {
      return {
        crumb: 'Wild, open honeycomb with glistening custardy pockets',
        crust: 'Thin, blistered, shattering ear',
        keeping: '5-7 days naturally preserved via lactic acidity',
        description: 'Our signature Maison Levain country batard standard.',
      };
    } else {
      return {
        crumb: 'Extreme high-aeration cloud crumb, pillow-soft',
        crust: 'Lacquered, delicate, olive-oil kissed',
        keeping: 'Requires high heat deck baking & overnight autolyse',
        description: 'Used in our 48h Heritage Rosemary Sourdough Focaccia.',
      };
    }
  };

  const analysis = getHydrationAnalysis(hydrationLevel);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="craft-section" className="scroll-mt-20 sm:scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-[#F4EDE2]/70 border-y border-[#E5DACD] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#E8C5A0]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E27D60]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#8D4B26] font-bold">
            Artisanal Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#341C02]">
            The Alchemy of Time, Flour & Wild Levain
          </h2>
          <p className="text-sm sm:text-base text-[#5E5244] leading-relaxed">
            True bread requires no commercial acceleration. We honor the ancestral European tradition of slow-fermentation and stone-milled heritage grains.
          </p>
        </motion.div>

        {/* 4 Craft Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CRAFT_PHILOSOPHY.map((pillar, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-[#E5DACD] space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D4B26]">
                    {pillar.subtitle}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E0D4C5] flex items-center justify-center font-serif text-xs font-bold text-[#341C02]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#341C02]">
                  {pillar.title}
                </h3>

                <p className="text-xs text-[#6B5E4F] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE8DC] flex items-baseline justify-between">
                <span className="font-serif text-2xl font-bold text-[#341C02]">
                  {pillar.stat}
                </span>
                <span className="text-[11px] font-medium text-[#786C5E]">
                  {pillar.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Hydration & Crumb Visualizer Card */}
        <motion.div 
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#E2D7CA] shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left explanation & slider */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E0D4C5] text-xs font-semibold text-[#8D4B26]">
                <Droplets className="w-3.5 h-3.5 text-[#C17D44]" />
                <span>Interactive Baker's Formula</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#341C02]">
                Why High Hydration Matters in Sourdough
              </h3>

              <p className="text-xs sm:text-sm text-[#5E5244] leading-relaxed">
                Hydration is the ratio of water to flour by weight. While commercial bakeries use 60-65% for machine handling, our master bakers hand-fold doughs at <strong>80% to 88% hydration</strong>, creating our signature custardy, long-lasting open crumb.
              </p>

              {/* Slider Controller */}
              <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2D7CA]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5E5244]">
                    Dough Hydration Rate
                  </span>
                  <span className="font-serif text-xl font-bold text-[#8D4B26]">
                    {hydrationLevel}% Water-to-Flour
                  </span>
                </div>

                <input
                  type="range"
                  min="68"
                  max="88"
                  step="1"
                  value={hydrationLevel}
                  onChange={(e) => setHydrationLevel(Number(e.target.value))}
                  className="w-full h-2 bg-[#EFE8DC] rounded-lg appearance-none cursor-pointer accent-[#341C02]"
                />

                <div className="flex justify-between text-[11px] text-[#786C5E] font-medium">
                  <span>68% (Standard Loaf)</span>
                  <span className="font-bold text-[#341C02]">82% (Maison Levain)</span>
                  <span>88% (Focaccia)</span>
                </div>
              </div>
            </div>

            {/* Right Output Card */}
            <div className="lg:col-span-6 space-y-4 bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-[#E2D7CA]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8D4B26]">
                <Sparkles className="w-3.5 h-3.5 text-[#C17D44]" />
                <span>Crumb & Texture Analysis ({hydrationLevel}%)</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
                  <p className="text-xs font-bold text-[#341C02]">Crumb Structure</p>
                  <p className="text-xs text-[#5E5244] mt-0.5">{analysis.crumb}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
                  <p className="text-xs font-bold text-[#341C02]">Crust Character</p>
                  <p className="text-xs text-[#5E5244] mt-0.5">{analysis.crust}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
                  <p className="text-xs font-bold text-[#341C02]">Shelf Life & Flavor</p>
                  <p className="text-xs text-[#5E5244] mt-0.5">{analysis.keeping}</p>
                </div>
              </div>

              <p className="text-xs italic text-[#786C5E] font-serif border-t border-[#EAE0D3] pt-3">
                "{analysis.description}"
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
