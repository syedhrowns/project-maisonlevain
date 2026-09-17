import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { 
  X, 
  Crown, 
  Sparkles, 
  Award, 
  Check, 
  ArrowRight, 
  Flame, 
  Gift, 
  Heart, 
  Clock, 
  Compass, 
  ShieldCheck, 
  TrendingUp, 
  User, 
  LogIn,
  ChevronRight,
  Coffee,
  Percent
} from 'lucide-react';

interface ClubMaisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenAccount: () => void;
}

export const ClubMaisonModal: React.FC<ClubMaisonModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onOpenAccount,
}) => {
  const [activeTab, setActiveTab] = useState<'tiers' | 'calculator' | 'perks'>('tiers');
  const [estimatedMonthlySpend, setEstimatedMonthlySpend] = useState<number>(45);

  const tiers = [
    {
      id: 'member',
      name: 'Patron',
      frenchName: 'Le Patron',
      badge: 'Entry Guild',
      threshold: 0,
      nextThreshold: 200,
      pointsMultiplier: '10 pts / $1',
      color: 'from-[#5E5244] to-[#341C02]',
      accentColor: '#C17D44',
      bgLight: 'bg-[#F9F6F0]',
      borderLight: 'border-[#EFE9DF]',
      description: 'The foundational circle for every lover of naturally leavened bread and artisan viennoiserie.',
      perks: [
        'Priority batch notification (15 mins before oven exit)',
        'Complimentary gift-ribbon packaging on curated boxes',
        'Earn 10 loyalty points per $1 spent',
        'Annual Birthday complimentary morning viennoiserie',
        'Digital receipt archive and order history'
      ],
      exclusiveGift: 'Complimentary Viennoiserie on Birthday'
    },
    {
      id: 'heritage',
      name: 'Heritage Patron',
      frenchName: 'Patron Héritage',
      badge: 'Most Popular',
      threshold: 200,
      nextThreshold: 500,
      pointsMultiplier: '15 pts / $1',
      color: 'from-[#8D4B26] to-[#55270D]',
      accentColor: '#E27D60',
      bgLight: 'bg-[#FAF3EA]',
      borderLight: 'border-[#EAD8C7]',
      description: 'For dedicated bread devotees who appreciate heritage grain terroir and traditional hydration craft.',
      perks: [
        'All Patron benefits included',
        '10% off all Paris Atelier baking masterclasses',
        'Secret weekend seasonal tasting pastry preview',
        'Complimentary house-churned Normandy butter with whole loaves',
        'Earn 15 loyalty points per $1 spent (1.5x Boost)',
        'Quarterly seasonal recipe & flour curation dispatch'
      ],
      exclusiveGift: 'Quarterly Seasonal Tasting Box'
    },
    {
      id: 'grand_cru',
      name: 'Grand Cru Patron',
      frenchName: 'Grand Cru Élite',
      badge: 'Premier Guild',
      threshold: 500,
      nextThreshold: null,
      pointsMultiplier: '20 pts / $1',
      color: 'from-[#2A1705] via-[#4A2609] to-[#1F0F03]',
      accentColor: '#E8C5A0',
      bgLight: 'bg-[#F5ECE1]',
      borderLight: 'border-[#DFCBB8]',
      description: 'The pinnacle of Parisian gastronomic patronage with VIP oven reserves and private harvest events.',
      perks: [
        'All Heritage Patron benefits included',
        'Guaranteed oven batch reservation even during sell-out rush',
        'Complimentary signature loaf on every 5th order',
        'Complimentary courier delivery on orders over $35',
        'Earn 20 loyalty points per $1 spent (2x Boost)',
        'Exclusive VIP invitations to annual miller harvest & yeast salon'
      ],
      exclusiveGift: 'Free Signature Loaf every 5th Order'
    }
  ];

  // Calculate user progress
  const userPoints = currentUser?.loyaltyPoints || 0;
  
  let currentTierIndex = 0;
  if (userPoints >= 500) {
    currentTierIndex = 2; // Grand Cru
  } else if (userPoints >= 200) {
    currentTierIndex = 1; // Heritage
  } else {
    currentTierIndex = 0; // Patron
  }

  const currentTier = tiers[currentTierIndex];
  const nextTier = currentTierIndex < 2 ? tiers[currentTierIndex + 1] : null;

  let progressPercent = 100;
  let pointsNeeded = 0;

  if (nextTier) {
    const tierMin = currentTier.threshold;
    const tierMax = nextTier.threshold;
    const range = tierMax - tierMin;
    const currentProgress = userPoints - tierMin;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
    pointsNeeded = tierMax - userPoints;
  }

  // Estimated calculations
  const estimatedPointsPerMonth = estimatedMonthlySpend * 12;
  const estimatedAnnualPoints = estimatedPointsPerMonth * 12;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen, activeTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            id="club-maison-modal"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-[#E8DCCF]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-[#341C02] text-[#FAF7F2] relative overflow-hidden shrink-0">
              {/* Background watermark */}
              <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
                <Crown className="w-64 h-64 text-[#E8C5A0]" />
              </div>

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#E8C5A0]">
                    <Crown className="w-4 h-4 text-[#E27D60]" />
                    <span>Club Maison Levain Loyalty</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Artisan Patronage & Guild Tiers
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-xl">
                    Every loaf and pastry savored brings you closer to exclusive hearthside tastings, workshop discounts, and guaranteed batch reserves.
                  </p>
                </div>

                <button
                  id="close-club-modal-btn"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors shrink-0"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs within Modal */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15">
                {[
                  { id: 'tiers', label: 'Tier Guilds' },
                  { id: 'perks', label: 'Full Comparison Matrix' },
                  { id: 'calculator', label: 'Points Simulator' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#E8C5A0] text-[#341C02] font-bold shadow-sm'
                        : 'text-[#D8C7B5] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body with smooth scrolling */}
            <div ref={scrollRef} className="p-6 sm:p-8 overflow-y-auto space-y-8">

              {/* Patron Status & Progress Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DACD] shadow-sm relative overflow-hidden">
                {currentUser ? (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#341C02] text-[#E8C5A0] flex items-center justify-center font-serif font-bold text-lg shadow-sm">
                          {currentUser.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif font-bold text-base sm:text-lg text-[#341C02]">
                              {currentUser.name}
                            </h3>
                            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EFE8DC] text-[#8D4B26] font-bold">
                              {currentUser.tier}
                            </span>
                          </div>
                          <p className="text-xs text-[#786C5E]">{currentUser.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-[#FAF6F0] px-4 py-2 rounded-xl border border-[#EFE9DF]">
                        <Award className="w-5 h-5 text-[#8D4B26]" />
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-[#8C7A68] font-bold">
                            Current Loyalty Balance
                          </div>
                          <div className="text-base font-serif font-bold text-[#341C02]">
                            {userPoints} <span className="text-xs font-normal text-[#8C7A68]">Points</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar towards next tier */}
                    {nextTier ? (
                      <div className="space-y-2 pt-2 border-t border-[#F0E6D8]">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-[#5E5244] flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-[#8D4B26]" />
                            Progress to <strong className="text-[#341C02]">{nextTier.name}</strong> ({nextTier.threshold} pts)
                          </span>
                          <span className="font-bold text-[#8D4B26]">
                            {pointsNeeded} points to unlock
                          </span>
                        </div>
                        
                        <div className="w-full h-3 bg-[#EFE8DC] rounded-full overflow-hidden p-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-[#8D4B26] to-[#E27D60]"
                          />
                        </div>

                        <div className="flex justify-between text-[11px] text-[#8C7A68]">
                          <span>{currentTier.name} ({currentTier.threshold} pts)</span>
                          <span>{progressPercent}% completed</span>
                          <span>{nextTier.name} ({nextTier.threshold} pts)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-[#FAF3EA] border border-[#EAD8C7] flex items-center gap-3 text-xs text-[#55270D]">
                        <Crown className="w-5 h-5 text-[#E27D60] shrink-0" />
                        <span>
                          <strong>Grand Cru Status Achieved:</strong> You have attained our highest guild tier! Enjoy all VIP oven reservations, complimentary delivery, and double loyalty multipliers on all orders.
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#8D4B26] uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Join Club Maison Levain</span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#341C02]">
                        Sign in to track your patron tier and unlock rewards
                      </h3>
                      <p className="text-xs text-[#786C5E]">
                        Members earn points automatically with every pickup and delivery order.
                      </p>
                    </div>

                    <button
                      id="club-modal-signin-btn"
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      className="px-6 py-3 rounded-xl bg-[#341C02] hover:bg-[#4A3C2F] text-white text-xs uppercase font-bold tracking-wider transition-all shadow-md flex items-center gap-2 active:scale-95 shrink-0"
                    >
                      <LogIn className="w-4 h-4 text-[#E8C5A0]" />
                      <span>Sign In / Join Free</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Tab 1: 3-Tier Grid */}
              {activeTab === 'tiers' && (
                <div className="space-y-6">
                  <div className="text-center max-w-xl mx-auto space-y-1">
                    <h3 className="font-serif font-bold text-2xl text-[#341C02]">
                      Three Levels of Gastronomic Devotion
                    </h3>
                    <p className="text-xs text-[#786C5E]">
                      Points accumulate with every loaf, viennoiserie, and pantry provision.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {tiers.map((tier, idx) => {
                      const isUserCurrentTier = currentUser && currentTierIndex === idx;
                      const isUnlocked = currentUser && userPoints >= tier.threshold;

                      return (
                        <div
                          key={tier.id}
                          className={`rounded-3xl p-6 transition-all relative flex flex-col justify-between border ${
                            isUserCurrentTier 
                              ? 'bg-white border-[#8D4B26] shadow-lg ring-2 ring-[#8D4B26]/20' 
                              : `${tier.bgLight} ${tier.borderLight} shadow-sm hover:shadow-md`
                          }`}
                        >
                          {/* Badge */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#341C02] text-[#FAF7F2]">
                              {tier.badge}
                            </span>
                            {isUserCurrentTier && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#8D4B26] text-white flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Your Tier
                              </span>
                            )}
                          </div>

                          {/* Tier Info */}
                          <div className="space-y-2 mb-5">
                            <div>
                              <p className="text-[11px] font-serif italic text-[#8C7A68]">{tier.frenchName}</p>
                              <h4 className="font-serif font-bold text-xl text-[#341C02]">{tier.name}</h4>
                            </div>
                            <p className="text-xs text-[#786C5E] leading-relaxed min-h-[48px]">
                              {tier.description}
                            </p>
                            
                            <div className="pt-2 border-t border-[#EAE0D3] flex items-center justify-between text-xs">
                              <span className="text-[#8C7A68]">Unlock threshold:</span>
                              <strong className="text-[#341C02]">
                                {tier.threshold === 0 ? 'Free on registration' : `${tier.threshold} pts`}
                              </strong>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#8C7A68]">Multiplier:</span>
                              <span className="font-bold text-[#8D4B26]">{tier.pointsMultiplier}</span>
                            </div>
                          </div>

                          {/* Perks List */}
                          <div className="space-y-2.5 pt-3 border-t border-[#EAE0D3] flex-1">
                            <p className="text-[11px] uppercase font-bold tracking-wider text-[#5E5244]">
                              Key Tier Privileges:
                            </p>
                            <ul className="space-y-2">
                              {tier.perks.map((perk, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2 text-xs text-[#5E5244]">
                                  <Check className="w-3.5 h-3.5 text-[#8D4B26] shrink-0 mt-0.5" />
                                  <span>{perk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bottom Gift Highlight */}
                          <div className="mt-5 pt-3 border-t border-[#EAE0D3]">
                            <div className="p-2.5 rounded-xl bg-white/80 border border-[#E5DACD] flex items-center gap-2 text-[11px] text-[#341C02]">
                              <Gift className="w-3.5 h-3.5 text-[#C17D44] shrink-0" />
                              <span className="truncate"><strong>Reward:</strong> {tier.exclusiveGift}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Full Comparison Matrix */}
              {activeTab === 'perks' && (
                <div className="space-y-4">
                  <div className="text-center max-w-xl mx-auto space-y-1">
                    <h3 className="font-serif font-bold text-2xl text-[#341C02]">
                      Privilege Matrix by Guild Level
                    </h3>
                    <p className="text-xs text-[#786C5E]">
                      Compare the artisanal advantages unlocked across each tier.
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#E5DACD] bg-white">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#341C02] text-white">
                          <th className="p-3.5 font-serif font-bold">Privilege / Feature</th>
                          <th className="p-3.5 text-center font-serif font-bold">Patron (0+ pts)</th>
                          <th className="p-3.5 text-center font-serif font-bold bg-[#432403]">Heritage (200+ pts)</th>
                          <th className="p-3.5 text-center font-serif font-bold bg-[#55270D]">Grand Cru (500+ pts)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EFE7DC] text-[#5E5244]">
                        <tr>
                          <td className="p-3.5 font-medium text-[#341C02]">Earning Rate on Orders</td>
                          <td className="p-3.5 text-center font-bold text-[#8D4B26]">10 pts / $1</td>
                          <td className="p-3.5 text-center font-bold text-[#8D4B26] bg-[#FAF3EA]/40">15 pts / $1 (1.5x)</td>
                          <td className="p-3.5 text-center font-bold text-[#8D4B26] bg-[#F5ECE1]/40">20 pts / $1 (2x)</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#341C02]">Oven Batch Alerts</td>
                          <td className="p-3.5 text-center">15 min warning</td>
                          <td className="p-3.5 text-center bg-[#FAF3EA]/40">15 min warning</td>
                          <td className="p-3.5 text-center bg-[#F5ECE1]/40 font-bold text-[#341C02]">Guaranteed Rush Reserve</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#341C02]">Atelier Workshop Discount</td>
                          <td className="p-3.5 text-center text-[#B5A593]">—</td>
                          <td className="p-3.5 text-center font-bold text-[#341C02] bg-[#FAF3EA]/40">10% Off All Classes</td>
                          <td className="p-3.5 text-center font-bold text-[#341C02] bg-[#F5ECE1]/40">20% Off + VIP Seating</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#341C02]">Secret Seasonal Tasting Item</td>
                          <td className="p-3.5 text-center text-[#B5A593]">—</td>
                          <td className="p-3.5 text-center text-[#8D4B26] bg-[#FAF3EA]/40"><Check className="w-4 h-4 mx-auto" /></td>
                          <td className="p-3.5 text-center text-[#8D4B26] bg-[#F5ECE1]/40"><Check className="w-4 h-4 mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#341C02]">Complimentary Churned Butter</td>
                          <td className="p-3.5 text-center text-[#B5A593]">—</td>
                          <td className="p-3.5 text-center text-[#8D4B26] bg-[#FAF3EA]/40"><Check className="w-4 h-4 mx-auto" /></td>
                          <td className="p-3.5 text-center text-[#8D4B26] bg-[#F5ECE1]/40"><Check className="w-4 h-4 mx-auto" /></td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#341C02]">Complimentary Courier Delivery</td>
                          <td className="p-3.5 text-center text-[#B5A593]">—</td>
                          <td className="p-3.5 text-center text-[#B5A593] bg-[#FAF3EA]/40">—</td>
                          <td className="p-3.5 text-center font-bold text-[#341C02] bg-[#F5ECE1]/40">Free on orders $35+</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-medium text-[#341C02]">Annual Miller & Yeast Harvest Salon</td>
                          <td className="p-3.5 text-center text-[#B5A593]">—</td>
                          <td className="p-3.5 text-center text-[#B5A593] bg-[#FAF3EA]/40">—</td>
                          <td className="p-3.5 text-center font-bold text-[#8D4B26] bg-[#F5ECE1]/40">Exclusive Invitation</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Points Simulator & Calculator */}
              {activeTab === 'calculator' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DACD] space-y-6">
                  <div className="text-center max-w-xl mx-auto space-y-1">
                    <h3 className="font-serif font-bold text-2xl text-[#341C02]">
                      Patron Points Simulator
                    </h3>
                    <p className="text-xs text-[#786C5E]">
                      Estimate your monthly points accumulation based on your artisanal habits.
                    </p>
                  </div>

                  <div className="space-y-4 max-w-lg mx-auto">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#341C02] mb-1.5">
                        <span>Your Estimated Monthly Bakery Order:</span>
                        <span className="font-serif text-base text-[#8D4B26]">${estimatedMonthlySpend} / mo</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="200"
                        step="5"
                        value={estimatedMonthlySpend}
                        onChange={(e) => setEstimatedMonthlySpend(Number(e.target.value))}
                        className="w-full accent-[#8D4B26] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[#8C7A68]">
                        <span>$15 (Weekend Batard)</span>
                        <span>$100 (Weekly Box + Pastries)</span>
                        <span>$200 (Family & Events)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#EAE0D3]">
                      <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-[#EFE9DF] text-center space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#8C7A68] block">Patron Tier</span>
                        <div className="text-lg font-serif font-bold text-[#341C02]">
                          +{estimatedMonthlySpend * 10} <span className="text-xs font-normal">pts/mo</span>
                        </div>
                        <p className="text-[10px] text-[#786C5E]">Heritage unlocked in ~{Math.ceil(200 / (estimatedMonthlySpend * 10))} mo</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FAF3EA] border border-[#EAD8C7] text-center space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#8D4B26] block">Heritage Tier (1.5x)</span>
                        <div className="text-lg font-serif font-bold text-[#341C02]">
                          +{Math.round(estimatedMonthlySpend * 15)} <span className="text-xs font-normal">pts/mo</span>
                        </div>
                        <p className="text-[10px] text-[#786C5E]">Grand Cru unlocked in ~{Math.ceil(300 / (estimatedMonthlySpend * 15))} mo</p>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#F5ECE1] border border-[#DFCBB8] text-center space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#341C02] block">Grand Cru (2x)</span>
                        <div className="text-lg font-serif font-bold text-[#341C02]">
                          +{estimatedMonthlySpend * 20} <span className="text-xs font-normal">pts/mo</span>
                        </div>
                        <p className="text-[10px] text-[#786C5E]">Earns ~1 free loaf every 3 weeks</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Quick Call to Action */}
              <div className="p-5 rounded-2xl bg-[#F7F2EA] border border-[#E8DCCF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#341C02] text-[#E8C5A0] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-serif font-bold text-sm text-[#341C02]">
                      Ready to reserve your oven batch?
                    </h5>
                    <p className="text-xs text-[#786C5E]">
                      All orders automatically accrue points under your patron email.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {currentUser ? (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAccount();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#341C02] hover:bg-[#4A3C2F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>View My Account</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAuth();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#341C02] hover:bg-[#4A3C2F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Join Club Maison</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
