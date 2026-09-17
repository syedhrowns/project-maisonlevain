import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BakeryItem, CustomBoxItem } from '../types';
import { BAKERY_PRODUCTS } from '../data/products';
import { X, Sparkles, Plus, Minus, Gift, Check, Trash2 } from 'lucide-react';

interface CustomBoxBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBoxToCart: (box: CustomBoxItem) => void;
}

export const CustomBoxBuilderModal: React.FC<CustomBoxBuilderModalProps> = ({
  isOpen,
  onClose,
  onAddBoxToCart,
}) => {

  const [boxSize, setBoxSize] = useState<4 | 6>(4);
  const [selectedItems, setSelectedItems] = useState<{ item: BakeryItem; quantity: number }[]>([]);
  const [packagingType, setPackagingType] = useState<'Artisan Eco-Kraft' | 'Heritage Ribbon Gift Box'>('Artisan Eco-Kraft');
  const [giftMessage, setGiftMessage] = useState('');
  const [added, setAdded] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Eligible pastries for box curation
  const eligiblePastries = BAKERY_PRODUCTS.filter(
    (p) => p.category === 'viennoiserie' || p.category === 'patisserie'
  );

  const currentCount = selectedItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const remainingSlots = boxSize - currentCount;

  // Pricing calculation
  const baseBoxPrice = boxSize === 4 ? 20.00 : 29.50;
  const ribbonExtra = packagingType === 'Heritage Ribbon Gift Box' ? 3.50 : 0;
  const totalPrice = baseBoxPrice + ribbonExtra;

  const handleAddItem = (pastry: BakeryItem) => {
    if (currentCount >= boxSize) return;

    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.item.id === pastry.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === pastry.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item: pastry, quantity: 1 }];
    });
  };

  const handleRemoveItem = (pastryId: string) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.item.id === pastryId);
      if (!existing) return prev;
      if (existing.quantity === 1) {
        return prev.filter((i) => i.item.id !== pastryId);
      }
      return prev.map((i) =>
        i.item.id === pastryId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const handleAddBox = () => {
    if (currentCount !== boxSize) return;

    const newBox: CustomBoxItem = {
      boxId: `box-${Date.now()}`,
      name: boxSize === 4 ? 'The Morning Quartet Box (4 Pastries)' : 'The Grand Salon Box (6 Pastries)',
      size: boxSize,
      packagingType,
      giftMessage: giftMessage.trim() || undefined,
      items: [...selectedItems],
      price: totalPrice,
    };

    onAddBoxToCart(newBox);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            id="custom-box-builder-modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#341C02] text-[#FAF7F2] relative rounded-t-3xl">
          <button
            id="close-box-builder-modal"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#E8C5A0] text-xs uppercase font-bold tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-[#E27D60]" />
            <span>Artisanal Patisserie Curation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Build Your Handcrafted Pastry Box
          </h2>
          
          <p className="text-sm text-[#D8C7B5] mt-1 max-w-lg">
            Select your favorite freshly laminated viennoiseries and French patisseries. Hand-packed in our signature bakery box.
          </p>
        </div>

        <div ref={scrollRef} className="grid grid-cols-1 lg:grid-cols-12 max-h-[70vh] overflow-y-auto">
          
          {/* Left Column: Visual Box Slots & Configuration */}
          <div className="lg:col-span-5 p-6 sm:p-7 bg-[#F4EDE2] border-r border-[#E5DACD] space-y-6 flex flex-col justify-between">
            
            <div className="space-y-5">
              
              {/* Box Size Toggle */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5E5244] block mb-2">
                  1. Choose Box Capacity
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBoxSize(4);
                      setSelectedItems([]);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      boxSize === 4
                        ? 'bg-[#341C02] text-[#FAF7F2] border-[#341C02] shadow-sm'
                        : 'bg-white text-[#4A3C2F] border-[#E2D7CA] hover:border-[#341C02]'
                    }`}
                  >
                    <p className="text-xs font-bold font-serif text-base">The Quartet (4)</p>
                    <p className="text-[11px] text-[#D8C7B5] mt-0.5">$20.00 • Save 15%</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBoxSize(6);
                      setSelectedItems([]);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      boxSize === 6
                        ? 'bg-[#341C02] text-[#FAF7F2] border-[#341C02] shadow-sm'
                        : 'bg-white text-[#4A3C2F] border-[#E2D7CA] hover:border-[#341C02]'
                    }`}
                  >
                    <p className="text-xs font-bold font-serif text-base">The Grand (6)</p>
                    <p className="text-[11px] text-[#D8C7B5] mt-0.5">$29.50 • Save 20%</p>
                  </button>
                </div>
              </div>

              {/* Visual Box Container & Slots */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#5E5244] mb-2">
                  <span>2. Box Contents</span>
                  <span className={remainingSlots === 0 ? 'text-[#388E3C]' : 'text-[#8D4B26]'}>
                    {currentCount} / {boxSize} filled
                  </span>
                </div>

                <div className={`grid gap-2 ${boxSize === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {Array.from({ length: boxSize }).map((_, slotIdx) => {
                    // Flatten selected items to single slots
                    const flattened: BakeryItem[] = [];
                    selectedItems.forEach((si) => {
                      for (let k = 0; k < si.quantity; k++) {
                        flattened.push(si.item);
                      }
                    });

                    const itemInSlot = flattened[slotIdx];

                    return (
                      <div
                        key={slotIdx}
                        className={`h-24 rounded-2xl border-2 transition-all flex flex-col items-center justify-center p-2 text-center relative overflow-hidden ${
                          itemInSlot
                            ? 'bg-white border-[#C9B8A4] shadow-sm'
                            : 'border-dashed border-[#D6C5B3] bg-[#FAF7F2]/60'
                        }`}
                      >
                        {itemInSlot ? (
                          <>
                            <img
                              src={itemInSlot.imageUrl}
                              alt={itemInSlot.name}
                              className="absolute inset-0 w-full h-full object-cover opacity-20"
                            />
                            <p className="font-serif text-xs font-bold text-[#341C02]  relative z-10">
                              {itemInSlot.name}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(itemInSlot.id)}
                              className="absolute top-1 right-1 p-1 bg-[#341C02]/80 hover:bg-[#8D4B26] text-white rounded-full transition-colors z-20"
                              title="Remove"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-[#9E9080] font-medium">
                            Slot {slotIdx + 1}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Packaging Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5E5244] block">
                  3. Presentation Style
                </label>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2D7CA] bg-white cursor-pointer hover:bg-[#FAF6F0]">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="packaging"
                        checked={packagingType === 'Artisan Eco-Kraft'}
                        onChange={() => setPackagingType('Artisan Eco-Kraft')}
                        className="text-[#341C02] focus:ring-[#8D4B26]"
                      />
                      <span className="text-[#4A3C2F] font-semibold">Artisan Eco-Kraft Box</span>
                    </div>
                    <span className="text-[#786C5E]">Included</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#E2D7CA] bg-white cursor-pointer hover:bg-[#FAF6F0]">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="packaging"
                        checked={packagingType === 'Heritage Ribbon Gift Box'}
                        onChange={() => setPackagingType('Heritage Ribbon Gift Box')}
                        className="text-[#341C02] focus:ring-[#8D4B26]"
                      />
                      <span className="text-[#4A3C2F] font-semibold flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-[#8D4B26]" />
                        Heritage Linen Ribbon & Wax Seal
                      </span>
                    </div>
                    <span className="text-[#8D4B26] font-semibold">+$3.50</span>
                  </label>
                </div>
              </div>

              {/* Personalized Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5E5244] block">
                  Gift Card Message (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Happy Birthday Chloe! Enjoy morning pastries."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  maxLength={100}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D9CEBF] bg-white focus:outline-none focus:ring-1 focus:ring-[#341C02] text-[#341C02]"
                />
              </div>

            </div>

            {/* Price & Add to Cart Button */}
            <div className="pt-4 border-t border-[#DFD3C3]">
              <button
                id="add-custom-box-btn"
                onClick={handleAddBox}
                disabled={currentCount !== boxSize || added}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                  currentCount === boxSize
                    ? 'bg-[#341C02] hover:bg-[#43362A] text-[#FAF7F2] active:scale-95'
                    : 'bg-[#D9CEBF] text-[#786C5E] cursor-not-allowed'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-[#A8D5BA]" />
                    <span>Pastry Box Added to Basket!</span>
                  </>
                ) : currentCount === boxSize ? (
                  <>
                    <span>Add Box to Cart</span>
                    <span className="text-[#E8C5A0] font-serif">• ${totalPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <span>Select {remainingSlots} more {remainingSlots === 1 ? 'pastry' : 'pastries'}</span>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Available Pastries Grid */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#341C02]">
                  Select Handcrafted Pastries
                </h3>
                <p className="text-xs text-[#786C5E]">
                  Tap plus on any pastry to add to your box slots
                </p>
              </div>
              <span className="text-xs bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E5DACD] text-[#5E5244] font-semibold">
                {eligiblePastries.length} Fresh Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {eligiblePastries.map((pastry) => {
                const countInBox = selectedItems.find((i) => i.item.id === pastry.id)?.quantity || 0;
                const isFull = currentCount >= boxSize;

                return (
                  <div
                    key={pastry.id}
                    className="p-3 rounded-2xl border border-[#E5DACD] bg-white hover:border-[#CDBDA9] transition-all flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={pastry.imageUrl}
                        alt={pastry.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#341C02] truncate">
                          {pastry.name}
                        </h4>
                        <p className="text-[11px] text-[#786C5E] truncate">
                          {pastry.frenchName}
                        </p>
                        <span className="text-xs font-semibold text-[#8D4B26]">
                          ${pastry.price.toFixed(2)} single
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {countInBox > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(pastry.id)}
                            className="p-1 rounded-lg bg-[#F4EDE2] hover:bg-[#EAE0D3] text-[#5E5244] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-serif font-bold text-xs px-1 text-[#341C02]">
                            {countInBox}
                          </span>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => handleAddItem(pastry)}
                        disabled={isFull}
                        className={`p-1.5 rounded-xl transition-all ${
                          isFull
                            ? 'bg-[#F2ECE1] text-[#A89C8E] cursor-not-allowed'
                            : 'bg-[#341C02] hover:bg-[#45372B] text-[#FAF7F2] active:scale-95'
                        }`}
                        title="Add to Box"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedItems.length > 0 && (
              <div className="pt-2 flex items-center justify-between text-xs text-[#786C5E]">
                <span>Curated: {selectedItems.map((s) => `${s.quantity}x ${s.item.name}`).join(', ')}</span>
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-[#8D4B26] hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            )}

          </div>

        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
