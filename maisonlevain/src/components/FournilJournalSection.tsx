import React from 'react';
import { Clock, Flame, Sparkles, Wheat, Camera, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface JournalMoment {
  time: string;
  title: string;
  frenchTitle: string;
  story: string;
  image: string;
  craftTag: string;
}

const JOURNAL_MOMENTS: JournalMoment[] = [
  {
    time: '04:15 AM',
    title: 'Awakening the 112-Year Mother Culture',
    frenchTitle: 'Le Réveil du Levain Chef',
    story: 'Before Paris stirs, the fournil air fills with sweet lactic aromas as we refresh our ancestral levain with mountain spring water and stoneground rye.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Dough.jpg/1280px-Dough.jpg',
    craftTag: 'Living Levain'
  },
  {
    time: '06:00 AM',
    title: 'Hand-Folding High Hydration Batches',
    frenchTitle: 'Le Rabattage Artisanal',
    story: 'Gentle coil folds every 45 minutes develop exceptional gluten extensibility without degassing delicate wild honeycomb alveoli.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kneading.jpg/1280px-Kneading.jpg',
    craftTag: '82% Hydration'
  },
  {
    time: '07:45 AM',
    title: 'Lame Scoring & High-Steam Hearth Deck',
    frenchTitle: 'L\'Enfournement & Coup de Lame',
    story: 'Using razor-sharp French lames, each loaf is hand-scored with a signature crescent ear before baking at 245°C with saturated steam.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Baguettes%2C_Paris%2C_France_-_panoramio.jpg/1280px-Baguettes%2C_Paris%2C_France_-_panoramio.jpg',
    craftTag: 'Volcanic Stone'
  },
  {
    time: '10:00 AM',
    title: 'Cooling & Acoustic Crust "Singing"',
    frenchTitle: 'Le Pain qui Chante',
    story: 'As hot loaves rest on wooden willow racks, the caramelized crust crackles softly—a phenomenon French bakers cherish as the "bread singing".',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Freshly_baked_bread_loaves.jpg/1280px-Freshly_baked_bread_loaves.jpg',
    craftTag: 'Open Crumb'
  }
];

interface FournilJournalSectionProps {
  onOpenSchedule: () => void;
}

export const FournilJournalSection: React.FC<FournilJournalSectionProps> = ({
  onOpenSchedule
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="journal-section" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-b border-[#E5DACD] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DACD] pb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-[#8D4B26]">
              <Camera className="w-3.5 h-3.5 text-[#C17D44]" />
              <span>La Vie du Fournil</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#341C02]">
              A Photographic Dawn in Paris
            </h2>
            <p className="text-sm text-[#5E5244] leading-relaxed">
              Every morning begins in the quiet hours of Saint-Honoré. Step inside our stone hearth bakery and witness the unhurried transformation of wheat and water.
            </p>
          </div>

          <button
            onClick={onOpenSchedule}
            className="self-start md:self-auto glass-card hover:bg-white text-[#341C02] px-5 py-2.5 rounded-xl border border-[#DFD3C3] text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
          >
            <Clock className="w-4 h-4 text-[#A8794E]" />
            <span>View Today's Bake Schedule</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNAL_MOMENTS.map((moment, idx) => (
            <motion.div
              key={idx}
              className="group glass-card rounded-2xl overflow-hidden border border-[#E5DACD] hover:border-[#D0C0AC] hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            >
              {/* Photo */}
              <div className="relative h-60 w-full overflow-hidden bg-[#EFE8DC]">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C140E]/80 via-transparent to-transparent" />
                
                {/* Floating Time Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#341C02] shadow-sm">
                  <Clock className="w-3 h-3 text-[#A8794E]" />
                  <span>{moment.time}</span>
                </div>

                {/* Craft Tag */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-[#E8C5A0] tracking-wider block">
                    {moment.craftTag}
                  </span>
                  <p className="font-serif font-bold text-base leading-snug">
                    {moment.frenchTitle}
                  </p>
                </div>
              </div>

              {/* Story */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#341C02] leading-tight">
                    {moment.title}
                  </h3>
                  <p className="text-xs text-[#6B5E4F] leading-relaxed mt-2">
                    {moment.story}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#8C7A68]">
                  <span>Maison Levain Fournil</span>
                  <span className="font-bold">Step 0{idx + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};
