import { motion } from 'motion/react';

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Heart, Wheat, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { BakeryLogo } from './BakeryLogo';

export const BakeryFooter: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="location-section" className="scroll-mt-20 sm:scroll-mt-24 bg-[#241D17] text-[#FAF7F2] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#3A2F26]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top: Sourdough Care Guide Banner with Glassmorphism */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#2E251E] border border-white/10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#E8C5A0]">
                <Wheat className="w-4 h-4 text-[#E27D60]" />
                <span>The Master Baker's Sourdough Care Guide</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                How to Store & Revive Your Artisanal Loaf
              </h3>
            </div>
            <span className="text-xs text-[#D8C7B5] bg-white/10 px-3 py-1.5 rounded-full self-start md:self-auto font-medium">
              Zero Chemical Preservatives
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-3.5 rounded-2xl bg-black/20 border border-white/5 space-y-1">
              <p className="font-bold text-[#F4D19B]">1. First 3 Days: Bread Box / Paper</p>
              <p className="text-[#D8C7B5] leading-relaxed">
                Store cut-side down on a wooden cutting board or in breathable paper. Never store artisanal sourdough in plastic.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/20 border border-white/5 space-y-1">
              <p className="font-bold text-[#F4D19B]">2. Revive in Oven (5 Mins)</p>
              <p className="text-[#D8C7B5] leading-relaxed">
                Mist the crust lightly with spring water and bake at 180°C (350°F) for 5 minutes. The crust returns to glass-shattering crispness.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/20 border border-white/5 space-y-1">
              <p className="font-bold text-[#F4D19B]">3. Freezing Slices</p>
              <p className="text-[#D8C7B5] leading-relaxed">
                Slice the entire loaf upon arrival, freeze in an airtight container, and toast slices straight from the freezer for breakfast.
              </p>
            </div>
          </div>
        </div>

        {/* Middle: 4 Columns Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <BakeryLogo size="md" />
              <div>
                <span className="font-serif font-bold text-2xl tracking-wide text-white block">
                  Maison Levain
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8C5A0]">
                  Fournil Artisanal • Est. 1912
                </span>
              </div>
            </div>
            <p className="text-xs text-[#D8C7B5] leading-relaxed max-w-sm">
              Handcrafting traditional wild-fermented sourdough, French viennoiserie, and bespoke pastries with heritage flours and unhurried patience.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E8C5A0]">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Bio-Organic & Traditional French Guild</span>
            </div>
          </div>

          {/* Bakery Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <p className="font-serif font-bold text-base text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E27D60]" />
              <span>Opening Hours & Drops</span>
            </p>
            <ul className="space-y-1.5 text-[#D8C7B5]">
              <li className="flex justify-between">
                <span>Tuesday – Friday:</span>
                <span className="font-semibold text-white">7:00 AM – 3:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday – Sunday:</span>
                <span className="font-semibold text-white">7:30 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between text-[#E27D60]">
                <span>Monday:</span>
                <span>Fournil Closed (Fermentation Day)</span>
              </li>
            </ul>
            <p className="text-[11px] text-[#A89C8E] pt-1">
              *Fresh morning batches arrive at 8:00 AM & 10:15 AM daily.
            </p>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <p className="font-serif font-bold text-base text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E27D60]" />
              <span>The Fournil</span>
            </p>
            <p className="text-[#D8C7B5] leading-relaxed">
              42 Boulevard Saint-Honoré<br />
              Historic Quarter, Suite 104<br />
              Paris / San Francisco
            </p>
            <p className="text-[#D8C7B5]">
              Tel: +1 (555) 382-9104
            </p>
          </div>

          {/* Newsletter / Weekend Drops */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <p className="font-serif font-bold text-base text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E27D60]" />
              <span>Weekend Viennoiserie Drops</span>
            </p>
            <p className="text-[#D8C7B5] leading-relaxed">
              Get notified of seasonal specials (Pistachio Escargots, Panettone, Fig Tarts) before they sell out.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-white/10 text-xs text-[#A8D5BA] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Merci! You're on the weekend drop list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-[#9E9080] focus:outline-none focus:ring-1 focus:ring-[#E8C5A0]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#FAF7F2] text-[#341C02] rounded-xl font-semibold hover:bg-white transition-colors"
                >
                  Join the Secret Drop List
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9080]">
          <p>© {new Date().getFullYear()} Maison Levain Artisanal Bakery Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Naturally Leavened Since 1912</span>
            <span>•</span>
            <span>Organic Flours Only</span>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};
