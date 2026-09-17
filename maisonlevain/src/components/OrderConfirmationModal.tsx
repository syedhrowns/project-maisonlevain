
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderDetails } from '../types';
import { X, CheckCircle2, QrCode, Clock, MapPin, Printer, Sparkles, ChefHat, Flame } from 'lucide-react';
import { BakeryLogo } from './BakeryLogo';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const previousOrderRef = useRef<OrderDetails | null>(null);
  if (order) {
    previousOrderRef.current = order;
  }
  const displayOrder = order || previousOrderRef.current;

  const scrollRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen, order]);

  if (!displayOrder) return <AnimatePresence />;

  const handlePrint = () => {
    window.print();
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            id="displayOrder-confirmation-modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header Ribbon */}
        <div className="p-6 sm:p-8 bg-[#341C02] text-[#FAF7F2] text-center relative rounded-t-3xl">
          <button
            id="close-confirmation-modal"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-2">
            <BakeryLogo size="md" />
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-[#E8C5A0] font-bold">
            Order Confirmed & Sent to Bakery
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Merci, {displayOrder.customerName}!
          </h2>

          <p className="text-xs sm:text-sm text-[#D8C7B5] mt-1">
            Order Reference: <strong className="text-white font-mono">{displayOrder.id}</strong>
          </p>
        </div>

        {/* Content Body */}
        <div ref={scrollRef} className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Live Bakery Stage Pipeline */}
          <div className="p-4 rounded-2xl bg-[#F4EDE2] border border-[#E2D7CA] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#8D4B26] uppercase tracking-wider flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" />
                <span>Live Hearth Status</span>
              </span>
              <span className="font-semibold text-[#341C02] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                In Hearth Preparation
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center text-[10px] sm:text-xs">
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#341C02]" />
                <span className="font-semibold text-[#341C02]">1. Received</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#E27D60] animate-pulse" />
                <span className="font-semibold text-[#8D4B26]">2. Stone Hearth</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#D9CEBF]" />
                <span className="text-[#9E9080]">3. Oak Cooling</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#D9CEBF]" />
                <span className="text-[#9E9080]">4. Ready</span>
              </div>
            </div>
          </div>

          {/* Fulfillment details card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-[#E5DACD] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#8D4B26] font-bold">
                <Clock className="w-4 h-4" />
                <span>Scheduled Fulfillment Window</span>
              </div>
              <p className="font-serif font-bold text-sm text-[#341C02]">
                {displayOrder.scheduledTime}
              </p>
              <p className="text-[11px] text-[#786C5E]">
                {displayOrder.fulfillmentType === 'pickup' ? 'Counter Pickup' : 'Courier Delivery'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5DACD] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#8D4B26] font-bold">
                <MapPin className="w-4 h-4" />
                <span>{displayOrder.fulfillmentType === 'pickup' ? 'Bakery Address' : 'Delivery Address'}</span>
              </div>
              <p className="font-serif font-bold text-sm text-[#341C02]">
                {displayOrder.fulfillmentType === 'pickup'
                  ? 'Maison Levain, 42 Blvd Saint-Honoré'
                  : displayOrder.deliveryAddress}
              </p>
              <p className="text-[11px] text-[#786C5E]">
                Contact: {displayOrder.phone}
              </p>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#E5DACD]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E5244] border-b border-[#EFE8DC] pb-2">
              Itemized Bakery Receipt
            </h3>

            {/* Custom Boxes */}
            {displayOrder.customBoxes.map((box) => (
              <div key={box.boxId} className="text-xs flex justify-between py-1 border-b border-[#FAF7F2]">
                <div>
                  <p className="font-semibold text-[#341C02]">{box.name}</p>
                  <p className="text-[11px] text-[#786C5E]">{box.packagingType}</p>
                  <p className="text-[10px] text-[#9E9080]">
                    {box.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                  </p>
                </div>
                <span className="font-serif font-bold">${box.price.toFixed(2)}</span>
              </div>
            ))}

            {/* Standard Items */}
            {displayOrder.items.map((it) => (
              <div key={it.id} className="text-xs flex justify-between py-1 border-b border-[#FAF7F2]">
                <div>
                  <p className="font-semibold text-[#341C02]">
                    {it.quantity}x {it.item.name}
                  </p>
                  {it.selectedSlicing && (
                    <p className="text-[11px] text-[#786C5E]">Slicing: {it.selectedSlicing}</p>
                  )}
                  {it.warmed && (
                    <p className="text-[11px] text-[#C15C3D]">Oven-Warmed</p>
                  )}
                </div>
                <span className="font-serif font-bold">
                  ${(it.unitPrice * it.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            {/* Total breakdown */}
            <div className="pt-2 space-y-1 text-xs text-[#6B5E4F]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${displayOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${displayOrder.tax.toFixed(2)}</span>
              </div>
              {displayOrder.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span>${displayOrder.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#341C02] pt-2 border-t border-[#EFE8DC]">
                <span className="font-serif">Total Paid ({displayOrder.paymentMethod.replace('_', ' ')})</span>
                <span className="font-serif text-base">${displayOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* QR Pickup Mock Code */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DACD] flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-serif font-bold text-sm text-[#341C02]">
                Express Counter Pickup Pass
              </p>
              <p className="text-[11px] text-[#786C5E]">
                Present this digital receipt or mention displayOrder #{displayOrder.id} at the counter.
              </p>
            </div>
            <div className="w-16 h-16 bg-white p-2 rounded-xl border border-[#D9CEBF] shadow-xs flex items-center justify-center shrink-0">
              <QrCode className="w-12 h-12 text-[#341C02]" />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F3ECE1] border-t border-[#E5DACD] flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs font-semibold text-[#341C02] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#341C02] text-[#FAF7F2] rounded-xl text-xs font-semibold hover:bg-[#43362A] transition-colors shadow-sm"
          >
            Back to Bakery Menu
          </button>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
