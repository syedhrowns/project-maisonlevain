import React, { useState, useEffect } from 'react';
import { Flame, MapPin, Clock, Wheat, Award, AlertCircle, Star, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BakeryLogo } from './BakeryLogo';

interface HeroProps {
  onOrderNow: () => void;
  onOpenBoxBuilder: () => void;
  onOpenSchedule: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOrderNow, 
  onOpenBoxBuilder, 
  onOpenSchedule 
}) => {
  const [timeText, setTimeText] = useState('Checking hearth ovens...');
  const [liveStatusMobile, setLiveStatusMobile] = useState('Live — Checking hearth ovens');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      
      let status = '';
      let short = 'Kitchen is resting';
      if (hours < 8) {
        status = "Preheating stone deck ovens for morning batch...";
        short = "Ovens preheating";
      } else if (hours === 8 && mins < 30) {
        status = "Morning Viennoiserie fresh out of the oven!";
        short = "Morning viennoiserie";
      } else if (hours < 10) {
        status = "Proofing Country Batards in the retarder...";
        short = "Proofing batards";
      } else if (hours === 10 && mins < 30) {
        status = "Country Batards baking on the stone hearth...";
        short = "Baking country batards";
      } else if (hours < 11 || (hours === 11 && mins < 30)) {
        status = "Country Batards cooling on oak racks.";
        short = "Batards cooling on racks";
      } else if (hours === 11 && mins >= 30) {
        status = "Cannelés & Kouign-Amann baking in copper molds!";
        short = "Cannelés & Kouign-Amann";
      } else if (hours === 12 && mins < 15) {
        status = "Prepping savory galettes for lunch hearth...";
        short = "Prepping lunch hearth";
      } else if (hours === 12 && mins >= 15) {
        status = "Lunch hearth: Savory focaccia fresh from the oven!";
        short = "Fresh savory focaccia";
      } else if (hours < 16) {
        status = "Afternoon bakes: Pastries and brioche available.";
        short = "Afternoon bakes available";
      } else {
        status = "Kitchen is resting. Wild yeast levain fermenting for tomorrow.";
        short = "Kitchen is resting";
      }
      
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimeText(`Live (${timeStr}) — ${status}`);
      setLiveStatusMobile(`Live — ${short}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero-section" 
      className="shrink-0 relative w-full bg-transparent flex flex-col items-center justify-center min-h-[calc(100vh-64px)] min-h-[calc(100svh-64px)] min-h-[calc(100dvh-64px)] pt-3 sm:pt-6 md:pt-8 pb-6 sm:pb-10 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-full overflow-x-clip"
    >
      {/* Central Content Stack */}
      <div className="flex flex-col items-center w-full max-w-[920px] mx-auto text-center">
        
        {/* Hearth Live Status Pill */}
        <div className="flex items-center justify-center w-full mb-3 sm:mb-[clamp(0.5rem,1.2vh,1rem)]">
          <motion.div 
            role="button"
            tabIndex={0}
            onClick={onOpenSchedule}
            title="View Live Oven Baking Schedule"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 px-2.5 sm:px-4 md:px-5 h-[21px] sm:h-auto py-0 sm:py-1.5 md:py-2 rounded-full bg-white/95 hover:bg-white border border-[#E8DFD5] hover:border-[#D5C7B8] shadow-xs hover:shadow-sm max-w-[calc(100vw-2rem)] cursor-pointer active:scale-95 transition-all select-none"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#C25835] shadow-[0_0_8px_rgba(194,88,53,0.5)] animate-pulse shrink-0" />
            <Flame className="hidden sm:inline-block w-4 h-4 md:w-[18px] md:h-[18px] text-[#C25835] shrink-0" />
            {/* Mobile text: shortened information, clean fit */}
            <span className="sm:hidden text-[10px] leading-none font-semibold text-[#8D4B26] truncate">
              {liveStatusMobile}
            </span>
            {/* Desktop text: full time and status preserved */}
            <span className="hidden sm:inline text-xs md:text-[13px] font-semibold text-[#8D4B26] truncate">
              {timeText}
            </span>
          </motion.div>
        </div>

        {/* Center Bakery Monogram & Brand */}
        <div style={{ marginTop: '16px' }} className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative group cursor-pointer py-1"
            onClick={onOrderNow}
            title="Maison Levain — Order Daily Bakes"
          >
            <BakeryLogo size="hero" className="relative z-10" />
          </motion.div>

          <motion.div 
            className="flex flex-col items-center max-w-2xl mx-auto px-4 w-full mt-0 sm:mt-[-4px]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <h1 
              className="mt-[9px] sm:mt-0 text-[45px] leading-[54px] sm:text-[65px] sm:leading-tight font-serif font-bold text-[#341C02] tracking-tight text-center"
            >
              Maison Levain
            </h1>
            
            {/* Subheader lines */}
            <div 
              style={{ 
                fontSize: '10px',
                marginBottom: '10px',
                paddingBottom: '0px',
                paddingTop: '0px',
                marginTop: '-8px'
              }}
              className="flex items-center justify-center w-full max-w-xl mx-auto gap-2 sm:gap-3.5 px-1"
            >
              <svg 
                className="h-[2px] w-6 sm:w-12 md:w-16 flex-1 max-w-[140px] min-w-[16px] shrink" 
                viewBox="0 0 100 2" 
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-line-left" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BAA288" stopOpacity="0" />
                    <stop offset="25%" stopColor="#BAA288" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#BAA288" stopOpacity="1" />
                    <stop offset="100%" stopColor="#BAA288" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="1" x2="100" y2="1" stroke="url(#hero-line-left)" strokeWidth="1.5" />
              </svg>

              <span className="text-[9px] mt-0 sm:text-[10px] text-center uppercase tracking-[0.12em] sm:tracking-[0.2em] font-semibold text-[#8C7A68] whitespace-nowrap shrink-0">
                Paris &bull; Fournil Artisanal &bull; Depuis 1912
              </span>

              <svg 
                className="h-[2px] w-6 sm:w-12 md:w-16 flex-1 max-w-[140px] min-w-[16px] shrink" 
                viewBox="0 0 100 2" 
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-line-right" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BAA288" stopOpacity="1" />
                    <stop offset="40%" stopColor="#BAA288" stopOpacity="1" />
                    <stop offset="75%" stopColor="#BAA288" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#BAA288" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="1" x2="100" y2="1" stroke="url(#hero-line-right)" strokeWidth="1.5" />
              </svg>
            </div>

            <p 
              style={{ 
                marginBottom: '21.1463px'
              }}
              className="hidden sm:block text-[14px] leading-[20px] font-sans text-[#6B5E51] max-w-lg mx-auto"
            >
              Pure stone-ground heirloom flours, natural wild yeasts, and slow 36-hour hearth fermentation crafted in Saint-Honoré.
            </p>

            {/* Mobile Three Minimal Features replacing paragraph */}
            <motion.div 
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="flex sm:hidden flex-row items-center justify-center gap-2 xs:gap-3 mt-[10px] mb-3 px-1"
            >
              <div id="hero-mobile-feature-fournil" className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#5E5244]">
                <MapPin className="w-3.5 h-3.5 text-[#8D4B26] shrink-0" />
                <span>The Fournil</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#BAA288]/60 shrink-0" aria-hidden="true" />
              <div id="hero-mobile-feature-levain" className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#5E5244]">
                <Wheat className="w-3.5 h-3.5 text-[#8D4B26] shrink-0" />
                <span>Living Levain</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#BAA288]/60 shrink-0" aria-hidden="true" />
              <div id="hero-mobile-feature-guild" className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#5E5244]">
                <Award className="w-3.5 h-3.5 text-[#8D4B26] shrink-0" />
                <span>Heritage Guild</span>
              </div>
            </motion.div>

            {/* Quick Action CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 mt-[10px] sm:mt-0 mb-[9.6px] sm:mb-[clamp(0.6rem,1.4vh,1.1rem)]">
              {/* 1. Order Today's Bakes */}
              <button
                id="hero-order-cta-btn"
                onClick={onOrderNow}
                className="h-[35px] sm:h-[41.5079px] w-[157px] sm:w-[186.611px] text-[11.5px] sm:text-[12px] inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#341C02] hover:bg-[#482806] text-[#FAF7F2] font-bold rounded-lg sm:rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer border border-[#341C02]"
              >
                <span className="ml-[5px] sm:ml-0">Order Today's Bakes</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8C5A0]" />
              </button>

              {/* 2. Oven Schedule (Desktop only here, moved below cards on mobile) */}
              <button
                id="hero-schedule-btn"
                onClick={onOpenSchedule}
                className="hidden sm:inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-2 text-[#5E5244] hover:text-[#341C02] hover:bg-[#EFE8DC]/60 text-[10px] sm:text-[12.5px] font-semibold rounded-lg sm:rounded-xl transition-all cursor-pointer"
              >
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A87B4C]" />
                <span>Oven Schedule</span>
              </button>
              
              {/* 3. Curate Custom Box */}
              <button
                id="hero-curate-box-btn"
                onClick={onOpenBoxBuilder}
                className="w-auto sm:w-[186.611px] h-auto sm:h-[41.5079px] py-1 sm:py-0 px-2 sm:px-0 bg-transparent sm:bg-white hover:bg-transparent sm:hover:bg-[#FAF7F2] text-[#8D4B26] hover:text-[#5A2D14] sm:hover:text-[#8D4B26] border-0 sm:border sm:border-[#E5DACD] font-medium sm:font-bold text-[11.5px] sm:text-[12px] rounded-lg sm:rounded-xl shadow-none sm:shadow-xs inline-flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 cursor-pointer no-underline hover:no-underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C17D44]" />
                <span>Curate Custom Box</span>
              </button>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Top Important Notice & Daily Special Row - Hidden on Mobile */}
      <div className="hidden sm:block w-full z-20 relative mt-1 sm:mt-[clamp(0.2rem,0.8vh,0.6rem)] mb-1 sm:mb-[clamp(0.2rem,0.8vh,0.4rem)] px-3 sm:px-4">
        <div 
          style={{ marginTop: '10px', paddingTop: '2px', paddingBottom: '9px' }}
          className="grid grid-cols-2 gap-2 md:gap-2.5 sm:flex sm:flex-row sm:flex-wrap justify-center items-center w-full pb-0.5 mx-auto max-w-5xl"
        >
          {/* Pre-order Notice */}
          <motion.div 
            id="hero-card-notice"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            style={{ borderRadius: 16 }}
            className="min-h-[44px] sm:min-h-[48px] md:min-h-[52px] py-1 sm:py-1.5 bg-[#341C02] backdrop-blur-md px-2.5 sm:px-3 md:px-3.5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex flex-row items-center cursor-default select-none pointer-events-none overflow-hidden relative"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-1 min-w-0 relative z-20">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 rounded-[9px] sm:rounded-[10px] bg-[#4a2e0a] flex items-center justify-center text-[#F4EBE1] shrink-0">
                <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[7.5px] sm:text-[8px] md:text-[8.5px] uppercase font-bold text-[#D0C5B8] tracking-wider">Important Notice</p>
                <p className="text-[10px] sm:text-[10.5px] md:text-[11.5px] font-bold text-[#F4EBE1]">Pre-orders close 3PM</p>
              </div>
            </div>
          </motion.div>

          {/* Today's Special */}
          <motion.div 
            id="hero-card-special"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
            style={{ borderRadius: 16 }}
            className="min-h-[44px] sm:min-h-[48px] md:min-h-[52px] py-1 sm:py-1.5 bg-[#341C02] backdrop-blur-md px-2.5 sm:px-3 md:px-3.5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex flex-row items-center cursor-default select-none pointer-events-none overflow-hidden relative"
          >
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-1 min-w-0 relative z-20">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 rounded-[9px] sm:rounded-[10px] bg-[#4a2e0a] flex items-center justify-center text-[#F4EBE1] shrink-0">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-current text-[#E8C5A0]" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[7.5px] sm:text-[8px] md:text-[8.5px] uppercase font-bold text-[#D0C5B8] tracking-wider">Today's Hearth Special</p>
                <p className="text-[10px] sm:text-[10.5px] md:text-[11.5px] font-bold text-[#F4EBE1]">Roasted Garlic & Comté</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bakery Features Highlights Row */}
      <div className="w-full z-10 relative px-3 sm:px-4">
        <div style={{ marginTop: '1px' }} className="hidden sm:flex sm:flex-row sm:flex-wrap justify-center items-center w-full pt-0.5 pb-1.5 mx-auto max-w-5xl gap-2 md:gap-2.5">
          {/* The Fournil */}
          <motion.div 
            id="hero-card-fournil"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
            className="min-h-[45px] md:min-h-[49px] py-1.5 bg-white/95 rounded-[16px] px-3 md:px-3.5 border border-[#E8DFD5] shadow-[0_4px_20px_rgba(141,75,38,0.04)] flex flex-row items-center cursor-default select-none pointer-events-none overflow-hidden relative"
          >
            <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
              <div className="w-7 h-7 md:w-7.5 md:h-7.5 rounded-[10px] bg-[#F4EBE1] flex items-center justify-center text-[#8D4B26] shrink-0">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[8px] md:text-[8.5px] uppercase font-bold text-[#8C7A68] tracking-wider">The Fournil</p>
                <p className="text-[10.5px] md:text-[11.5px] font-bold text-[#341C02] truncate">42 Bd Saint-Honoré</p>
              </div>
            </div>
          </motion.div>

          {/* Daily Drops */}
          <motion.div 
            id="hero-card-drops"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
            className="min-h-[45px] md:min-h-[49px] py-1.5 bg-white/95 rounded-[16px] px-3 md:px-3.5 border border-[#E8DFD5] shadow-[0_4px_20px_rgba(141,75,38,0.04)] flex flex-row items-center cursor-default select-none pointer-events-none overflow-hidden relative"
          >
            <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
              <div className="w-7 h-7 md:w-7.5 md:h-7.5 rounded-[10px] bg-[#F4EBE1] flex items-center justify-center text-[#8D4B26] shrink-0">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[8px] md:text-[8.5px] uppercase font-bold text-[#8C7A68] tracking-wider">Hearth Drops</p>
                <p className="text-[10.5px] md:text-[11.5px] font-bold text-[#341C02] truncate">8:00 & 10:15 AM</p>
              </div>
            </div>
          </motion.div>

          {/* Living Levain */}
          <motion.div 
            id="hero-card-levain"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
            className="min-h-[45px] md:min-h-[49px] py-1.5 bg-white/95 rounded-[16px] px-3 md:px-3.5 border border-[#E8DFD5] shadow-[0_4px_20px_rgba(141,75,38,0.04)] flex flex-row items-center cursor-default select-none pointer-events-none overflow-hidden relative"
          >
            <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
              <div className="w-7 h-7 md:w-7.5 md:h-7.5 rounded-[10px] bg-[#F4EBE1] flex items-center justify-center text-[#8D4B26] shrink-0">
                <Wheat className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[8px] md:text-[8.5px] uppercase font-bold text-[#8C7A68] tracking-wider">Living Levain</p>
                <p className="text-[10.5px] md:text-[11.5px] font-bold text-[#341C02] truncate">36h Cold Ferment</p>
              </div>
            </div>
          </motion.div>

          {/* Heritage Guild */}
          <motion.div 
            id="hero-card-guild"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.50 }}
            className="min-h-[45px] md:min-h-[49px] py-1.5 bg-white/95 rounded-[16px] px-3 md:px-3.5 border border-[#E8DFD5] shadow-[0_4px_20px_rgba(141,75,38,0.04)] flex flex-row items-center cursor-default select-none pointer-events-none overflow-hidden relative"
          >
            <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
              <div className="w-7 h-7 md:w-7.5 md:h-7.5 rounded-[10px] bg-[#F4EBE1] flex items-center justify-center text-[#8D4B26] shrink-0">
                <Award className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[8px] md:text-[8.5px] uppercase font-bold text-[#8C7A68] tracking-wider">Heritage Guild</p>
                <p className="text-[10.5px] md:text-[11.5px] font-bold text-[#341C02] truncate">100% Bio Organic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
