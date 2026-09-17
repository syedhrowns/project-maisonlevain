import React, { useState, useEffect, useRef } from 'react';
import { BakeryItem, CartItem, CustomBoxItem, OrderDetails, Category, SlicingOption, UserProfile } from './types';
import { BAKERY_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { TerroirGrainSection } from './components/TerroirGrainSection';
import { PairingGuideSection } from './components/PairingGuideSection';
import { ArtisanalCraftSection } from './components/ArtisanalCraftSection';
import { FournilJournalSection } from './components/FournilJournalSection';
import { AtelierSection } from './components/AtelierSection';
import { ReviewsAndPressSection } from './components/ReviewsAndPressSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomBoxBuilderModal } from './components/CustomBoxBuilderModal';
import { BakeScheduleModal } from './components/BakeScheduleModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { ClubMaisonSection } from './components/ClubMaisonSection';
import { ClubMaisonModal } from './components/ClubMaisonModal';
import { BakeryFooter } from './components/BakeryFooter';
import { ShoppingBag, Sparkles, Clock, Check } from 'lucide-react';

export default function App() {
  // Products & Filtering State
  const [products] = useState<BakeryItem[]>(BAKERY_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Patron & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('maison_levain_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);

  // Modals & Drawers State
  const [selectedDetailItem, setSelectedDetailItem] = useState<BakeryItem | null>(null);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState<boolean>(false);
  const [isClubModalOpen, setIsClubModalOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Cart & Fulfillment State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_levain_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customBoxes, setCustomBoxes] = useState<CustomBoxItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_levain_boxes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('maison_levain_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // LocalStorage synchronizers (wrapped safely for sandbox/iframe storage constraints)
  useEffect(() => {
    try {
      localStorage.setItem('maison_levain_cart', JSON.stringify(cartItems));
    } catch {
      // Storage access blocked or quota exceeded in sandboxed iframe
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_levain_boxes', JSON.stringify(customBoxes));
    } catch {
      // Storage access blocked or quota exceeded in sandboxed iframe
    }
  }, [customBoxes]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_levain_orders', JSON.stringify(orders));
    } catch {
      // Storage access blocked or quota exceeded in sandboxed iframe
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('maison_levain_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('maison_levain_user');
      }
    } catch {
      // Storage access blocked or quota exceeded in sandboxed iframe
    }
  }, [currentUser]);

  // Check if any floating modal or drawer is active
  const isAnyModalOpen = Boolean(
    selectedDetailItem ||
    isBoxBuilderOpen ||
    isScheduleOpen ||
    isCartOpen ||
    isCheckoutOpen ||
    isOrderLookupOpen ||
    isAuthOpen ||
    isAccountOpen ||
    isClubModalOpen ||
    confirmedOrder
  );

  // Implement scroll lock on background for all floating sections
  useEffect(() => {
    if (isAnyModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isAnyModalOpen]);

  // Programmatic scroll lock ref to prevent ScrollSpy from updating activeSection to intermediate sections during smooth scroll
  const isProgrammaticScrollRef = useRef(false);
  const scrollUnlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ScrollSpy effect to highlight navbar sections on manual scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the user clicked a header link and the page is currently smooth scrolling, ignore intermediate intersections
        if (isProgrammaticScrollRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace('-section', '');
            setActiveSection(sectionId);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    );

    // Cancel programmatic lock if user explicitly scrolls manually with touch/wheel
    const handleUserManualScroll = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        if (scrollUnlockTimeoutRef.current) {
          clearTimeout(scrollUnlockTimeoutRef.current);
        }
      }
      if (window.scrollY < 120) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('wheel', handleUserManualScroll, { passive: true });
    window.addEventListener('touchmove', handleUserManualScroll, { passive: true });
    window.addEventListener('scroll', handleUserManualScroll, { passive: true });

    const sections = [
      'hero',
      'catalog',
      'grains',
      'pairings',
      'craft',
      'workshops',
      'club',
      'journal',
      'reviews',
      'location',
    ];
    
    const timeoutId = setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(`${section}-section`);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scrollUnlockTimeoutRef.current) {
        clearTimeout(scrollUnlockTimeoutRef.current);
      }
      window.removeEventListener('wheel', handleUserManualScroll);
      window.removeEventListener('touchmove', handleUserManualScroll);
      window.removeEventListener('scroll', handleUserManualScroll);
      observer.disconnect();
    };
  }, []);

  // Toast Notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Action Handlers
  const handleQuickAdd = (item: BakeryItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (ci) =>
          ci.itemId === item.id &&
          !ci.selectedSlicing &&
          !ci.warmed &&
          !ci.giftBox &&
          !ci.notes
      );
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          itemId: item.id,
          item,
          quantity: 1,
          unitPrice: item.price,
        },
      ];
    });
    showToast(`Added 1x ${item.name} to basket`);
  };

  const handleDetailedAdd = (
    item: BakeryItem,
    quantity: number,
    slicing?: SlicingOption,
    warmed?: boolean,
    giftBox?: boolean,
    notes?: string
  ) => {
    const giftPrice = giftBox ? 2.50 : 0;
    const unitPrice = item.price + giftPrice;

    setCartItems((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}-${Math.random()}`,
        itemId: item.id,
        item,
        quantity,
        selectedSlicing: slicing,
        warmed,
        giftBox,
        notes,
        unitPrice,
      },
    ]);
    showToast(`Added ${quantity}x ${item.name} to basket`);
  };

  const handleAddCustomBox = (box: CustomBoxItem) => {
    setCustomBoxes((prev) => [...prev, box]);
    showToast(`Added ${box.name} to basket`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.id === cartItemId ? { ...ci, quantity: newQty } : ci))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleRemoveBox = (boxId: string) => {
    setCustomBoxes((prev) => prev.filter((b) => b.boxId !== boxId));
  };

  const handleApplyDiscount = (code: string): boolean => {
    if (code === 'BONJOUR10' || code === 'LEVAIN10') {
      const itemsTotal = cartItems.reduce(
        (acc, item) => acc + item.unitPrice * item.quantity,
        0
      );
      const boxesTotal = customBoxes.reduce((acc, box) => acc + box.price, 0);
      const discount = (itemsTotal + boxesTotal) * 0.10;
      setDiscountCode(code);
      setDiscountAmount(discount);
      return true;
    }
    return false;
  };

  const handleOrderCompleted = (newOrder: OrderDetails) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setCustomBoxes([]);
    setDiscountAmount(0);
    setDiscountCode('');
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setConfirmedOrder(newOrder);

    // Award loyalty points to logged-in patron
    if (currentUser) {
      const earnedPoints = Math.max(10, Math.round(newOrder.total * 10));
      const newTotalPoints = currentUser.loyaltyPoints + earnedPoints;
      const upgradedTier =
        newTotalPoints >= 500
          ? 'Grand Cru Patron'
          : newTotalPoints >= 200
          ? 'Heritage Patron'
          : currentUser.tier;

      const updatedUser: UserProfile = {
        ...currentUser,
        loyaltyPoints: newTotalPoints,
        tier: upgradedTier,
      };
      setCurrentUser(updatedUser);
      setToastMessage(`Order placed! +${earnedPoints} Club Points earned.`);
      setTimeout(() => setToastMessage(null), 4500);
    }
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
    setActiveSection('hero');
    setToastMessage(`Bienvenue, ${user.name}! Signed into Club Maison Levain.`);
    setTimeout(() => setToastMessage(null), 4000);

    // Ensure the page scrolls smoothly to the very top
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
    // Fallback timers to ensure layout/modal unlock completes with page at the top
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 150);
  };

  const handleSignOut = () => {
    const prevName = currentUser?.name;
    setCurrentUser(null);
    setIsAccountOpen(false);
    setActiveSection('hero');
    setToastMessage(`Au revoir${prevName ? `, ${prevName}` : ''}. You have signed out.`);
    setTimeout(() => setToastMessage(null), 3500);

    // Scroll smoothly to the very top of the page on sign out
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 150);
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setCurrentUser(updated);
    setToastMessage('Patron profile updated successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const scrollToSection = (sectionId: string) => {
    // 1. Immediately highlight the target section in the navbar
    setActiveSection(sectionId);

    // 2. Lock programmatic scroll so intermediate sections do not override activeSection on the way
    isProgrammaticScrollRef.current = true;
    if (scrollUnlockTimeoutRef.current) {
      clearTimeout(scrollUnlockTimeoutRef.current);
    }
    // Release the lock after smooth scroll completes
    scrollUnlockTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 900);

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const sectionMap: Record<string, string> = {
      catalog: 'catalog-section',
      grains: 'grains-section',
      pairings: 'pairings-section',
      craft: 'craft-section',
      journal: 'journal-section',
      workshops: 'workshops-section',
      club: 'club-section',
      reviews: 'reviews-section',
      location: 'location-section',
    };
    const targetId = sectionMap[sectionId] || (sectionId.endsWith('-section') ? sectionId : `${sectionId}-section`);
    const element = document.getElementById(targetId);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const navbarOffset = isMobile ? 68 : 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navbarOffset);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectGrainCategory = (cat: Category) => {
    setSelectedCategory(cat);
    scrollToSection('catalog');
  };

  const totalItemCount =
    cartItems.reduce((acc, it) => acc + it.quantity, 0) + customBoxes.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#341C02] font-sans antialiased relative">
      
      {/* Organic Paper Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel-dark text-[#FAF7F2] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-white/10">
          <Check className="w-4 h-4 text-[#A8D5BA]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Floating Glassmorphism Navbar */}
      <Navbar
        cartItems={cartItems}
        customBoxes={customBoxes}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenClubModal={() => setIsClubModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOrderNow={() => scrollToSection('catalog')}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      {/* Main Connected Bakery Experience */}
      <main className="flex-1 space-y-0">
        
        {/* 1. Daily Product Catalog & Online Ordering */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickAdd={handleQuickAdd}
          onSelectDetail={(item) => setSelectedDetailItem(item)}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        />

        {/* 2. Heritage Grains & Terroir Explorer */}
        <TerroirGrainSection
          onSelectGrainCategory={handleSelectGrainCategory}
        />

        {/* 3. Sommelier Pairing Room & Tasting Table */}
        <PairingGuideSection
          products={products}
          onQuickAdd={handleQuickAdd}
          onOpenItemDetail={(item) => setSelectedDetailItem(item)}
        />

        {/* 4. Fermentation Craft & Interactive Hydration Analysis */}
        <ArtisanalCraftSection />

        {/* 5. A Photographic Day at the Fournil Journal */}
        <FournilJournalSection
          onOpenSchedule={() => setIsScheduleOpen(true)}
        />

        {/* 6. Paris Atelier & VIP Masterclasses */}
        <AtelierSection />

        {/* 7. Club Maison Levain Loyalty & Guild Tiers */}
        <ClubMaisonSection
          currentUser={currentUser}
          onOpenClubModal={() => setIsClubModalOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
        />

        {/* 8. Michelin & Patron Critical Acclaim */}
        <ReviewsAndPressSection />

      </main>

      {/* Footer & Location Section */}
      <BakeryFooter />

      {/* Modals & Slide-Overs */}
      
      {/* 1. Product Detail & Slicing Modal */}
      <ProductDetailModal
        item={selectedDetailItem}
        isOpen={Boolean(selectedDetailItem)}
        onClose={() => setSelectedDetailItem(null)}
        onAddToCart={handleDetailedAdd}
      />

      {/* 2. Custom Pastry Box Builder Modal */}
      <CustomBoxBuilderModal
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        onAddBoxToCart={handleAddCustomBox}
      />

      {/* 3. Oven Bake Schedule Modal */}
      <BakeScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as Category);
          scrollToSection('catalog');
        }}
      />

      {/* 4. Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        customBoxes={customBoxes}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onRemoveBox={handleRemoveBox}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          if (!currentUser) {
            setIsAuthOpen(true);
            setToastMessage("Please sign in or create a patron account to proceed to checkout.");
          } else {
            setIsCheckoutOpen(true);
          }
        }}
        fulfillmentType={fulfillmentType}
        onFulfillmentTypeChange={setFulfillmentType}
        discountCode={discountCode}
        onApplyDiscountCode={handleApplyDiscount}
        discountAmount={discountAmount}
      />

      {/* 5. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        customBoxes={customBoxes}
        fulfillmentType={fulfillmentType}
        discountAmount={discountAmount}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onCompleteOrder={handleOrderCompleted}
      />

      {/* 6. Order Confirmation Receipt Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={Boolean(confirmedOrder)}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* 7. Order Lookup / Tracking Modal */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        orders={orders}
        onSelectOrder={(ord) => setConfirmedOrder(ord)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 8. Patron Auth & Sign In Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 9. Patron VIP Account & Loyalty Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={currentUser}
        onSignOut={handleSignOut}
        onUpdateUser={handleUpdateUser}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        onOpenClubModal={() => setIsClubModalOpen(true)}
      />

      {/* 10. Club Maison Levain Tier & Loyalty Program Modal */}
      <ClubMaisonModal
        isOpen={isClubModalOpen}
        onClose={() => setIsClubModalOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

    </div>
  );
}
