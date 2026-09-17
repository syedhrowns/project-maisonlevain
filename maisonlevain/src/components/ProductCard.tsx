import React, { useState } from 'react';
import { BakeryItem } from '../types';
import { Plus, Flame, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  item: BakeryItem;
  onQuickAdd: (item: BakeryItem) => void;
  onSelectDetail: (item: BakeryItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onQuickAdd,
  onSelectDetail,
}) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Home_made_sour_dough_bread.jpg/1280px-Home_made_sour_dough_bread.jpg';

  return (
    <motion.div
      id={`product-card-${item.id}`}
      className="group glass-card rounded-2xl overflow-hidden border border-[#E8DFD1] hover:border-[#D0C0AC] transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Product Image Container */}
      <div 
        onClick={() => onSelectDetail(item)}
        className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#EFE8DC] cursor-pointer"
      >
        <img
          src={imgError ? fallbackImage : item.imageUrl}
          alt={item.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Gradient shadow for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-80 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {item.isOvenFresh && (
              <span className="glass-pill px-2.5 py-1 rounded-full text-[11px] font-bold text-[#96381C] bg-[#FFF2ED]/90 shadow-sm flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#E27D60]" />
                Oven Fresh
              </span>
            )}
            {item.fermentationHours && (
              <span className="glass-pill px-2.5 py-1 rounded-full text-[11px] font-medium text-[#4A3C2F] bg-white/85 shadow-sm flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#A8794E]" />
                {item.fermentationHours}h Ferment
              </span>
            )}
          </div>

          {item.isPopular && (
            <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-[#FAF7F2] bg-[#341C02]/80 backdrop-blur-sm shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E8C5A0]" />
              Signature
            </span>
          )}
        </div>

        {/* Quick View hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
          <span className="bg-[#FAF7F2] text-[#341C02] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg">
            View Craft Details & Slicing
          </span>
        </div>

        {/* Bottom Price on Image for Mobile */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none sm:hidden">
          <span className="font-serif text-lg font-bold drop-shadow">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* French Name Subtitle */}
          {item.frenchName && (
            <p className="text-xs italic text-[#8C7A68] font-serif tracking-wide mb-0.5">
              {item.frenchName}
            </p>
          )}

          {/* Item Name */}
          <h3 
            onClick={() => onSelectDetail(item)}
            className="font-serif text-lg sm:text-xl font-bold text-[#341C02] cursor-pointer hover:text-[#8D4B26] transition-colors "
          >
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#6B5E4F] mt-1.5  leading-relaxed font-normal">
            {item.description}
          </p>

          {/* Flavor Notes Pill Tags */}
          {item.flavorNotes && item.flavorNotes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {item.flavorNotes.slice(0, 2).map((note, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#F4EDE2] text-[#6E5D4C] font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Price & Action Buttons */}
        <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-[#8C7A68] block">Artisanal Bake</span>
            <span className="font-serif text-lg font-bold text-[#341C02]">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {item.canBeSliced ? (
              <button
                id={`customize-btn-${item.id}`}
                onClick={() => onSelectDetail(item)}
                className="px-3 py-1.5 text-xs font-semibold text-[#8D4B26] hover:text-[#341C02] bg-[#F7F0E6] hover:bg-[#EFE4D6] rounded-xl transition-colors"
              >
                Customize
              </button>
            ) : null}

            <button
              id={`quick-add-btn-${item.id}`}
              onClick={() => onQuickAdd(item)}
              className="p-2 sm:px-3 sm:py-1.5 bg-[#341C02] hover:bg-[#45372B] text-[#FAF7F2] rounded-xl text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 shadow-sm"
              title="Add 1 to Cart"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
