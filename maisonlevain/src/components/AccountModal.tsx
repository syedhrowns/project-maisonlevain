import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Crown, 
  Sparkles, 
  Gift, 
  ReceiptText, 
  LogOut, 
  Copy, 
  Check, 
  Edit3, 
  Save, 
  Heart,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onSignOut: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onOpenOrderLookup: () => void;
  onOpenSchedule: () => void;
  onOpenBoxBuilder: () => void;
  onOpenClubModal?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  onSignOut,
  onUpdateUser,
  onOpenOrderLookup,
  onOpenSchedule,
  onOpenBoxBuilder,
  onOpenClubModal,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Edit fields state
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAddress, setEditAddress] = useState(user?.deliveryAddress || '');
  const [editCraft, setEditCraft] = useState(user?.favoriteCraft || 'Heritage Sourdough');

  // Keep edit state in sync when user prop changes
  React.useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone || '');
      setEditAddress(user.deliveryAddress || '');
      setEditCraft(user.favoriteCraft || 'Heritage Sourdough');
    }
  }, [user]);

  if (!user) return null;

  const handleCopyPromo = () => {
    navigator.clipboard.writeText('BONJOUR10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;

    const updated: UserProfile = {
      ...user,
      name: editName.trim(),
      phone: editPhone.trim() || undefined,
      deliveryAddress: editAddress.trim() || undefined,
      favoriteCraft: editCraft.trim() || undefined,
    };

    onUpdateUser(updated);
    setIsEditing(false);
  };

  const nextRewardThreshold = user.loyaltyPoints >= 500 ? 1000 : 500;
  const progressPercent = Math.min(100, Math.round((user.loyaltyPoints / nextRewardThreshold) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            id="account-profile-modal"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Patron Gold / Noir Banner */}
            <div className="p-6 bg-[#341C02] text-[#FAF7F2] relative rounded-t-3xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8C5A0]/20 border border-[#E8C5A0]/30 flex items-center justify-center text-[#E8C5A0] text-lg font-serif font-bold shadow-inner">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#E8C5A0]/20 text-[#E8C5A0] border border-[#E8C5A0]/30 flex items-center gap-1">
                        <Crown className="w-3 h-3 text-[#E8C5A0]" />
                        {user.tier}
                      </span>
                      <span className="text-[11px] text-[#D8C7B5] hidden sm:inline">
                        {user.joinedDate}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                      {user.name}
                    </h2>
                    <p className="text-xs text-[#D8C7B5]/80 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3 h-3 text-[#E8C5A0]" />
                      <span>{user.email}</span>
                    </p>
                  </div>
                </div>

                <button
                  id="close-account-modal"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors focus:outline-none"
                  title="Close account dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Loyalty Points Bar */}
              <div className="mt-5 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-[#FAF7F2]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E8C5A0]" />
                    <span>Loyalty Points Balance</span>
                  </div>
                  <span className="font-bold text-[#E8C5A0] text-sm">
                    {user.loyaltyPoints} <span className="text-xs text-white/70">/ {nextRewardThreshold} pts</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#E27D60] to-[#E8C5A0] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#D8C7B5] mt-1.5">
                  <span>{nextRewardThreshold - user.loyaltyPoints} pts until next reward tier</span>
                  {onOpenClubModal ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenClubModal();
                      }}
                      className="font-bold text-[#E8C5A0] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Guild Tier Details →</span>
                    </button>
                  ) : (
                    <span className="font-semibold text-white">{progressPercent}%</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div ref={scrollRef} className="p-6 sm:p-7 max-h-[70vh] overflow-y-auto space-y-6">

              {/* 1. Member VIP Promo Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF9F2] to-[#F5ECE0] border border-[#E8DEC0] shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8D4B26]/10 text-[#8D4B26] flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D4B26] block">
                      Patron Privilege Coupon
                    </span>
                    <strong className="text-xs sm:text-sm text-[#341C02]">
                      10% OFF Every Order
                    </strong>
                    <p className="text-[11px] text-[#786C5E]">Apply coupon code at checkout</p>
                  </div>
                </div>

                <button
                  id="copy-member-promo-btn"
                  onClick={handleCopyPromo}
                  className="px-3 py-1.5 rounded-xl bg-[#341C02] hover:bg-[#48392C] text-[#FAF7F2] text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs shrink-0"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#A8D5BA]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#E8C5A0]" />
                      <span>BONJOUR10</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2. Patron Information Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E5244] flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#8D4B26]" />
                    <span>Patron Preferences & Address</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs font-semibold text-[#8D4B26] hover:text-[#341C02] flex items-center gap-1 transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Details</span>
                      </>
                    )}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-3 p-4 rounded-2xl bg-white border border-[#E5DACD]">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B5E4F] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-[#D9CEBF] bg-[#FAF7F2] text-[#341C02] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5E4F] block mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full text-xs p-2 rounded-xl border border-[#D9CEBF] bg-[#FAF7F2] text-[#341C02] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5E4F] block mb-1">
                          Favorite Baking Craft
                        </label>
                        <input
                          type="text"
                          value={editCraft}
                          onChange={(e) => setEditCraft(e.target.value)}
                          placeholder="e.g. Sourdough & Ancient Grains"
                          className="w-full text-xs p-2 rounded-xl border border-[#D9CEBF] bg-[#FAF7F2] text-[#341C02] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#6B5E4F] block mb-1">
                        Saved Delivery Address
                      </label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Street, Apartment, Postal Code"
                        className="w-full text-xs p-2 rounded-xl border border-[#D9CEBF] bg-[#FAF7F2] text-[#341C02] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#341C02] hover:bg-[#48392C] text-[#FAF7F2] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-white border border-[#E5DACD] space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[11px] text-[#8C7A68] block">Contact Phone</span>
                        <strong className="text-[#341C02]">{user.phone || 'No phone recorded'}</strong>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#8C7A68] block">Preferred Craft</span>
                        <strong className="text-[#341C02] flex items-center gap-1">
                          <Heart className="w-3 h-3 text-[#E27D60]" />
                          <span>{user.favoriteCraft || 'Heritage Sourdough'}</span>
                        </strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#F2ECE1]">
                      <span className="text-[11px] text-[#8C7A68] block">Default Delivery Address</span>
                      <p className="text-[#341C02] flex items-start gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8D4B26] shrink-0 mt-0.5" />
                        <span>{user.deliveryAddress || 'No default address configured'}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Quick Bakery Navigation Shortcuts */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5E5244] block">
                  Quick Fournil Services
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOrderLookup();
                    }}
                    className="p-3 rounded-2xl bg-white hover:bg-[#F5EFE6] border border-[#E5DACD] text-left transition-colors group flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <ReceiptText className="w-4 h-4 text-[#8D4B26]" />
                      <span className="text-[10px] text-[#786C5E] group-hover:text-[#341C02]">Open →</span>
                    </div>
                    <div>
                      <strong className="text-xs text-[#341C02] block group-hover:text-[#8D4B26] transition-colors">
                        Track Orders
                      </strong>
                      <span className="text-[10px] text-[#786C5E]">Live bake status</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenSchedule();
                    }}
                    className="p-3 rounded-2xl bg-white hover:bg-[#F5EFE6] border border-[#E5DACD] text-left transition-colors group flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <Clock className="w-4 h-4 text-[#C17D44]" />
                      <span className="text-[10px] text-[#786C5E] group-hover:text-[#341C02]">Open →</span>
                    </div>
                    <div>
                      <strong className="text-xs text-[#341C02] block group-hover:text-[#8D4B26] transition-colors">
                        Oven Schedule
                      </strong>
                      <span className="text-[10px] text-[#786C5E]">Fresh daily batches</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenBoxBuilder();
                    }}
                    className="p-3 rounded-2xl bg-white hover:bg-[#F5EFE6] border border-[#E5DACD] text-left transition-colors group flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <Sparkles className="w-4 h-4 text-[#8D4B26]" />
                      <span className="text-[10px] text-[#786C5E] group-hover:text-[#341C02]">Open →</span>
                    </div>
                    <div>
                      <strong className="text-xs text-[#341C02] block group-hover:text-[#8D4B26] transition-colors">
                        Curate Box
                      </strong>
                      <span className="text-[10px] text-[#786C5E]">Bespoke pastry sets</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 4. Sign Out Button */}
              <div className="pt-3 border-t border-[#EAE0D3] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[#8C7A68]">
                  <ShieldCheck className="w-4 h-4 text-[#A8D5BA]" />
                  <span>Verified Club Session</span>
                </div>

                <button
                  id="sign-out-btn"
                  onClick={() => {
                    onSignOut();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl border border-[#D9CEBF] text-[#96381C] hover:bg-[#FDF2F0] hover:border-[#F5C2B8] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
