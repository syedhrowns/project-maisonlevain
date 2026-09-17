import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BakeryItem, SlicingOption } from '../types';
import { X, Wheat, Clock, Droplets, Check, Plus, Minus, Heart, ShieldAlert, Sparkles, Gift } from 'lucide-react';

interface ProductDetailModalProps {
  item: BakeryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: BakeryItem,
    quantity: number,
    slicing?: SlicingOption,
    warmed?: boolean,
    giftBox?: boolean,
    notes?: string
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSlicing, setSelectedSlicing] = useState<SlicingOption>('Whole Loaf');
  const [warmed, setWarmed] = useState(false);
  const [giftBox, setGiftBox] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  const slicingOptions: SlicingOption[] = [
    'Whole Loaf',
    'Standard Slice (12mm)',
    'Thick Rustic Slice (18mm)',
    'Toast Cut (10mm)',
  ];

  const contentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const previousItemRef = React.useRef<BakeryItem | null>(null);
  if (item) {
    previousItemRef.current = item;
  }
  const displayItem = item || previousItemRef.current;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen, item]);

  if (!displayItem) return <AnimatePresence />;

  const totalPrice = (displayItem.price + (giftBox ? 2.50 : 0)) * quantity;

  const handleAdd = () => {
    setAddedAnimation(true);
    onAddToCart(
      displayItem,
      quantity,
      displayItem.canBeSliced ? selectedSlicing : undefined,
      warmed,
      giftBox,
      customNotes
    );
    
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
      // Reset state for next open
      setTimeout(() => {
        setQuantity(1);
        setSelectedSlicing('Whole Loaf');
        setWarmed(false);
        setGiftBox(false);
        setCustomNotes('');
        setImageError(false);
      }, 300);
    }, 400);
  };

  const fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Home_made_sour_dough_bread.jpg/1280px-Home_made_sour_dough_bread.jpg';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            id="product-detail-modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              id="close-product-detail-modal"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div ref={scrollRef} className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              
              {/* Left Column: Image Area */}
              <div className="md:col-span-5 relative bg-[#EFE8DC] min-h-[260px] md:min-h-[460px] overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  src={imageError ? fallbackImage : displayItem.imageUrl}
                  alt={displayItem.name}
                  onError={() => setImageError(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C140E]/85 via-black/20 to-transparent" />
                
                {/* Bottom Left Stats */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  {displayItem.tags && displayItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {displayItem.tags.map((badge, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-[#8D4B26] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="font-serif text-2xl font-bold">{displayItem.name}</p>
                  <p className="text-xs text-[#D8C7B5] mt-1 font-medium">
                    {displayItem.weightGrams ? `${displayItem.weightGrams}g Hearth Loaf` : 'Small-Batch Handcrafted'}
                  </p>
                </div>
              </div>

              {/* Right Column: Scrollable Content & Forms */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                
                <motion.div variants={contentVariants} initial="hidden" animate="show" className="space-y-4">
                  {/* Header & Description */}
                  <motion.div variants={childVariants}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#5E5244]">
                        <Heart className="w-3.5 h-3.5 text-[#C17D44]" />
                        <span>Artisan Process</span>
                      </div>
                      <span className="font-serif font-bold text-xl text-[#341C02]">
                        ${displayItem.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-[#5E5244] leading-relaxed mt-3">
                      {displayItem.description}
                    </p>
                  </motion.div>

                  {/* Craft Specifications Bar */}
                  <motion.div variants={childVariants} className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#F4EDE2] border border-[#E8DFD1] text-center">
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-[#786C5E] font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#A8794E]" />
                        <span>Ferment</span>
                      </div>
                      <p className="text-xs font-bold text-[#341C02]">
                        {displayItem.fermentationHours ? `${displayItem.fermentationHours} Hours` : '18 Hours'}
                      </p>
                    </div>
                    <div className="space-y-0.5 border-x border-[#DFD3C3]">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-[#786C5E] font-medium">
                        <Droplets className="w-3.5 h-3.5 text-[#A8794E]" />
                        <span>Hydration</span>
                      </div>
                      <p className="text-xs font-bold text-[#341C02]">
                        {displayItem.hydrationPercentage ? `${displayItem.hydrationPercentage}%` : '80%'}
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-center gap-1 text-[11px] text-[#786C5E] font-medium">
                        <Wheat className="w-3.5 h-3.5 text-[#A8794E]" />
                        <span>Flour</span>
                      </div>
                      <p className="text-xs font-bold text-[#341C02] truncate px-1">
                        {displayItem.flourType ? displayItem.flourType.split('&')[0] : 'Heritage T65'}
                      </p>
                    </div>
                  </motion.div>

                  {/* Ingredients & Allergens */}
                  <motion.div variants={childVariants} className="text-xs space-y-1.5 bg-white p-3.5 rounded-xl border border-[#EAE0D3]">
                    <p className="text-[#4A3C2F] font-semibold flex items-center gap-1">
                      <Wheat className="w-3.5 h-3.5 text-[#A8794E]" />
                      <span>Key Ingredients:</span>
                    </p>
                    <p className="text-[#6E5E4F] leading-normal">
                      {displayItem.ingredients.join(', ')}
                    </p>
                    <div className="pt-1 flex items-center gap-1 text-[11px] text-[#8C7A68]">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#C17D44]" />
                      <span>Allergens: {displayItem.allergens.join(', ')}</span>
                    </div>
                  </motion.div>

                  {/* Baker's Pairing Advice */}
                  {displayItem.pairingNotes && (
                    <motion.div variants={childVariants} className="text-xs p-3 rounded-xl bg-[#FFF9F3] border border-[#F0DFCF] text-[#7A4B29] flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#C17D44] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Baker's Pairing: </span>
                        <span>{displayItem.pairingNotes}</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Slicing Selection (if bread) */}
                  {displayItem.canBeSliced && (
                    <motion.div variants={childVariants} className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5E5244] block">
                        Bread Slicing Preference (Included)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {slicingOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedSlicing(opt)}
                            className={`p-2.5 text-xs rounded-xl font-medium text-left border transition-all ${
                              selectedSlicing === opt
                                ? 'bg-[#341C02] text-[#FAF7F2] border-[#341C02] shadow-sm'
                                : 'bg-white text-[#4A3C2F] border-[#E2D7CA] hover:border-[#C8B8A6]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Warming & Gift Options */}
                  <motion.div variants={childVariants} className="space-y-2 pt-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5E5244] block">
                      Finishing Touches
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      
                      <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E2D7CA] bg-white cursor-pointer hover:bg-[#FAF6F0] transition-colors">
                        <input
                          type="checkbox"
                          checked={warmed}
                          onChange={(e) => setWarmed(e.target.checked)}
                          className="rounded text-[#341C02] focus:ring-[#8D4B26]"
                        />
                        <span className="text-[#4A3C2F] font-medium">
                          Oven-Warmed for Immediate Pickup
                        </span>
                      </label>

                      <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E2D7CA] bg-white cursor-pointer hover:bg-[#FAF6F0] transition-colors">
                        <input
                          type="checkbox"
                          checked={giftBox}
                          onChange={(e) => setGiftBox(e.target.checked)}
                          className="rounded text-[#341C02] focus:ring-[#8D4B26]"
                        />
                        <span className="text-[#4A3C2F] font-medium flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5 text-[#8D4B26]" />
                          Linen Gift Wrap (+$2.50)
                        </span>
                      </label>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Modal Bottom: Quantity & Add Button */}
                <div className="pt-4 border-t border-[#E5DACD] space-y-3 mt-4">
                  <div className="flex items-center justify-between gap-4">
                    
                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-white border border-[#D9CEBF] rounded-xl p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1.5 hover:bg-[#F2ECE1] rounded-lg text-[#5E5244] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 font-serif font-bold text-sm text-[#341C02]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1.5 hover:bg-[#F2ECE1] rounded-lg text-[#5E5244] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add to Order Button */}
                    <button
                      id="modal-add-to-cart-btn"
                      onClick={handleAdd}
                      disabled={addedAnimation}
                      className="flex-1 bg-[#341C02] hover:bg-[#45372B] text-[#FAF7F2] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      {addedAnimation ? (
                        <>
                          <Check className="w-4 h-4 text-[#A8D5BA]" />
                          <span>Added to Basket</span>
                        </>
                      ) : (
                        <>
                          <span>Add to Order</span>
                          <span className="text-[#E8C5A0] font-serif">• ${totalPrice.toFixed(2)}</span>
                        </>
                      )}
                    </button>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
