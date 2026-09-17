import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, CustomBoxItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Gift, Tag, Check, Clock, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  customBoxes: CustomBoxItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onRemoveBox: (boxId: string) => void;
  onProceedToCheckout: () => void;
  fulfillmentType: 'pickup' | 'delivery';
  onFulfillmentTypeChange: (type: 'pickup' | 'delivery') => void;
  discountCode: string;
  onApplyDiscountCode: (code: string) => boolean;
  discountAmount: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 350, damping: 25 } }
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  customBoxes,
  onUpdateQuantity,
  onRemoveItem,
  onRemoveBox,
  onProceedToCheckout,
  fulfillmentType,
  onFulfillmentTypeChange,
  discountCode,
  onApplyDiscountCode,
  discountAmount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const itemsSubtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  const boxesSubtotal = customBoxes.reduce((acc, box) => acc + box.price, 0);
  const subtotal = itemsSubtotal + boxesSubtotal;

  const deliveryFee = fulfillmentType === 'delivery' ? 4.50 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.0825; // 8.25% local bakery tax
  const total = taxableAmount + tax + deliveryFee;

  const isEmpty = cartItems.length === 0 && customBoxes.length === 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const applied = onApplyDiscountCode(promoInput.trim().toUpperCase());
    if (applied) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon.');
      setPromoSuccess(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div 
            id="cart-drawer-panel"
            initial={{ opacity: 0, scale: 0.92, y: 40, filter: "blur(8px)", rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40, filter: "blur(8px)", rotateX: -8, transition: { ease: "easeInOut", duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.6 }}
            className="w-full max-w-[460px] max-h-[90vh] flex flex-col bg-[#FAF7F2] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden ring-1 ring-inset ring-[#341C02]/20"
            style={{ perspective: "1000px" }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Elegant Header */}
            <div className="p-6 sm:px-8 flex items-center justify-between border-b border-[#EAE0D3] bg-white relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EFE8DC] flex items-center justify-center border border-[#D9CEBF] shadow-sm">
                  <ShoppingBag className="w-5 h-5 text-[#8D4B26]" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#341C02]">Your Order</h2>
                  {!isEmpty && (
                    <p className="text-xs text-[#786C5E] uppercase tracking-wider font-semibold mt-0.5">
                      {cartItems.length + customBoxes.length} {cartItems.length + customBoxes.length === 1 ? 'Selection' : 'Selections'}
                    </p>
                  )}
                </div>
              </div>

              <button
                id="close-cart-drawer"
                onClick={onClose}
                className="p-2.5 rounded-full bg-[#FAF7F2] border border-[#EAE0D3] hover:bg-[#F4EDE2] hover:border-[#D9CEBF] text-[#341C02] transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Content / Scroll Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 sm:px-8 bg-[#FAF7F2]">
              
              {isEmpty ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.15 }}
                  className="py-20 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center border border-[#D9CEBF] rotate-3 shadow-sm relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#EFE8DC] to-transparent rounded-3xl opacity-50" />
                    <ShoppingBag className="w-10 h-10 text-[#C17D44] relative z-10" />
                  </div>
                  <div className="space-y-2.5">
                    <h3 className="font-serif text-2xl font-bold text-[#341C02]">
                      Empty Basket
                    </h3>
                    <p className="text-sm text-[#786C5E] max-w-[240px] mx-auto leading-relaxed">
                      Discover our daily sourdough, laminated viennoiserie, or build a curated box.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 bg-[#341C02] text-[#FAF7F2] rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#45372B] transition-all shadow-md active:scale-95"
                  >
                    Browse Menu
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="show" 
                  className="space-y-6"
                >
                  
                  {/* Fulfillment Selector */}
                  <motion.div variants={itemVariants} className="p-1 rounded-xl bg-[#EAE0D3] flex gap-1 shadow-inner relative">
                    <button
                      type="button"
                      onClick={() => onFulfillmentTypeChange('pickup')}
                      className={`relative flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all z-10 ${
                        fulfillmentType === 'pickup'
                          ? 'text-[#341C02]'
                          : 'text-[#786C5E] hover:text-[#341C02]'
                      }`}
                    >
                      Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => onFulfillmentTypeChange('delivery')}
                      className={`relative flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all z-10 ${
                        fulfillmentType === 'delivery'
                          ? 'text-[#341C02]'
                          : 'text-[#786C5E] hover:text-[#341C02]'
                      }`}
                    >
                      Delivery
                    </button>
                    {/* Animated slider background */}
                    <motion.div 
                      className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
                      animate={{ 
                        x: fulfillmentType === 'pickup' ? 0 : '100%' 
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </motion.div>

                  <div className="space-y-0">
                    {/* Custom Box Items */}
                    {customBoxes.map((box) => (
                      <motion.div
                        variants={itemVariants}
                        key={box.boxId}
                        className="py-5 border-b border-dashed border-[#D9CEBF] space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C17D44]">
                              <Sparkles className="w-3 h-3" />
                              <span>Curated Box</span>
                            </div>
                            <h4 className="font-serif text-lg font-bold text-[#341C02] leading-tight">
                              {box.name}
                            </h4>
                            <p className="text-xs text-[#786C5E] font-medium">
                              {box.packagingType}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="font-serif font-bold text-lg text-[#341C02]">
                              ${box.price.toFixed(2)}
                            </span>
                            <button
                              onClick={() => onRemoveBox(box.boxId)}
                              className="block text-[11px] font-bold text-[#8D4B26] uppercase tracking-wider hover:text-[#C17D44] mt-1.5 ml-auto transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Box Pastries List */}
                        <div className="p-3.5 rounded-xl bg-white border border-[#EAE0D3] text-xs text-[#5E5244] shadow-sm">
                          <ul className="space-y-1.5">
                            {box.items.map((i, idx) => (
                              <li key={idx} className="flex justify-between items-center border-b border-[#F4EDE2] pb-1.5 last:border-0 last:pb-0">
                                <span>{i.item.name}</span>
                                <span className="font-bold text-[#341C02]">x{i.quantity}</span>
                              </li>
                            ))}
                          </ul>
                          {box.giftMessage && (
                            <p className="text-[11px] italic text-[#8D4B26] pt-2 mt-2 border-t border-[#EAE0D3]">
                              Note: "{box.giftMessage}"
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Standard Cart Items */}
                    {cartItems.map((cartItem) => (
                      <motion.div
                        variants={itemVariants}
                        key={cartItem.id}
                        className="py-5 border-b border-dashed border-[#D9CEBF] flex items-start gap-4 relative group"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 relative bg-white border border-[#EAE0D3]">
                          <img
                            src={cartItem.item.imageUrl}
                            alt={cartItem.item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent mix-blend-overlay" />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col h-full justify-between space-y-2">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif text-base font-bold text-[#341C02] leading-tight">
                                {cartItem.item.name}
                              </h4>
                              <span className="font-serif font-bold text-base text-[#341C02] shrink-0">
                                ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                              </span>
                            </div>

                            {/* Modifiers (Slicing / Warming / Gift) */}
                            <div className="text-[11px] font-medium text-[#786C5E] mt-1 space-y-0.5">
                              {cartItem.selectedSlicing && (
                                <p>Slice: <span className="text-[#341C02]">{cartItem.selectedSlicing}</span></p>
                              )}
                              {cartItem.warmed && (
                                <p className="text-[#C17D44] flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" /> Oven-Warmed
                                </p>
                              )}
                              {cartItem.giftBox && (
                                <p className="text-[#8D4B26] flex items-center gap-1">
                                  <Gift className="w-3 h-3" /> Linen Box
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Quantity & Remove */}
                          <div className="flex items-center justify-between mt-auto pt-1">
                            <div className="flex items-center bg-white border border-[#D9CEBF] rounded-lg p-0.5 shadow-sm">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                                className="p-1.5 hover:bg-[#F4EDE2] rounded text-[#5E5244] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center font-serif font-bold text-xs text-[#341C02]">
                                {cartItem.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                                className="p-1.5 hover:bg-[#F4EDE2] rounded text-[#5E5244] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(cartItem.id)}
                              className="text-[10px] font-bold uppercase tracking-wider text-[#8D4B26] hover:text-[#C17D44] transition-colors"
                            >
                              Remove
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Promo Code Form */}
                  <motion.form variants={itemVariants} onSubmit={handleApplyPromo} className="pt-2 pb-2">
                    <div className="flex gap-2 relative">
                      <Tag className="w-4 h-4 text-[#A8794E] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="PROMO CODE"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full text-xs font-bold tracking-wider pl-10 pr-3 py-3 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] focus:outline-none focus:border-[#8D4B26] uppercase transition-colors shadow-sm"
                      />
                      <button
                        type="submit"
                        className="px-6 bg-[#341C02] rounded-xl text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#45372B] transition-colors shadow-sm"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] font-semibold text-[#C15C3D] mt-2 pl-1 flex items-center gap-1">
                        <X className="w-3 h-3" /> {promoError}
                      </p>
                    )}
                    {discountAmount > 0 && (
                      <p className="text-[11px] font-semibold text-[#388E3C] mt-2 pl-1 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Promo applied: -${discountAmount.toFixed(2)}
                      </p>
                    )}
                  </motion.form>

                </motion.div>
              )}

            </div>

            {/* Cart Footer Checkout Bar */}
            {!isEmpty && (
              <div className="bg-[#1C140E] text-[#FAF7F2] p-6 sm:px-8 space-y-5 relative z-10">
                
                {/* Financial Calculation */}
                <div className="space-y-2.5 text-sm text-[#D8C7B5]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-serif font-bold text-white">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#A8D5BA]">
                      <span>Discount ({discountCode})</span>
                      <span className="font-serif font-bold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>
                      {fulfillmentType === 'delivery' ? 'Courier Delivery' : 'Bakery Pickup'}
                    </span>
                    <span className="font-serif font-bold">{deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax (8.25%)</span>
                    <span className="font-serif font-bold">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-white pt-4 mt-2 border-t border-white/10">
                    <span className="font-serif">Total</span>
                    <span className="font-serif text-2xl text-[#E8C5A0]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  id="cart-checkout-btn"
                  onClick={onProceedToCheckout}
                  className="w-full bg-[#E8C5A0] hover:bg-[#D9B48F] text-[#1C140E] py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-[0_4px_20px_rgba(232,197,160,0.3)] flex items-center justify-center gap-3 active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </button>

                <p className="text-[11px] text-center text-[#A8794E] flex items-center justify-center gap-1.5 uppercase tracking-wider font-semibold pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Freshly prepared in 25–40 minutes</span>
                </p>

              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
