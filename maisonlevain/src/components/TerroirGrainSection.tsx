import React, { useState } from 'react';
import { Wheat, Mountain, Droplet, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Category } from '../types';
import { motion } from 'motion/react';

interface GrainData {
  id: string;
  name: string;
  frenchName: string;
  region: string;
  milling: string;
  protein: string;
  ash: string;
  flavorNotes: string;
  image: string;
  usedIn: string;
  filterCategory: Category;
  description: string;
}

const GRAINS: GrainData[] = [
  {
    id: 'rouge-bordeaux',
    name: 'Rouge de Bordeaux T80',
    frenchName: 'Blé Ancien d\'Aquitaine',
    region: 'Aquitaine & Charente, France',
    milling: 'Slow Astrié Granite Stone Burrs',
    protein: '13.8%',
    ash: '0.80% (Semi-Complete)',
    flavorNotes: 'Warm brioche, hazelnut butter, caramelized crust',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/A_close-up_image_of_wheat_grains.jpg/1280px-A_close-up_image_of_wheat_grains.jpg',
    usedIn: 'Heritage Country Batard',
    filterCategory: 'sourdough',
    description: 'An 18th-century heirloom red winter wheat prized for its sweet baking perfume and nutrient-dense germ.'
  },
  {
    id: 'petit-epeautre',
    name: 'Petit Épeautre Einkorn',
    frenchName: 'Engrain Sauvage de Provence',
    region: 'Haute-Provence Plateau, France',
    milling: 'Granite Millstone Cold-Ground',
    protein: '11.5%',
    ash: '1.10% (Whole Ancient Grain)',
    flavorNotes: 'Toasted walnuts, honeyed malt, mineral soil',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Triticum-monococcum-ear.JPG/1280px-Triticum-monococcum-ear.JPG',
    usedIn: 'Ancient Einkorn Miche',
    filterCategory: 'sourdough',
    description: 'The ancient mother grain of civilization cultivated since 10,000 BC. Naturally gentle on digestion.'
  },
  {
    id: 'seigle-lozere',
    name: 'Heritage Black Rye T130',
    frenchName: 'Seigle Noir de Haute Altitude',
    region: 'Lozère Volcanic Slopes, France',
    milling: 'Traditional Watermill Stone Burrs',
    protein: '9.2%',
    ash: '1.30% (Whole Dark Rye)',
    flavorNotes: 'Dark cocoa, fermented wild fruits, earthy tang',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Rye_grains_rotated_%28cropped%29.jpg/1280px-Rye_grains_rotated_%28cropped%29.jpg',
    usedIn: 'Walnut & Fig Levain & Mother Culture',
    filterCategory: 'sourdough',
    description: 'Slow-grown mountain rye providing the vigorous lactic acid flora that feeds our 112-year living starter.'
  },
  {
    id: 'label-rouge-t65',
    name: 'French Label Rouge T65',
    frenchName: 'Farine de Tradition Française',
    region: 'Beauce Valley, France',
    milling: 'Roller & Stone Combination',
    protein: '12.4%',
    ash: '0.65% (French Pastry Standard)',
    flavorNotes: 'Golden wheat, fresh cream, shattering crust',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/All-Purpose_Flour_%284107895947%29.jpg/1280px-All-Purpose_Flour_%284107895947%29.jpg',
    usedIn: 'Isigny Butter Croissant & Pain au Chocolat',
    filterCategory: 'viennoiserie',
    description: 'Certified 100% additive-free French wheat delivering unmatched honeycombed alveoli in our viennoiserie.'
  }
];

interface TerroirGrainSectionProps {
  onSelectGrainCategory: (category: Category) => void;
}

export const TerroirGrainSection: React.FC<TerroirGrainSectionProps> = ({
  onSelectGrainCategory
}) => {
  const [selectedGrainId, setSelectedGrainId] = useState<string>(GRAINS[0].id);
  const selectedGrain = GRAINS.find(g => g.id === selectedGrainId) || GRAINS[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="grains-section" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-b border-[#E5DACD] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-5 w-80 h-80 bg-[#C89666]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-[#8D4B26]">
            <Wheat className="w-3.5 h-3.5 text-[#C17D44]" />
            <span>L'Origine des Terroirs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#341C02]">
            Single-Estate Heritage Grains & Cold Stone Milling
          </h2>
          <p className="text-sm sm:text-base text-[#5E5244] leading-relaxed">
            Industrial white flour removes 80% of wheat nutrition. We partner with biodynamic French grain growers who cultivate heirloom varieties, milled gently without heat to keep every living nutrient alive.
          </p>
        </motion.div>

        {/* Interactive Grain Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Grain Selector Tabs */}
          <motion.div 
            className="lg:col-span-5 space-y-3 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            {GRAINS.map((grain) => {
              const isSelected = selectedGrain.id === grain.id;
              return (
                <button
                  key={grain.id}
                  onClick={() => setSelectedGrainId(grain.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#A8794E] shadow-md ring-1 ring-[#A8794E]/30'
                      : 'glass-card border-[#E5DACD] hover:bg-white/70 hover:border-[#D0C0AC]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8D4B26]">
                      {grain.frenchName}
                    </span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#341C02]">
                      {grain.name}
                    </h3>
                    <p className="text-xs text-[#786C5E] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#A8794E]" />
                      {grain.region}
                    </p>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#341C02] text-[#FAF7F2]' : 'bg-[#F4EBE1] text-[#786C5E]'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Detailed Terroir Showcase Card */}
          <motion.div 
            className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-[#E2D7CA] flex flex-col justify-between space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            
            <div className="space-y-6">
              
              {/* Image & Key Badges */}
              <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 w-full shadow-inner bg-[#EFE8DC]">
                <motion.img
                  key={selectedGrain.id} // Re-animate image change
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={selectedGrain.image}
                  alt={selectedGrain.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <span className="text-xs font-serif italic text-[#E8C5A0]">Estate Origin</span>
                    <h4 className="text-xl font-serif font-bold">{selectedGrain.name}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/20">
                    100% Bio Certified
                  </span>
                </div>
              </div>

              {/* Description */}
              <motion.p 
                key={`${selectedGrain.id}-desc`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[#4A3C2F] leading-relaxed"
              >
                {selectedGrain.description}
              </motion.p>

              {/* Technical Grain Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white border border-[#E8DFD1]">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A68]">Natural Protein</p>
                  <p className="text-sm font-serif font-bold text-[#341C02] mt-0.5">{selectedGrain.protein}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E8DFD1]">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A68]">Ash & Minerals</p>
                  <p className="text-sm font-serif font-bold text-[#341C02] mt-0.5">{selectedGrain.ash}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E8DFD1]">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A68]">Milling Method</p>
                  <p className="text-xs font-bold text-[#341C02] mt-0.5 truncate">{selectedGrain.milling.split(' ')[0]}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E8DFD1]">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A68]">Key Bread</p>
                  <p className="text-xs font-bold text-[#8D4B26] mt-0.5 truncate">{selectedGrain.usedIn.split('&')[0]}</p>
                </div>
              </div>

              {/* Tasting Notes */}
              <div className="p-4 rounded-xl bg-[#FFF9F3] border border-[#F0DFCF] space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8D4B26]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aromatics & Crumb Character:</span>
                </div>
                <p className="text-xs text-[#6E5D4C] italic font-serif">
                  "{selectedGrain.flavorNotes}"
                </p>
              </div>

            </div>

            {/* Bottom CTA to shop breads made from this grain */}
            <div className="pt-4 border-t border-[#E5DACD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#786C5E]">
                Featured in: <strong className="text-[#341C02]">{selectedGrain.usedIn}</strong>
              </div>

              <button
                onClick={() => onSelectGrainCategory(selectedGrain.filterCategory)}
                className="w-full sm:w-auto bg-[#341C02] hover:bg-[#45372B] text-[#FAF7F2] px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
              >
                <span>Explore Breads Made with {selectedGrain.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
