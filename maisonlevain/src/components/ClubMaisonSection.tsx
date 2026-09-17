import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { Crown, Sparkles, Award, Check, ArrowRight, Gift, TrendingUp, ShieldCheck, Flame, LogIn } from 'lucide-react';

interface ClubMaisonSectionProps {
  currentUser: UserProfile | null;
  onOpenClubModal: () => void;
  onOpenAuth: () => void;
  onOpenAccount: () => void;
}

export const ClubMaisonSection: React.FC<ClubMaisonSectionProps> = ({
  currentUser,
  onOpenClubModal,
  onOpenAuth,
  onOpenAccount,
}) => {
  const userPoints = currentUser?.loyaltyPoints || 0;

  // Determine current tier
  let tierName = 'Patron';
  let nextTierName: string | null = 'Heritage Patron';
  let targetPoints = 200;
  let progressPercent = 0;
  let pointsNeeded = 200;

  if (userPoints >= 500) {
    tierName = 'Grand Cru Patron';
    nextTierName = null;
    progressPercent = 100;
  } else if (userPoints >= 200) {
    tierName = 'Heritage Patron';
    nextTierName = 'Grand Cru Patron';
    targetPoints = 500;
    progressPercent = Math.min(100, Math.round(((userPoints - 200) / 300) * 100));
    pointsNeeded = 500 - userPoints;
  } else {
    tierName = 'Patron';
    nextTierName = 'Heritage Patron';
    targetPoints = 200;
    progressPercent = Math.min(100, Math.round((userPoints / 200) * 100));
    pointsNeeded = 200 - userPoints;
  }

  const tiers = [
    {
      id: 'patron',
      name: 'Patron',
      french: 'Le Patron',
      badge: 'Tier I (0–199 pts)',
      points: '10 pts per $1',
      description: 'The entrance into Maison Levain. Enjoy early hearth pulls and birthday viennoiserie.',
      highlight: 'Priority Hearth Alerts',
      bgClass: 'bg-[#FAF6F0] border-[#EFE9DF]',
      perks: [
        'Priority batch notification (15m before oven pull)',
        'Complimentary gift box ribbon styling',
        '10 loyalty points per $1 spent',
        'Annual birthday pastry on us'
      ]
    },
    {
      id: 'heritage',
      name: 'Heritage Patron',
      french: 'Patron Héritage',
      badge: 'Tier II (200–499 pts)',
      points: '15 pts per $1 (1.5x)',
      description: 'For dedicated sourdough enthusiasts. Gain masterclass discounts and butter pairings.',
      highlight: '10% Off Atelier Masterclasses',
      bgClass: 'bg-[#FAF3EA] border-[#EAD8C7]',
      isPopular: true,
      perks: [
        'Everything in Patron tier',
        '10% discount on all Paris Atelier classes',
        'Secret weekend seasonal tasting pastry',
        'Complimentary churned Normandy butter with loaves'
      ]
    },
    {
      id: 'grand_cru',
      name: 'Grand Cru Patron',
      french: 'Grand Cru Élite',
      badge: 'Tier III (500+ pts)',
      points: '20 pts per $1 (2x)',
      description: 'Our premier culinary guild. Guaranteed batch slots, complimentary loaves, and private salon invites.',
      highlight: 'Guaranteed Oven Reserve & Free Delivery',
      bgClass: 'bg-[#F5ECE1] border-[#DFCBB8]',
      perks: [
        'Everything in Heritage tier',
        'Guaranteed oven batch slot during sell-out rush',
        'Free signature loaf on every 5th order',
        'Free courier delivery on orders over $35',
        'Invitation to annual miller harvest salon'
      ]
    }
  ];

  return (
    <section id="club-section" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-24 bg-[#FBF8F3] relative overflow-hidden border-t border-[#EAE0D3]">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8C5A0]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8D4B26]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DC] text-[#8D4B26] text-xs font-bold uppercase tracking-widest border border-[#E5DACD]">
            <Crown className="w-3.5 h-3.5" />
            <span>Club Maison Levain</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#341C02] tracking-tight">
            Artisan Patronage & Guild Tiers
          </h2>
          
          <p className="text-sm sm:text-base text-[#786C5E] leading-relaxed">
            We honor true devotion to natural fermentation. Earn loyalty points with every bake, unlock exclusive hearth reservations, and enjoy tasting privileges crafted by our master bakers.
          </p>
        </div>

        {/* Dynamic User Progress / Sign In Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DACD] shadow-sm relative overflow-hidden">
          {currentUser ? (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#341C02] text-[#E8C5A0] font-serif font-bold text-xl flex items-center justify-center shadow-md shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#341C02]">
                        {currentUser.name}
                      </h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#EFE8DC] text-[#8D4B26] font-bold border border-[#E0D3C3]">
                        {currentUser.tier}
                      </span>
                    </div>
                    <p className="text-xs text-[#786C5E]">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#FAF6F0] p-3 sm:px-5 rounded-2xl border border-[#EFE9DF]">
                  <Award className="w-6 h-6 text-[#8D4B26]" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C7A68] block">Your Balance</span>
                    <span className="font-serif font-bold text-xl text-[#341C02]">
                      {userPoints} <span className="text-xs font-normal text-[#8C7A68]">Points</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress towards next tier */}
              {nextTierName ? (
                <div className="space-y-2.5 pt-4 border-t border-[#F0E6D8]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#5E5244] flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#8D4B26]" />
                      Next Guild Milestone: <strong className="text-[#341C02]">{nextTierName}</strong>
                    </span>
                    <span className="font-bold text-[#8D4B26]">
                      {pointsNeeded} more points needed ({userPoints} / {targetPoints} pts)
                    </span>
                  </div>

                  <div className="w-full h-3.5 bg-[#EFE8DC] rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progressPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#8D4B26] to-[#E27D60]"
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-[#8C7A68]">
                    <span>{tierName}</span>
                    <span>{progressPercent}% towards next tier</span>
                    <span>{nextTierName}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#FAF3EA] border border-[#EAD8C7] flex items-center gap-3 text-xs text-[#55270D]">
                  <Crown className="w-5 h-5 text-[#E27D60] shrink-0" />
                  <span>
                    <strong>Supreme Grand Cru Patron:</strong> You have reached our pinnacle patronage status with full benefits, complimentary delivery, and double loyalty points active!
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={onOpenClubModal}
                  className="text-xs font-bold text-[#8D4B26] hover:text-[#55270D] flex items-center gap-1.5 underline-offset-4 hover:underline"
                >
                  <span>View Full Tier Privileges & Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onOpenAccount}
                  className="px-4 py-2 rounded-xl bg-[#341C02] hover:bg-[#4A3C2F] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Manage Patron Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8D4B26] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#C17D44]" />
                  <span>Complimentary Membership</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#341C02]">
                  Track your tier status & earn on every order
                </h3>
                <p className="text-xs sm:text-sm text-[#786C5E] max-w-xl">
                  Sign up in seconds to start earning 10 points per dollar, receive batch notifications, and unlock masterclass savings.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  id="club-section-join-btn"
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#341C02] hover:bg-[#4A3C2F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <LogIn className="w-4 h-4 text-[#E8C5A0]" />
                  <span>Join Club Maison Free</span>
                </button>
                <button
                  onClick={onOpenClubModal}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border border-[#D9CEBF] hover:bg-[#FAF6F0] text-[#341C02] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Explore Tier Perks
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-3xl p-6 sm:p-7 border ${tier.bgClass} flex flex-col justify-between relative shadow-sm hover:shadow-md transition-all`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#8D4B26] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Most Preferred
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7A68]">
                    {tier.badge}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif font-bold text-2xl text-[#341C02]">
                      {tier.name}
                    </h3>
                  </div>
                  <p className="text-[11px] font-serif italic text-[#8C7A68]">{tier.french}</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 border border-[#E5DACD] text-xs space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-[#8D4B26] block">Multiplier</span>
                  <span className="font-bold text-[#341C02]">{tier.points}</span>
                </div>

                <p className="text-xs text-[#6B5E4F] leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-[#EAE0D3]">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#5E5244] block">
                    Guild Privileges:
                  </span>
                  <ul className="space-y-2">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#5E5244]">
                        <Check className="w-3.5 h-3.5 text-[#8D4B26] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE0D3]">
                <button
                  onClick={onOpenClubModal}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F2ECE1] border border-[#D9CEBF] text-[#341C02] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Details & Perks</span>
                  <ArrowRight className="w-3 h-3 text-[#8D4B26]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
