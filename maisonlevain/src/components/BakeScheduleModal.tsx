import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Clock, Thermometer, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { BAKE_SCHEDULE } from '../data/products';

interface BakeScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

export const BakeScheduleModal: React.FC<BakeScheduleModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            id="bake-schedule-modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#341C02] text-[#FAF7F2] relative overflow-hidden rounded-t-3xl">
          {/* Background image in header */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/USS_John_C._Stennis_baker.jpg/1280px-USS_John_C._Stennis_baker.jpg" alt="Oven" className="w-full h-full object-cover" />
          </div>
          <button
            id="close-schedule-modal"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 text-[#E8C5A0] text-xs uppercase font-bold tracking-widest mb-1.5">
            <Flame className="w-4 h-4 text-[#E27D60]" />
            <span>Deck Oven & Hearth Timetable</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Today's Fresh Bake Batches
          </h2>
          
          <p className="text-sm text-[#D8C7B5] mt-1.5 max-w-md">
            Our stone deck ovens run throughout the morning. Loaves are placed on oak cooling racks for 45 minutes to settle their crumb before slicing.
          </p>
        </div>

        {/* Schedule List */}
        <div ref={scrollRef} className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
          {BAKE_SCHEDULE.map((batch) => {
            const isBaking = batch.status === 'baking_now';
            const isCooling = batch.status === 'cooling';
            const isReady = batch.status === 'ready';

            return (
              <div
                key={batch.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isBaking
                    ? 'bg-[#FFF9F3] border-[#E27D60] shadow-md ring-1 ring-[#E27D60]/20'
                    : isCooling
                    ? 'bg-[#F7F3EB] border-[#D6C4B0]'
                    : isReady
                    ? 'bg-white border-[#E5DACD]'
                    : 'bg-[#FBF9F5] border-[#EFE8DD] opacity-85'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#8D4B26] uppercase tracking-wider">
                        Batch {batch.batchNumber}
                      </span>
                      <span className="text-xs text-[#9E9080]">•</span>
                      <span className="text-xs font-semibold text-[#5E5244]">
                        {batch.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#341C02]">
                      {batch.name}
                    </h3>
                    
                    <p className="text-xs italic text-[#786C5E] font-serif">
                      {batch.frenchName}
                    </p>
                  </div>

                  {/* Status Badges */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                    {isBaking && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E27D60]/15 text-[#B84E32] text-xs font-bold animate-pulse">
                        <Flame className="w-3.5 h-3.5" />
                        In Oven Deck Now
                      </span>
                    )}

                    {isCooling && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E89E3A]/15 text-[#9C6017] text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        Cooling on Racks
                      </span>
                    )}

                    {isReady && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#388E3C]/15 text-[#2E7D32] text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Fresh on Shelf
                      </span>
                    )}

                    {!isBaking && !isCooling && !isReady && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DD] text-[#786C5E] text-xs font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Scheduled
                      </span>
                    )}

                    <div className="text-[11px] text-[#786C5E] flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-[#A8794E]" />
                      <span>{batch.temperature}</span>
                    </div>
                  </div>

                </div>

                <div className="mt-3 pt-3 border-t border-[#EAE0D3] flex items-center justify-between text-xs">
                  <span className="text-[#5E5244] font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C17D44]" />
                    {batch.timeLabel}
                  </span>

                  <button
                    onClick={() => {
                      onSelectCategory(batch.category.toLowerCase());
                      onClose();
                    }}
                    className="text-[#8D4B26] hover:text-[#341C02] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Browse {batch.category}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="p-4 sm:p-6 bg-[#F3ECE1] border-t border-[#E5DACD] text-xs text-[#786C5E] flex items-center justify-between">
          <p>Loaves stay warm for ~3 hours after stone-deck discharge.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#341C02] text-[#FAF7F2] rounded-xl font-semibold hover:bg-[#43362A] transition-colors"
          >
            Close Schedule
          </button>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
