import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Crown, 
  Phone, 
  Heart,
  ArrowRight,
  Flame,
  KeyRound
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Camille Laurent',
    email: 'camille.laurent@paris.fr',
    tier: 'Grand Cru Patron',
    loyaltyPoints: 420,
    phone: '+33 6 42 18 90 23',
    preferredFulfillment: 'pickup',
    deliveryAddress: '14 Rue de la Paix, 75002 Paris',
    favoriteCraft: 'Ancient Grain Sourdough & Wild Levain',
    joinedDate: 'Member since Oct 2024'
  },
  {
    id: 'usr-2',
    name: 'Jean-Luc Dubois',
    email: 'jeanluc.dubois@fournil.fr',
    tier: 'Heritage Patron',
    loyaltyPoints: 215,
    phone: '+1 (555) 492-8172',
    preferredFulfillment: 'delivery',
    deliveryAddress: '88 Boulevard Saint-Germain, Apt 4B',
    favoriteCraft: 'Laminated Viennoiserie & Cruffins',
    joinedDate: 'Member since Jan 2025'
  },
  {
    id: 'usr-3',
    name: 'Élodie Fontaine',
    email: 'elodie.fontaine@levain.com',
    tier: 'Club Member',
    loyaltyPoints: 85,
    phone: '+1 (555) 301-6784',
    preferredFulfillment: 'pickup',
    deliveryAddress: '320 Artisan Lane, Baker District',
    favoriteCraft: 'Artisanal Brioche & Canelés',
    joinedDate: 'Member since May 2025'
  }
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  // Sign In Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCraft, setSignupCraft] = useState('Heritage Sourdough');

  // Forgot password State
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  // Loading & Validation State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Check if matches demo user, or synthesize standard patron profile
      const matchedDemo = DEMO_USERS.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      
      const userToLogin: UserProfile = matchedDemo || {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
        email: email.trim(),
        tier: 'Club Member',
        loyaltyPoints: 60,
        phone: '+1 (555) 234-5678',
        preferredFulfillment: 'pickup',
        deliveryAddress: '42 Boulevard Saint-Honoré',
        favoriteCraft: 'Heritage Sourdough',
        joinedDate: 'Member since ' + new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      onLoginSuccess(userToLogin);
      onClose();
    }, 600);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setErrorMessage('Please fill in your name, email, and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: signupName.trim(),
        email: signupEmail.trim(),
        phone: signupPhone.trim() || undefined,
        tier: 'Club Member',
        loyaltyPoints: 100, // 100 bonus welcome points
        preferredFulfillment: 'pickup',
        favoriteCraft: signupCraft,
        joinedDate: 'Member since ' + new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleDemoLogin = (demoUser: UserProfile) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(demoUser);
      onClose();
    }, 400);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSubmitted(true);
  };

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (backdropRef.current) backdropRef.current.scrollTop = 0;
    }
  }, [isOpen, activeTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            id="auth-modal"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-[#341C02] text-[#FAF7F2] relative rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E8C5A0]/20 border border-[#E8C5A0]/30 flex items-center justify-center text-[#E8C5A0]">
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#E8C5A0] block">
                      Club Maison Levain
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                      {activeTab === 'signin' && 'Sign In to Your Patron Account'}
                      {activeTab === 'signup' && 'Join the Sourdough Club'}
                      {activeTab === 'forgot' && 'Reset Your Fournil Password'}
                    </h2>
                  </div>
                </div>

                <button
                  id="close-auth-modal"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors focus:outline-none"
                  title="Close login dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tab Navigation */}
              {activeTab !== 'forgot' && (
                <div className="mt-5 flex items-center p-1 bg-white/10 rounded-xl">
                  <button
                    id="tab-btn-signin"
                    onClick={() => {
                      setActiveTab('signin');
                      setErrorMessage(null);
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'signin'
                        ? 'bg-[#FAF7F2] text-[#341C02] shadow-sm'
                        : 'text-[#E5DACD] hover:text-white'
                    }`}
                  >
                    Patron Sign In
                  </button>
                  <button
                    id="tab-btn-signup"
                    onClick={() => {
                      setActiveTab('signup');
                      setErrorMessage(null);
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === 'signup'
                        ? 'bg-[#FAF7F2] text-[#341C02] shadow-sm'
                        : 'text-[#E5DACD] hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div ref={scrollRef} className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto space-y-5">
              
              {errorMessage && (
                <div className="p-3 rounded-xl bg-[#FDF2F0] border border-[#F5C2B8] text-xs text-[#96381C] font-medium flex items-center gap-2">
                  <Flame className="w-4 h-4 shrink-0 text-[#E27D60]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. SIGN IN FORM */}
              {activeTab === 'signin' && (
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[#5E5244] block mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. camille.laurent@paris.fr"
                        className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] placeholder:text-[#A09282] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-[#5E5244]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setActiveTab('forgot')}
                        className="text-[11px] font-semibold text-[#8D4B26] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-password-input"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] placeholder:text-[#A09282] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A68] hover:text-[#341C02] p-1"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#6B5E4F]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded text-[#341C02] focus:ring-0"
                      />
                      <span>Keep me signed in</span>
                    </label>
                    <span className="text-[11px] text-[#8C7A68]">Secured with 256-bit SSL</span>
                  </div>

                  <button
                    id="submit-signin-btn"
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#341C02] hover:bg-[#48392C] text-[#FAF7F2] rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Opening Fournil Session...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Maison Levain</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* 1-Click Instant Demo Login Option */}
                  <div className="pt-4 border-t border-[#EAE0D3]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A68] flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#C17D44]" />
                        <span>1-Click Test Patron Accounts</span>
                      </span>
                      <span className="text-[10px] text-[#A09282] italic">Instant sign-in</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {DEMO_USERS.map((demo) => (
                        <button
                          key={demo.id}
                          type="button"
                          id={`demo-user-btn-${demo.id}`}
                          onClick={() => handleDemoLogin(demo)}
                          disabled={isLoading}
                          className="w-full p-2.5 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#E5DACD] hover:border-[#D0C0AC] text-left transition-all flex items-center justify-between group shadow-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#341C02] text-[#E8C5A0] text-xs font-bold flex items-center justify-center shrink-0">
                              {demo.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#341C02] group-hover:text-[#8D4B26] transition-colors flex items-center gap-1.5">
                                <span>{demo.name}</span>
                                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded-md bg-[#FAF7F2] border border-[#E5DACD] text-[#786C5E]">
                                  {demo.tier}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#786C5E] ">
                                {demo.favoriteCraft} • {demo.loyaltyPoints} pts
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-[#8D4B26] group-hover:translate-x-0.5 transition-transform">
                            Select →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              )}

              {/* 2. SIGN UP FORM */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div className="p-3 rounded-2xl bg-[#F4EDE2] border border-[#E5DACD] text-xs text-[#5E5244] flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#C17D44] shrink-0" />
                    <div>
                      <strong className="text-[#341C02] block">100 Welcome Loyalty Points</strong>
                      <span>Enjoy instant member perks & 10% off your first bakery order.</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5E5244] block mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signup-name-input"
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Madeleine Vane"
                        className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] placeholder:text-[#A09282] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#5E5244] block mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="signup-email-input"
                          type="email"
                          required
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          placeholder="madeleine@example.com"
                          className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] placeholder:text-[#A09282] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#5E5244] block mb-1.5">
                        Phone (Optional)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="signup-phone-input"
                          type="tel"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          placeholder="+1 (555) 019-2834"
                          className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] placeholder:text-[#A09282] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5E5244] block mb-1.5">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signup-password-input"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] placeholder:text-[#A09282] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A68] hover:text-[#341C02] p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#5E5244] block mb-1.5 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#E27D60]" />
                      <span>Favorite Fournil Passion</span>
                    </label>
                    <select
                      id="signup-craft-select"
                      value={signupCraft}
                      onChange={(e) => setSignupCraft(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                    >
                      <option value="Heritage Sourdough">Heritage Sourdough & Ancient Grains</option>
                      <option value="French Viennoiserie">French Viennoiserie & Butter Croissants</option>
                      <option value="Fine Pâtisserie">Fine Pâtisserie & Seasonal Tarts</option>
                      <option value="Savory Provisions">Savory Bakes & Churned Butter</option>
                    </select>
                  </div>

                  <button
                    id="submit-signup-btn"
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#341C02] hover:bg-[#48392C] text-[#FAF7F2] rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Registering Club Patron...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#A8D5BA]" />
                        <span>Create Patron Account (+100 Pts)</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* 3. FORGOT PASSWORD */}
              {activeTab === 'forgot' && (
                <div className="space-y-4">
                  {resetSubmitted ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#EAF5EE] text-[#2E7D47] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#341C02]">
                        Reset Instructions Sent
                      </h3>
                      <p className="text-xs text-[#6B5E4F] max-w-sm mx-auto">
                        We have dispatched an email to <strong>{resetEmail}</strong> with instructions to reset your Maison Levain password.
                      </p>
                      <button
                        onClick={() => {
                          setResetSubmitted(false);
                          setActiveTab('signin');
                        }}
                        className="px-5 py-2 bg-[#341C02] text-[#FAF7F2] text-xs font-semibold rounded-xl hover:bg-[#48392C] transition-colors"
                      >
                        Return to Sign In
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <p className="text-xs text-[#6B5E4F] leading-relaxed">
                        Enter your account email address and we'll send a link to reset your security credentials.
                      </p>

                      <div>
                        <label className="text-xs font-semibold text-[#5E5244] block mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-[#341C02] focus:outline-none focus:ring-1 focus:ring-[#341C02]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setActiveTab('signin')}
                          className="flex-1 py-2.5 rounded-xl border border-[#D9CEBF] text-xs font-semibold text-[#5E5244] hover:bg-[#F2ECE1] transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-[#341C02] hover:bg-[#48392C] text-[#FAF7F2] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          <span>Send Reset Link</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Fournil Patron Club Perks Footer */}
              <div className="pt-4 border-t border-[#EAE0D3] grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-[#F8F4EE] border border-[#EBE3D8]">
                  <span className="text-[10px] font-bold text-[#8D4B26] block">10% OFF</span>
                  <span className="text-[9px] text-[#786C5E]">Code: BONJOUR10</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F8F4EE] border border-[#EBE3D8]">
                  <span className="text-[10px] font-bold text-[#341C02] block">Oven Alerts</span>
                  <span className="text-[9px] text-[#786C5E]">Fresh batch slots</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F8F4EE] border border-[#EBE3D8]">
                  <span className="text-[10px] font-bold text-[#341C02] block">VIP Rewards</span>
                  <span className="text-[9px] text-[#786C5E]">Free Loaf at 500 Pts</span>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
