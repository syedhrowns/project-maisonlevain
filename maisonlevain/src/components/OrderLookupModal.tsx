import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderDetails, UserProfile } from '../types';
import { X, Search, ReceiptText, Clock, MapPin, CheckCircle, Lock, User, ArrowRight } from 'lucide-react';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
  onSelectOrder: (order: OrderDetails) => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder,
  currentUser,
  onOpenAuth,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // If user is signed in, default to showing their orders
  // If user is guest/not signed in, only show orders if they entered a search query (Order ID or email)
  const isSearchActive = searchTerm.trim().length >= 2;

  const visibleOrders = orders.filter((o) => {
    const term = searchTerm.trim().toLowerCase();
    if (isSearchActive) {
      return (
        o.id.toLowerCase().includes(term) ||
        o.email.toLowerCase().includes(term)
      );
    }
    // When no search term is entered:
    if (currentUser) {
      return o.email.toLowerCase() === currentUser.email.toLowerCase();
    }
    // Guest with no search: don't reveal any orders publicly
    return false;
  });

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen, searchTerm]);

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
            id="order-lookup-modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 sm:p-7 bg-[#341C02] text-[#FAF7F2] relative flex items-center justify-between rounded-t-3xl">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#E8C5A0] mb-1">
                  <ReceiptText className="w-4 h-4 text-[#E27D60]" />
                  <span>Track Bakery Order</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Order Lookup & Live Status
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              
              {/* Patron Account Status Banner */}
              {currentUser ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EFE8DC] border border-[#E2D6C7] text-xs text-[#5E5244]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#341C02] text-[#E8C5A0] flex items-center justify-center font-bold text-[10px]">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span>Viewing orders for <strong className="text-[#341C02]">{currentUser.email}</strong></span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#341C02] text-[#FAF7F2] font-semibold">
                    {currentUser.tier}
                  </span>
                </div>
              ) : null}

              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#9E9080] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Enter your Order ID (e.g. ML-123456) or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-[#E5DACD] bg-white text-[#341C02] placeholder:text-[#9E9080] focus:outline-none focus:border-[#B5A593] focus:ring-1 focus:ring-[#B5A593]/20 shadow-sm"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-xs text-[#9E9080] hover:text-[#341C02] p-1 rounded-full hover:bg-[#F5EFE6]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* List of Orders / Privacy State */}
              <div ref={scrollRef} className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {!currentUser && !isSearchActive ? (
                  /* Guest state without search: protect privacy */
                  <div className="py-8 px-6 text-center rounded-2xl bg-white border border-[#E5DACD] space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] border border-[#E8DFD5] flex items-center justify-center mx-auto text-[#8D4B26]">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif font-bold text-sm text-[#341C02]">
                        Private Order Lookup
                      </h4>
                      <p className="text-xs text-[#786C5E] max-w-sm mx-auto leading-relaxed">
                        To protect customer privacy, please enter your specific <strong>Order ID</strong> or order email above to view live baking & fulfillment status.
                      </p>
                    </div>

                    {onOpenAuth && (
                      <div className="pt-2 border-t border-[#F5EFE6]">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenAuth();
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#341C02] hover:bg-[#4A3C2F] text-xs font-semibold text-[#FAF7F2] transition-colors shadow-sm"
                        >
                          <User className="w-3.5 h-3.5 text-[#E8C5A0]" />
                          <span>Sign In to View All Your Orders</span>
                          <ArrowRight className="w-3 h-3 ml-0.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : visibleOrders.length === 0 ? (
                  <div className="py-12 text-center text-[#786C5E] space-y-2 rounded-2xl bg-white border border-[#E5DACD]">
                    <ReceiptText className="w-8 h-8 text-[#A89C8E] mx-auto" />
                    <p className="text-xs font-semibold text-[#341C02]">No matching orders found.</p>
                    <p className="text-[11px] text-[#786C5E]">
                      {isSearchActive
                        ? `Please verify your Order ID or email and try again.`
                        : `You haven't placed any orders with this account yet.`}
                    </p>
                  </div>
                ) : (
                  visibleOrders.map((ord) => (
                    <div
                      key={ord.id}
                      onClick={() => {
                        onSelectOrder(ord);
                        onClose();
                      }}
                      className="p-4 rounded-2xl bg-white border border-[#E5DACD] hover:border-[#8D4B26] transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#8D4B26]">
                            {ord.id}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFE8DC] text-[#4A3C2F] font-semibold">
                            {ord.fulfillmentType === 'pickup' ? 'Counter Pickup' : 'Courier Delivery'}
                          </span>
                        </div>

                        <p className="font-serif font-bold text-sm text-[#341C02]">
                          {ord.customerName} • ${ord.total.toFixed(2)}
                        </p>

                        <p className="text-[11px] text-[#786C5E] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#A8794E]" />
                          <span>{ord.scheduledTime}</span>
                        </p>
                      </div>

                      <button className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] group-hover:bg-[#341C02] group-hover:text-[#FAF7F2] text-xs font-semibold text-[#341C02] transition-colors shrink-0">
                        View Receipt
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
