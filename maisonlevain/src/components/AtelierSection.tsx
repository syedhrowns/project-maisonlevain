import React, { useState } from 'react';
import { Calendar, Users, Award, Clock, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface Workshop {
  id: string;
  title: string;
  frenchTitle: string;
  duration: string;
  level: string;
  price: number;
  seatsTotal: number;
  seatsLeft: number;
  dates: string;
  description: string;
  highlights: string[];
  image: string;
}

const WORKSHOPS: Workshop[] = [
  {
    id: 'ws-sourdough-mastery',
    title: 'The Art of Wild Levain & 36h Proofing',
    frenchTitle: 'Maîtrise du Levain Sauvage',
    duration: '4.5 Hours',
    level: 'All Enthusiasts',
    price: 135,
    seatsTotal: 8,
    seatsLeft: 2,
    dates: 'Next Saturday • 9:00 AM - 1:30 PM',
    description: 'Learn the foundational physics of sourdough fermentation from scratch. Mix, fold, score, and bake in our authentic stone deck hearths.',
    highlights: [
      'Take home a jar of our 112-year mother levain',
      'Hand-score and bake 2 sourdough batards',
      'French linen proofing banneton & baker lame included',
      'Wine & cheese tasting at the Fournil table'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Dough.jpg/1280px-Dough.jpg',
  },
  {
    id: 'ws-viennoiserie-lamination',
    title: 'French Viennoiserie & Isigny Butter Lamination',
    frenchTitle: 'Laminage & Feuilletage AOP',
    duration: '5.0 Hours',
    level: 'Intermediate',
    price: 160,
    seatsTotal: 6,
    seatsLeft: 1,
    dates: 'Next Sunday • 8:30 AM - 1:30 PM',
    description: 'Master temperature control, 27-layer butter honeycombing, and shaping classic croissants, pain au chocolat, and kouign-amann.',
    highlights: [
      'Laminate dough using Normandy Isigny AOP butter',
      'Learn proper honeycomb crumb proofing techniques',
      'Box of 8 fresh baked viennoiseries to take home',
      'Maison Levain signature pastry apron'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Croissant-Petr_Kratochvil.jpg'
  },
  {
    id: 'ws-ancient-grains',
    title: 'Ancient Grains & Biodynamic Miche Intensive',
    frenchTitle: 'Farines Anciennes & Grandes Miches',
    duration: '6.0 Hours',
    level: 'Advanced Home Bakers',
    price: 185,
    seatsTotal: 6,
    seatsLeft: 3,
    dates: 'Selected Fridays • 10:00 AM - 4:00 PM',
    description: 'Deep dive into low-gluten grains (Einkorn, Spelt, Khorasan Kamut), high hydration handling (88%), and large format stone hearth miche baking.',
    highlights: [
      'Milling grains on stone burr tabletop mills',
      'High-hydration hand mixing without stand mixers',
      'Wood-fired oven heat management & steam technique',
      'Complete 2kg Miche de Garde loaf + flour sack'
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Home_made_sour_dough_bread.jpg/1280px-Home_made_sour_dough_bread.jpg'
  }
];

export const AtelierSection: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [bookedWorkshopId, setBookedWorkshopId] = useState<string | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail || !selectedWorkshop) return;

    setBookingConfirmed(true);
    setTimeout(() => {
      setBookedWorkshopId(selectedWorkshop.id);
      setBookingConfirmed(false);
      setSelectedWorkshop(null);
      setAttendeeName('');
      setAttendeeEmail('');
    }, 1800);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="workshops-section" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EDE2]/70 border-b border-[#E5DACD] relative overflow-hidden">
      
      {/* Ambient orb */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E8C5A0]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-[#8D4B26]">
            <Award className="w-3.5 h-3.5 text-[#C17D44]" />
            <span>Les Ateliers du Pain</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#341C02]">
            Sourdough Masterclasses & VIP Fournil Atelier
          </h2>
          <p className="text-sm sm:text-base text-[#5E5244] leading-relaxed">
            Step behind the deck ovens with Master Baker Henri Laurent. Intimate workshops limited to 6–8 students, immersing you in slow fermentation craft.
          </p>
        </motion.div>

        {/* 3 Workshop Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {WORKSHOPS.map((ws, idx) => {
            const isBooked = bookedWorkshopId === ws.id;
            return (
              <motion.div
                key={ws.id}
                className="glass-card rounded-3xl overflow-hidden border border-[#E5DACD] flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              >
                {/* Photo & Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-[#EFE8DC]">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Seats Left Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#8D4B26] shadow-sm">
                    {ws.seatsLeft} {ws.seatsLeft === 1 ? 'Seat Left' : 'Seats Left'}
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-[#E8C5A0] tracking-wider">
                      {ws.frenchTitle}
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-snug">
                      {ws.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-4">
                    
                    {/* Meta Bar */}
                    <div className="flex items-center justify-between text-xs text-[#786C5E] border-b border-[#EFE8DC] pb-3">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#A8794E]" />
                        <span>{ws.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users className="w-3.5 h-3.5 text-[#A8794E]" />
                        <span>Max {ws.seatsTotal} Students</span>
                      </div>
                      <span className="font-bold text-[#341C02] bg-[#F4EBE1] px-2 py-0.5 rounded-md text-[10px]">
                        {ws.level}
                      </span>
                    </div>

                    <p className="text-xs text-[#5E5244] leading-relaxed">
                      {ws.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A68]">
                        Workshop Inclusions:
                      </p>
                      {ws.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#4A3C2F]">
                          <Check className="w-3.5 h-3.5 text-[#82AA57] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] text-[11px] font-medium text-[#786C5E] flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#8D4B26]" />
                      <span>{ws.dates}</span>
                    </div>

                  </div>

                  {/* Footer & Reserve Button */}
                  <div className="pt-4 border-t border-[#E5DACD] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#8C7A68] block uppercase font-bold">Per Person</span>
                      <span className="font-serif text-2xl font-bold text-[#341C02]">
                        ${ws.price}
                      </span>
                    </div>

                    {isBooked ? (
                      <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#EAF5ED] text-[#2D7342] text-xs font-bold border border-[#A8D5BA]">
                        <Check className="w-4 h-4" />
                        <span>Reserved</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedWorkshop(ws)}
                        className="bg-[#341C02] hover:bg-[#45372B] text-[#FAF7F2] px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-sm"
                      >
                        <span>Reserve Seat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Reservation Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E5DACD] shadow-2xl space-y-5 relative">
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8D4B26]">
                Maison Levain Atelier Reservation
              </span>
              <h3 className="text-xl font-serif font-bold text-[#341C02]">
                {selectedWorkshop.title}
              </h3>
              <p className="text-xs text-[#786C5E]">
                {selectedWorkshop.dates} • ${selectedWorkshop.price} per student
              </p>
            </div>

            {bookingConfirmed ? (
              <div className="p-6 rounded-2xl bg-[#EAF5ED] border border-[#A8D5BA] text-center space-y-2 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#2D7342] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <p className="font-serif font-bold text-lg text-[#2D7342]">Seat Confirmed!</p>
                <p className="text-xs text-[#3E6B48]">
                  We have sent your workshop welcome dossier and preparation notes to {attendeeEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A3C2F]">
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    placeholder="e.g. Claire Dubois"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs text-[#341C02] focus:outline-none focus:ring-2 focus:ring-[#8D4B26]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#4A3C2F]">
                    Email Address (for welcome kit & syllabus)
                  </label>
                  <input
                    type="email"
                    required
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="claire@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs text-[#341C02] focus:outline-none focus:ring-2 focus:ring-[#8D4B26]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#FFF9F3] border border-[#F0DFCF] flex items-center gap-2 text-xs text-[#7A4B29]">
                  <ShieldCheck className="w-4 h-4 text-[#8D4B26] shrink-0" />
                  <span>Free cancellation up to 48 hours prior to the session.</span>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWorkshop(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#786C5E] hover:text-[#341C02] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#341C02] hover:bg-[#45372B] text-[#FAF7F2] px-6 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-md"
                  >
                    Confirm Booking (${selectedWorkshop.price})
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </motion.section>
  );
};
