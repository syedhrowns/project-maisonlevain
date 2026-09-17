import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  MapPin, 
  ReceiptText, 
  ChevronDown, 
  BookOpen, 
  User, 
  Crown, 
  Menu,
  Star,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, CustomBoxItem, UserProfile } from '../types';
import { BakeryLogo } from './BakeryLogo';

export interface NavbarProps {
  cartItems: CartItem[];
  customBoxes: CustomBoxItem[];
  onOpenCart: () => void;
  onOpenBoxBuilder: () => void;
  onOpenSchedule: () => void;
  onOpenOrderLookup: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenAccount: () => void;
  onOpenClubModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  customBoxes,
  onOpenCart,
  onOpenBoxBuilder,
  onOpenSchedule,
  onOpenOrderLookup,
  activeSection,
  onNavigate,
  searchQuery,
  onSearchChange,
  currentUser,
  onOpenAuth,
  onOpenAccount,
  onOpenClubModal,
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = 
    cartItems.reduce((acc, item) => acc + item.quantity, 0) + 
    customBoxes.length;

  const totalCartPrice = 
    cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0) +
    customBoxes.reduce((acc, box) => acc + box.price, 0);

  // Keyboard shortcut listener to close menus on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMoreMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Background scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile/tablet menu if resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header id="navbar-header" className="sticky top-0 z-50 w-full px-2.5 sm:px-4 lg:px-6 2xl:px-8 pt-2.5 pb-2 transition-all">
      <div 
        className="w-full max-w-[1560px] mx-auto bg-white/92 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 border border-[#E6DACB]/85 rounded-2xl shadow-xs px-2.5 sm:px-3.5 xl:px-4 2xl:px-5 py-2 flex items-center justify-between gap-2 sm:gap-3 relative" 
        style={{ WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)" }}
      >
        {/* Brand Mark (Desktop Only, >= md) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            id="nav-brand-btn"
            onClick={() => onNavigate('hero')}
            className="hidden md:flex items-center gap-2 group text-left cursor-pointer transition-opacity hover:opacity-90 shrink-0"
            title="Maison Levain — Fournil Artisanal"
          >
            <BakeryLogo size="xs" className="w-8 h-8 sm:w-9 sm:h-9 shadow-xs ring-1 ring-[#A87B4C]/20" />
            <div className="hidden lg:flex flex-col">
              <span className="font-serif font-bold text-[22px] text-[#341C02] leading-tight tracking-tight" style={{ fontSize: '22px', marginTop: '-2px' }}>
                Maison Levain
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#A87B4C] font-semibold hidden md:inline leading-none" style={{ marginTop: '-2px' }}>
                Fournil Artisanal
              </span>
            </div>
          </button>

          {/* Menu Trigger Button (< lg screens: mobile and tablet) */}
          <div className="lg:hidden flex items-center relative">
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#E5DACD] text-[#341C02] text-xs font-bold rounded-xl h-[36px] transition-colors shadow-xs active:scale-95 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-4 h-4 text-[#8D4B26]" />
              <span className="font-semibold text-xs ml-0.5">Menu</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#786C5E] transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links (>= lg screens only, hidden on mobile & tablet) */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5 lg:gap-1 min-w-0">
          <nav className="flex items-center gap-0.5 lg:gap-1 text-xs font-semibold text-[#5E5244]" aria-label="Bakery sections">
            {/* Daily Bakes */}
            <button
              id="nav-link-catalog"
              onClick={() => onNavigate('catalog')}
              className={`relative px-2.5 lg:px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 h-[36px] cursor-pointer ${
                activeSection === 'catalog'
                  ? 'text-[#341C02] font-bold'
                  : 'text-[#5E5244] hover:text-[#341C02] hover:bg-[#F5EFE6]'
              }`}
            >
              {activeSection === 'catalog' && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="absolute inset-0 bg-[#EFE8DC]/90 backdrop-blur-md rounded-xl shadow-[0_1px_3px_rgba(52,28,2,0.04)] border border-[#E5DACD]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">Daily Bakes</span>
            </button>

            {/* Heritage Grains */}
            <button
              id="nav-link-grains"
              onClick={() => onNavigate('grains')}
              className={`relative px-2.5 lg:px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 h-[36px] cursor-pointer ${
                activeSection === 'grains'
                  ? 'text-[#341C02] font-bold'
                  : 'text-[#5E5244] hover:text-[#341C02] hover:bg-[#F5EFE6]'
              }`}
            >
              {activeSection === 'grains' && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="absolute inset-0 bg-[#EFE8DC]/90 backdrop-blur-md rounded-xl shadow-[0_1px_3px_rgba(52,28,2,0.04)] border border-[#E5DACD]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">Heritage Grains</span>
            </button>

            {/* Club Maison Tiers */}
            <button
              id="nav-link-club"
              onClick={() => {
                if (onOpenClubModal) onOpenClubModal();
                onNavigate('club');
              }}
              className={`relative flex px-2.5 lg:px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-semibold whitespace-nowrap items-center gap-1.5 h-[36px] cursor-pointer ${
                activeSection === 'club'
                  ? 'text-[#341C02] font-bold'
                  : 'text-[#8D4B26] hover:text-[#341C02] hover:bg-[#F5EFE6]'
              }`}
              title="Club Maison Tiers — Membership & Privileges"
            >
              {activeSection === 'club' && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="absolute inset-0 bg-[#EFE8DC]/90 backdrop-blur-md rounded-xl shadow-[0_1px_3px_rgba(52,28,2,0.04)] border border-[#E5DACD]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <Crown className="w-3.5 h-3.5 text-[#C17D44] relative z-10 shrink-0" />
              <span className="relative z-10">Club Maison Tiers</span>
            </button>

            {/* Pairing Room (hidden below 960px) */}
            <button
              id="nav-link-pairings"
              onClick={() => onNavigate('pairings')}
              className={`relative hidden min-[960px]:flex px-2.5 lg:px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-semibold whitespace-nowrap items-center gap-1.5 h-[36px] cursor-pointer ${
                activeSection === 'pairings'
                  ? 'text-[#341C02] font-bold'
                  : 'text-[#5E5244] hover:text-[#341C02] hover:bg-[#F5EFE6]'
              }`}
            >
              {activeSection === 'pairings' && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="absolute inset-0 bg-[#EFE8DC]/90 backdrop-blur-md rounded-xl shadow-[0_1px_3px_rgba(52,28,2,0.04)] border border-[#E5DACD]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">Pairing Room</span>
            </button>

            {/* Atelier Classes (visible on xl+ >= 1280px) */}
            <button
              id="nav-link-workshops"
              onClick={() => onNavigate('workshops')}
              className={`relative hidden xl:flex px-2.5 lg:px-3 py-1.5 rounded-xl transition-all duration-200 text-xs font-semibold whitespace-nowrap items-center gap-1.5 h-[36px] cursor-pointer ${
                activeSection === 'workshops'
                  ? 'text-[#341C02] font-bold'
                  : 'text-[#5E5244] hover:text-[#341C02] hover:bg-[#F5EFE6]'
              }`}
            >
              {activeSection === 'workshops' && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="absolute inset-0 bg-[#EFE8DC]/90 backdrop-blur-md rounded-xl shadow-[0_1px_3px_rgba(52,28,2,0.04)] border border-[#E5DACD]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">Atelier Classes</span>
            </button>

            {/* Explore Dropdown Menu */}
            <div className="relative">
              <button
                id="nav-explore-menu-btn"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`relative flex items-center gap-1 px-2.5 lg:px-3 py-1.5 rounded-xl transition-colors duration-200 text-xs font-semibold whitespace-nowrap h-[36px] cursor-pointer ${
                  isMoreMenuOpen
                    ? 'text-[#341C02] font-bold bg-[#EFE8DC]/80 border border-[#E5DACD]'
                    : 'text-[#786C5E] hover:text-[#341C02] hover:bg-[#F5EFE6]'
                }`}
                aria-haspopup="true"
                aria-expanded={isMoreMenuOpen}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span>Explore</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              <AnimatePresence>
                {isMoreMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsMoreMenuOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-[#FAF7F2] rounded-2xl p-2 shadow-xl border border-[#E5DACD] space-y-0.5 z-50"
                      onMouseLeave={() => setIsMoreMenuOpen(false)}
                    >
                      {/* Pairing Room (shown in dropdown on < 960px) */}
                      <button
                        id="nav-explore-pairings"
                        onClick={() => {
                          onNavigate('pairings');
                          setIsMoreMenuOpen(false);
                        }}
                        className="min-[960px]:hidden w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02] transition-colors cursor-pointer"
                      >
                        <span>Pairing Room</span>
                      </button>

                      {/* Craft & Hydration */}
                      <button
                        id="nav-explore-craft"
                        onClick={() => {
                          onNavigate('craft');
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02] transition-colors cursor-pointer"
                      >
                        <span>Craft & Hydration</span>
                      </button>

                      {/* Curate Custom Box */}
                      <button
                        id="nav-explore-box-builder"
                        onClick={() => {
                          onOpenBoxBuilder();
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-[#8D4B26] hover:bg-[#F8EFE6] transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C17D44]" />
                        <span>Curate Custom Box</span>
                      </button>

                      {/* Atelier Classes (shown in dropdown on < xl) */}
                      <button
                        id="nav-explore-workshops"
                        onClick={() => {
                          onNavigate('workshops');
                          setIsMoreMenuOpen(false);
                        }}
                        className="xl:hidden w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02] transition-colors cursor-pointer"
                      >
                        <span>Atelier Classes</span>
                      </button>

                      {/* Club Maison */}
                      <button
                        id="nav-explore-club"
                        onClick={() => {
                          if (onOpenClubModal) onOpenClubModal();
                          onNavigate('club');
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 text-[#8D4B26] hover:bg-[#F5EFE6] hover:text-[#341C02] transition-colors cursor-pointer"
                      >
                        <Crown className="w-3.5 h-3.5 text-[#C17D44]" />
                        <span>Club Maison Tiers</span>
                      </button>

                      <button
                        id="nav-explore-schedule"
                        onClick={() => {
                          onOpenSchedule();
                          setIsMoreMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-[#341C02] hover:bg-[#EFE8DC] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#C17D44]" />
                        <span>Oven Schedule</span>
                      </button>

                      <button
                        id="nav-explore-journal"
                        onClick={() => {
                          onNavigate('journal');
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                          activeSection === 'journal' ? 'bg-[#EFE8DC] text-[#341C02]' : 'text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02]'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#A8794E]" />
                        <span>Fournil Journal</span>
                      </button>

                      <button
                        id="nav-explore-reviews"
                        onClick={() => {
                          onNavigate('reviews');
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                          activeSection === 'reviews' ? 'bg-[#EFE8DC] text-[#341C02]' : 'text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02]'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 text-[#8D4B26]" />
                        <span>Reviews & Press</span>
                      </button>

                      <button
                        id="nav-explore-location"
                        onClick={() => {
                          onNavigate('location');
                          setIsMoreMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                          activeSection === 'location' ? 'bg-[#EFE8DC] text-[#341C02]' : 'text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02]'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#786C5E]" />
                        <span>Hours & Location</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
          {/* Track Order Button (Hidden on Mobile & Tablet, placed in Menu) */}
          <button
            id="nav-order-lookup-btn"
            onClick={onOpenOrderLookup}
            className="hidden lg:flex h-[36px] px-2.5 sm:px-3 text-xs font-medium text-[#5E5244] hover:text-[#341C02] hover:bg-[#F2ECE1] rounded-xl transition-colors items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            title="Track Your Order"
          >
            <ReceiptText className="w-4 h-4 text-[#786C5E] shrink-0" />
            <span className="hidden sm:inline-block xl:hidden 2xl:inline-block">Track</span>
          </button>

          {/* Patron Login / Account Button */}
          {currentUser ? (
            <button
              id="nav-account-btn"
              onClick={onOpenAccount}
              className="h-[36px] px-2 sm:pl-2 sm:pr-3 text-xs font-semibold text-[#341C02] bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#E5DACD] hover:border-[#D0C0AC] rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap group shrink-0 active:scale-95 cursor-pointer"
              title={`Patron: ${currentUser.name} (${currentUser.tier})`}
            >
              <div className="w-5 h-5 rounded-full bg-[#341C02] text-[#E8C5A0] text-[10px] font-serif font-bold flex items-center justify-center shrink-0 shadow-xs">
                {currentUser.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="hidden sm:inline-block max-w-[75px] 2xl:max-w-[100px] truncate text-xs font-bold text-[#341C02] group-hover:text-[#8D4B26] transition-colors">
                {currentUser.name.split(' ')[0]}
              </span>
              <Crown className="w-3.5 h-3.5 text-[#C17D44] shrink-0 hidden 2xl:inline-block" />
            </button>
          ) : (
            <button
              id="nav-login-btn"
              onClick={onOpenAuth}
              className="h-[36px] px-2.5 sm:px-3 text-xs font-semibold text-[#5E5244] hover:text-[#341C02] hover:bg-[#F2ECE1] rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap border border-transparent hover:border-[#E5DACD]/60 shrink-0 active:scale-95 cursor-pointer"
              title="Club Maison Levain - Member Sign In"
            >
              <User className="w-4 h-4 text-[#8D4B26] shrink-0" />
              <span className="hidden sm:inline-block xl:hidden 2xl:inline-block">Sign In</span>
            </button>
          )}

          {/* Cart / Basket Button */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            className="relative h-[36px] px-3 sm:px-3.5 2xl:px-4 flex items-center justify-center bg-[#341C02] hover:bg-[#452704] text-[#FAF7F2] rounded-xl transition-colors shadow-xs whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
            aria-label={`Shopping basket with ${totalCartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-[#E8C5A0]" />
            <div className="flex items-center gap-1.5 ml-1.5">
              {totalCartCount === 0 ? (
                <span className="text-xs sm:text-sm font-semibold">Basket</span>
              ) : (
                <>
                  <span className="text-xs sm:text-sm font-semibold">
                    <span className="hidden sm:inline xl:hidden 2xl:inline">Basket </span>
                    <span className="bg-[#E8C5A0] text-[#341C02] text-[11px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
                      {totalCartCount}
                    </span>
                  </span>
                  {totalCartPrice > 0 && (
                    <span className="text-xs font-semibold text-[#E8C5A0] border-l border-white/20 pl-1.5 hidden min-[480px]:inline xl:hidden 2xl:inline">
                      ${totalCartPrice.toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Navigation Drawer / Overlay (< lg viewports: mobile and tablet) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-start">
            {/* Full-screen Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            {/* Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative mx-3 sm:mx-auto sm:max-w-md sm:w-full mt-2.5 bg-[#FAF7F2] rounded-2xl p-3.5 shadow-2xl border border-[#E5DACD] max-h-[calc(100vh-28px)] overflow-y-auto overscroll-contain flex flex-col gap-1 z-10"
            >
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E5DACD]/70 px-1">
                <div className="flex items-center gap-2">
                  <BakeryLogo size="xs" className="w-7 h-7 shadow-xs ring-1 ring-[#A87B4C]/20" />
                  <div className="flex flex-col text-left">
                    <span className="font-serif font-bold text-base text-[#341C02] leading-tight">
                      Maison Levain
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#A87B4C] font-semibold leading-none">
                      Fournil Artisanal
                    </span>
                  </div>
                </div>
                <button
                  id="nav-mobile-menu-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-[#5E5244] hover:text-[#341C02] hover:bg-[#EFE8DC] rounded-xl transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-1.5 pt-1 text-[11px] font-bold text-[#A87B4C] uppercase tracking-wider">
                Explore Bakery
              </div>

              {[
                { id: 'catalog', label: 'Daily Bakes' },
                { id: 'grains', label: 'Heritage Grains' },
                { id: 'pairings', label: 'Pairing Room' },
                { id: 'craft', label: 'Craft & Hydration' },
                { id: 'workshops', label: 'Atelier Classes' },
                { id: 'club', label: 'Club Maison Tiers', icon: Crown },
              ].map((link) => (
                <button
                  key={link.id}
                  id={`nav-mobile-link-${link.id}`}
                  onClick={() => {
                    if (link.id === 'club' && onOpenClubModal) {
                      onOpenClubModal();
                    }
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeSection === link.id ? 'bg-[#EFE8DC] text-[#341C02] font-bold' : 'text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.icon && <Crown className="w-3.5 h-3.5 text-[#C17D44]" />}
                </button>
              ))}

              <div className="h-px bg-[#E5DACD]/70 my-1" />

              <button
                id="nav-mobile-box-builder"
                onClick={() => {
                  onOpenBoxBuilder();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#8D4B26] hover:bg-[#F8EFE6] flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C17D44]" />
                <span>Curate Custom Box</span>
              </button>

              <button
                id="nav-mobile-schedule"
                onClick={() => {
                  onOpenSchedule();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#341C02] hover:bg-[#EFE8DC] flex items-center gap-2 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-[#C17D44]" />
                <span>Oven Schedule</span>
              </button>

              <button
                id="nav-mobile-order-lookup"
                onClick={() => {
                  onOpenOrderLookup();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02] flex items-center gap-2 cursor-pointer"
              >
                <ReceiptText className="w-3.5 h-3.5 text-[#786C5E]" />
                <span>Track Order</span>
              </button>

              <button
                id="nav-mobile-journal"
                onClick={() => {
                  onNavigate('journal');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeSection === 'journal' ? 'bg-[#EFE8DC] text-[#341C02]' : 'text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#A8794E]" />
                <span>Fournil Journal</span>
              </button>

              <button
                id="nav-mobile-reviews"
                onClick={() => {
                  onNavigate('reviews');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeSection === 'reviews' ? 'bg-[#EFE8DC] text-[#341C02]' : 'text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02]'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-[#8D4B26]" />
                <span>Reviews & Michelin</span>
              </button>

              <button
                id="nav-mobile-location"
                onClick={() => {
                  onNavigate('location');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeSection === 'location' ? 'bg-[#EFE8DC] text-[#341C02]' : 'text-[#5E5244] hover:bg-[#F5EFE6] hover:text-[#341C02]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#786C5E]" />
                <span>Hours & Location</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
