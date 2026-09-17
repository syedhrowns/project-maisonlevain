import React, { useState } from 'react';
import { Star, Award, Quote, CheckCircle2, ThumbsUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  id: string;
  author: string;
  avatar: string;
  role: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedItem: string;
}

const PRESS_QUOTES = [
  {
    publication: 'Le Guide Michelin',
    badge: 'Paris Bakery Selection 2026',
    quote: 'Maison Levain represents the pinnacle of French slow-fermentation revival. Their Country Batard delivers a crust so caramelized and a crumb so glistening it sets a new standard for Paris.',
    author: 'Gastronomy Editorial Board'
  },
  {
    publication: 'Le Figaro Épicurien',
    badge: 'Best Croissant in Paris',
    quote: 'With 27 distinct hand-rolled layers of Isigny AOP butter, biting into their croissant is a moment of pure acoustic and buttery ecstasy.',
    author: 'François-Régis Gaudry'
  },
  {
    publication: 'Gault & Millau',
    badge: 'Artisan of the Year',
    quote: 'Henri Laurent treats ancient flours like grand cru grapes. The biodynamic Einkorn miche proves that ancestral nutrition and haute gastronomy belong together.',
    author: 'Chef Panel'
  }
];

const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Élodie Fontaine',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    role: 'Saint-Honoré Resident',
    rating: 5,
    date: 'Yesterday',
    title: 'The best sourdough in France, period.',
    comment: 'I walk past 4 boulangeries every morning just to reach Maison Levain for the 10:15 AM batard drop. The crumb stays fresh for nearly a full week thanks to their wild fermentation.',
    verifiedItem: 'Country Batard (Pain de Campagne)'
  },
  {
    id: 'rev-2',
    author: 'Marc Vandeberg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    role: 'Verified Food Critic',
    rating: 5,
    date: '3 days ago',
    title: 'Unbelievable honeycomb structure',
    comment: 'The Valrhona pain au chocolat and Brittany Kouign-Amann are masterclasses in lamination. Shattering crusts with zero oily residue.',
    verifiedItem: 'Valrhona Pain au Chocolat'
  },
  {
    id: 'rev-3',
    author: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    role: 'Home Sourdough Baker',
    rating: 5,
    date: '1 week ago',
    title: 'The 100-Year Starter Kit changed my baking!',
    comment: 'The live starter in the Weck jar exploded with bubbles within 4 hours of arrival. My home loaves now have that deep custard crumb and blistered ear I could never achieve before.',
    verifiedItem: 'Maison Levain Starter Kit'
  }
];

export const ReviewsAndPressSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'press' | 'reviews'>('press');

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="reviews-section" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-b border-[#E5DACD] relative overflow-hidden">
      
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
            <Award className="w-3.5 h-3.5 text-[#C17D44]" />
            <span>La Table des Connaisseurs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#341C02]">
            Critical Acclaim & Verified Gourmand Reviews
          </h2>
          <p className="text-sm sm:text-base text-[#5E5244] leading-relaxed">
            Rated <strong>4.96 / 5.0</strong> across 1,200+ Paris patrons, Michelin inspectors, and culinary artisans worldwide.
          </p>

          {/* Toggle Tab Bar */}
          <div className="inline-flex p-1 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C3] mt-2">
            <button
              onClick={() => setActiveTab('press')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'press'
                  ? 'bg-[#341C02] text-[#FAF7F2] shadow-sm'
                  : 'text-[#6E5D4C] hover:text-[#341C02]'
              }`}
            >
              Gastronomy Press & Michelin Guide
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-[#341C02] text-[#FAF7F2] shadow-sm'
                  : 'text-[#6E5D4C] hover:text-[#341C02]'
              }`}
            >
              Patron Reviews (4.96 ★)
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Press Quotes Mode */}
          {activeTab === 'press' && (
            <motion.div 
              key="press"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {PRESS_QUOTES.map((press, idx) => (
              <div
                key={idx}
                className="glass-card p-6 sm:p-7 rounded-3xl border border-[#E5DACD] flex flex-col justify-between space-y-5 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-lg text-[#341C02]">
                      {press.publication}
                    </span>
                    <Quote className="w-6 h-6 text-[#D4A75E] opacity-60" />
                  </div>

                  <span className="inline-block text-[11px] font-bold text-[#8D4B26] bg-[#F7EFE6] px-2.5 py-0.5 rounded-full">
                    {press.badge}
                  </span>

                  <p className="text-xs text-[#5E5244] leading-relaxed italic font-serif">
                    "{press.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] text-[#786C5E]">
                  <span>{press.author}</span>
                  <div className="flex text-[#D4A75E]">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
            ))}
            </motion.div>
          )}

          {/* Customer Reviews Mode */}
          {activeTab === 'reviews' && (
            <motion.div 
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="glass-card p-6 rounded-3xl border border-[#E5DACD] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#D4A75E] text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <span className="text-[11px] text-[#8C7A68]">{rev.date}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#341C02]">
                    {rev.title}
                  </h3>

                  <p className="text-xs text-[#5E5244] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE8DC] space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover border border-[#D9CEBF]" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#341C02] truncate">{rev.author}</p>
                        <span className="text-[10px] text-[#82AA57] flex items-center gap-1 font-semibold shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      </div>
                      <p className="text-[10px] text-[#8C7A68] italic truncate">
                        Purchased: {rev.verifiedItem}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
};
