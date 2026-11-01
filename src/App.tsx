/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Check,
  ChevronUp,
  ArrowRight,
  Menu as MenuIcon,
  X,
  Star,
  Utensils,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';

const RESTAURANT_PHONE = '+91 72028 98080';
const RESTAURANT_PHONE_RAW = '917202898080';
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/x5b7ebpVL2q5ZHDp7';

interface TunnelItem {
  src: string;
  title: string;
  tag?: string;
}

const TUNNEL_IMAGES: TunnelItem[] = [
  { src: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", title: "Unlimited Gujarati Thali", tag: "Signature" },
  { src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", title: "Kathiyawadi Feast", tag: "Authentic" },
  { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", title: "Hot Gujarati Farsan", tag: "Fresh" },
  { src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80", title: "Ringan No Olo & Rotla", tag: "Desi Ghee" },
  { src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80", title: "Masala Chaas Pitcher", tag: "Refreshing" },
  { src: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", title: "Traditional Dal Kadhi", tag: "Slow Simmered" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", title: "Spacious Family Dining", tag: "Balapir, Kadi" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", title: "Saurashtra Hospitality", tag: "Atithi Devo Bhava" }
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=85", title: "Traditional Gujarati Unlimited Thali", subtitle: "Served hot in brass plates with love" },
  { src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85", title: "Authentic Kathiyawadi Flavours", subtitle: "Handcrafted masalas and desi spices" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85", title: "Family Dining Ambience", subtitle: "Comfortable air-conditioned restaurant in Kadi" },
  { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85", title: "Fresh Khaman & Farsan", subtitle: "Prepared fresh everyday before lunch & dinner" },
  { src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85", title: "Sev Tameta & Lasaniya Bataka", subtitle: "Iconic spicy Kathiyawadi vegetable curries" },
  { src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=85", title: "Chilled Cumin Masala Chaas", subtitle: "Unlimited refreshing buttermilk with roasted jeera" }
];

const REVIEWS_DATA = [
  {
    name: "Jignesh Patel",
    city: "Kadi, Gujarat",
    rating: 5,
    text: "The best Gujarati Thali in Kadi! Unlimited refills of hot phulka rotlis and Ringan No Olo. Authentic Saurashtra taste at just ₹200. Very clean and warm staff.",
    date: "1 week ago"
  },
  {
    name: "Dharmesh Shah",
    city: "Ahmedabad Visitor",
    rating: 5,
    text: "Stopped by Balapir while traveling through Kadi. What an incredible find! The sweet Gujarati Kadhi, Sev Tameta, and chilled chaas were outstanding. True homemade feel.",
    date: "2 weeks ago"
  },
  {
    name: "Pooja Prajapati",
    city: "Mehsana Highway",
    rating: 5,
    text: "Pure vegetarian perfection. Very hygienic, fast service, and the desserts are delicious. Great place to visit with large family gatherings.",
    date: "1 month ago"
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<number | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    time: 'Lunch (12:30 PM)',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // 3D Perspective Tunnel Hero Refs & State
  const tunnelHeroRef = useRef<HTMLDivElement>(null);
  const [tunnelProgress, setTunnelProgress] = useState(0);
  const [tunnelPointer, setTunnelPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 25);
      setShowScrollTop(scrollY > 400);

      // Tunnel progress computation
      if (tunnelHeroRef.current) {
        const top = tunnelHeroRef.current.offsetTop;
        const height = tunnelHeroRef.current.offsetHeight;
        const offset = scrollY - top;
        if (offset >= 0 && offset <= height + window.innerHeight) {
          const ratio = Math.min(1, Math.max(0, offset / height));
          setTunnelProgress(ratio);
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setTunnelPointer({ x: normX, y: normY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hello Gir Kathiyavadi! I would like to reserve a table / inquire:\nName: ${bookingForm.name}\nPhone: ${bookingForm.phone}\nGuests: ${bookingForm.guests}\nDate: ${bookingForm.date}\nSlot: ${bookingForm.time}\nNotes: ${bookingForm.notes || 'None'}`
    );
    window.open(`https://wa.me/${RESTAURANT_PHONE_RAW}?text=${message}`, '_blank');
    setBookingModalOpen(false);
  };

  const nextLightbox = () => {
    if (activeLightbox !== null) {
      setActiveLightbox((activeLightbox + 1) % GALLERY_IMAGES.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightbox !== null) {
      setActiveLightbox((activeLightbox - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <div className="min-h-screen text-[#2d1e16] bg-[#fdfbf7] selection:bg-[#ff9933] selection:text-[#2d1e16]">
      {/* Sticky Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#fdfbf7]/95 backdrop-blur-md shadow-md border-b border-[#2d1e16]/10 py-3'
            : 'bg-[#fdfbf7]/85 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-full bg-[#ff9933] text-[#2d1e16] font-bold text-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              GK
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1b3d2b] leading-tight">
                GIR KATHIYAVADI
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#ff9933]">
                The Taste of Saurashtra
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-[#2d1e16]/80">
            <a href="#home" className="hover:text-[#ff9933] transition-colors py-1">Home</a>
            <a href="#about" className="hover:text-[#ff9933] transition-colors py-1">About Us</a>
            <a href="#menu" className="hover:text-[#ff9933] transition-colors py-1">Our Thali</a>
            <a href="#gallery" className="hover:text-[#ff9933] transition-colors py-1">Gallery</a>
            <a href="#reviews" className="hover:text-[#ff9933] transition-colors py-1">Reviews</a>
            <a href="#contact" className="hover:text-[#ff9933] transition-colors py-1">Contact Us</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold bg-[#ff9933] text-[#2d1e16] hover:bg-[#ffa94d] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>
            <a
              href={`tel:${RESTAURANT_PHONE_RAW}`}
              className="inline-flex lg:hidden p-2.5 rounded-full border border-[#2d1e16]/15 hover:bg-black/5 text-[#1b3d2b]"
              aria-label="Call restaurant"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full border border-[#2d1e16]/15 hover:bg-black/5 lg:hidden text-[#2d1e16]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fdfbf7] border-b border-[#2d1e16]/10 px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider text-[#2d1e16]">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff9933] py-1 border-b border-[#2d1e16]/5">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff9933] py-1 border-b border-[#2d1e16]/5">About Us</a>
              <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff9933] py-1 border-b border-[#2d1e16]/5">Our Thali (₹200)</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff9933] py-1 border-b border-[#2d1e16]/5">Gallery</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff9933] py-1 border-b border-[#2d1e16]/5">Google Reviews</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ff9933] py-1">Contact Us</a>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); setBookingModalOpen(true); }}
                  className="w-full py-3 rounded-full text-center text-xs uppercase tracking-wider font-bold bg-[#ff9933] text-[#2d1e16]"
                >
                  Reserve Table / WhatsApp
                </button>
                <a
                  href={`tel:${RESTAURANT_PHONE_RAW}`}
                  className="w-full py-2.5 rounded-full text-center text-xs uppercase tracking-wider font-bold border border-[#1b3d2b] text-[#1b3d2b] flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" /> Call +91 72028 98080
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 3D Perspective Tunnel Hero Section */}
      <section
        ref={tunnelHeroRef}
        id="tunnel-hero"
        className="tunnel-section"
      >
        <div className="tunnel-bg-grid" />
        <div className="tunnel-glow" />
        <div className="tunnel-ring-1" />
        <div className="tunnel-ring-2" />

        {/* Center Text Floating in 3D */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${0.8 + tunnelProgress * 0.4})`,
            opacity: Math.max(0.1, 1 - tunnelProgress * 0.9)
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff9933]/15 border border-[#ff9933]/30 text-[#ff9933] text-[11px] font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9933]" />
            Pure Vegetarian · Balapir, Kadi
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-none tracking-tight text-[#fdfbf7] mb-3">
            INTO THE<br />
            <span className="text-[#ff9933] drop-shadow-md">KATHIYAVADI ETHER</span>
          </h1>
          <p className="text-sm sm:text-base text-[#fdfbf7]/80 max-w-lg mt-2">
            Immerse yourself in Gujarat&apos;s finest royal flavors. Scroll to journey through our authentic kitchen corridor.
          </p>
        </div>

        {/* 3D Perspective Cards Stage */}
        <div className="absolute inset-0 pointer-events-none [transform-style:preserve-3d]">
          {TUNNEL_IMAGES.map((item, idx) => {
            const total = TUNNEL_IMAGES.length;
            const goldenAngle = idx * 137.5 * (Math.PI / 180);
            const angleCos = Math.cos(goldenAngle);
            const angleSin = Math.sin(goldenAngle);
            const radiusFactorX = 0.28 + (idx % 3) * 0.08;
            const radiusFactorY = 0.26 + (idx % 2) * 0.09;
            const rotationZ = (idx % 2 === 0 ? 1 : -1) * (3 + (idx % 5) * 2);

            const staggerSpan = 0.55;
            const start = (idx / total) * (1 - staggerSpan);
            const end = start + staggerSpan;
            const localProgress = Math.min(1, Math.max(0, (tunnelProgress - start) / (end - start)));

            const farZ = -1500;
            const nearZ = 450;
            const z = farZ + localProgress * (nearZ - farZ);

            let opacity = 0;
            if (localProgress > 0 && localProgress < 1) {
              if (localProgress < 0.18) opacity = localProgress / 0.18;
              else if (localProgress > 0.82) opacity = (1 - localProgress) / 0.18;
              else opacity = 1;
            }

            const stageWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
            const stageHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
            const baseX = angleCos * (stageWidth * radiusFactorX);
            const baseY = angleSin * (stageHeight * radiusFactorY);
            const panStrength = 35;
            const offsetX = baseX - tunnelPointer.x * panStrength;
            const offsetY = baseY - tunnelPointer.y * panStrength;

            return (
              <div
                key={idx}
                className="tunnel-card"
                onClick={() => setActiveLightbox(idx % GALLERY_IMAGES.length)}
                style={{
                  width: 'clamp(160px, 20vw, 260px)',
                  opacity: opacity,
                  zIndex: idx + 1,
                  transform: `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${z}px) rotateZ(${rotationZ}deg)`
                }}
              >
                <div className="tunnel-card-inner group">
                  <img src={item.src} alt={item.title} draggable={false} />
                  <div className="tunnel-card-caption flex flex-col justify-end">
                    {item.tag && (
                      <span className="text-[9px] uppercase tracking-wider text-[#ff9933] font-bold">
                        {item.tag}
                      </span>
                    )}
                    <span className="text-sm font-serif font-bold text-white leading-tight">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prompt Indicator */}
        <div className="tunnel-prompt">
          <span>Scroll to Explore Corridor</span>
          <div className="tunnel-prompt-line" />
        </div>
      </section>

      {/* Main Hero Showcase Section */}
      <section id="home" className="relative min-h-[90vh] bg-[#2d1e16] text-[#fdfbf7] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1920&q=85"
          alt="Traditional Gujarati Thali spread on brass platter"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 animate-[heroZoom_24s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1e16] via-[#2d1e16]/70 to-[#1b3d2b]/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-28 sm:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[#ff9933] font-semibold text-xs tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-[#ff9933]" />
              Authentic Saurashtra Dining · Balapir, Kadi
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal leading-[1.08] text-[#fdfbf7] tracking-tight">
              Experience the Authentic <br />
              <span className="text-[#ff9933] italic">Gujarati Thali</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#fdfbf7]/80 max-w-2xl leading-relaxed">
              Traditional Gujarati flavours, freshly prepared with love in our pure vegetarian kitchen — featuring our signature unlimited thali at exactly ₹200.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide bg-[#ff9933] text-[#2d1e16] hover:bg-[#ffa94d] shadow-lg shadow-[#ff9933]/25 hover:-translate-y-1 transition-all duration-200"
              >
                <span>Explore Our Thali</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm tracking-wide bg-[#fdfbf7]/10 border border-[#fdfbf7]/30 text-[#fdfbf7] hover:bg-[#fdfbf7]/20 hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm"
              >
                <Calendar className="w-4 h-4 text-[#ff9933]" />
                <span>Book Table / Contact</span>
              </button>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#fdfbf7]/70 hover:text-[#ff9933] underline underline-offset-4 ml-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#ff9933]" />
                <span>Hanumant Plaza, Balapir</span>
              </a>
            </div>

            {/* Hero Quick Info Cards */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl border border-white/15 overflow-hidden backdrop-blur-md max-w-xl">
              <div className="p-4 sm:p-5 bg-[#2d1e16]/60">
                <span className="block text-[10px] uppercase tracking-widest text-white/60">Signature Deal</span>
                <strong className="block mt-1 text-lg sm:text-xl font-serif text-[#ff9933]">Unlimited ₹200</strong>
              </div>
              <div className="p-4 sm:p-5 bg-[#2d1e16]/60">
                <span className="block text-[10px] uppercase tracking-widest text-white/60">Open Daily</span>
                <strong className="block mt-1 text-lg sm:text-xl font-serif text-white">Lunch &amp; Dinner</strong>
              </div>
              <div className="p-4 sm:p-5 bg-[#2d1e16]/60 col-span-2 sm:col-span-1 border-t sm:border-t-0 border-white/10">
                <span className="block text-[10px] uppercase tracking-widest text-white/60">Kitchen</span>
                <strong className="block mt-1 text-lg sm:text-xl font-serif text-emerald-400">100% Pure Veg</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-widest text-white/60 flex flex-col items-center gap-1 animate-bounce">
          <span>Scroll Down</span>
          <ChevronUp className="w-4 h-4 rotate-180 text-[#ff9933]" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual with Badge */}
            <div className="relative group">
              <div className="overflow-hidden rounded-3xl shadow-2xl border border-[#2d1e16]/10 aspect-[4/3] sm:aspect-[5/4]">
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80"
                  alt="Authentic Gujarati Thali Spread at Gir Kathiyavadi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Floating Thali Composition Badge */}
              <div className="absolute -bottom-6 right-4 sm:right-8 bg-[#fdfbf7] p-5 sm:p-6 rounded-2xl shadow-xl border border-[#2d1e16]/10 max-w-xs transition-transform duration-300 group-hover:-translate-y-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#1b3d2b]">
                    The Unlimited Thali
                  </span>
                </div>
                <p className="font-serif text-base text-[#2d1e16] font-semibold leading-snug">
                  Sabzi, dal, sweet kadhi, rice, hot rotla/rotli, papad &amp; fresh chaas
                </p>
                <div className="mt-2 text-xs font-bold text-[#ff9933]">Refilled as much as you wish</div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-[#1b3d2b] font-semibold text-xs tracking-widest uppercase">
                <span className="w-7 h-px bg-[#1b3d2b]" />
                About Gir Kathiyavadi
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#2d1e16] leading-tight">
                A Gujarati table, kept warm for generations
              </h2>
              <p className="text-base text-[#726258] leading-relaxed">
                At <strong className="text-[#2d1e16]">Gir Kathiyavadi</strong>, we serve our signature Gujarati Thali — robust, honest and full of rich Saurashtrian character. Our kitchen grinds its own masalas, roasts its own jeera, and slow-cooks the dal and kadhi with the exact balance of sweetness, spice, and warmth.
              </p>
              <p className="text-base text-[#726258] leading-relaxed">
                The thali is a complete experience: seasonal kathiyawadi sabzis, fragrant dal, sweet Gujarati kadhi, steamed basmati rice or vagharili khichdi, hot rotla with white butter or ghee-smeared rotlis, crunchy papad, homemade pickles, and an ice-cold brass glass of spiced buttermilk (chaas).
              </p>
              <p className="text-base text-[#726258] leading-relaxed">
                We are a 100% pure vegetarian, family-friendly destination in Balapir, Kadi — known across the region for immaculate cleanliness, attentive service, and heartfelt Gujarati hospitality.
              </p>

              {/* Checkmarks */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <li className="flex items-start gap-2.5 text-sm font-medium text-[#2d1e16]">
                  <div className="p-1 rounded-full bg-emerald-100 text-[#1b3d2b] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Fresh vegetables slow-cooked in desi style</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-medium text-[#2d1e16]">
                  <div className="p-1 rounded-full bg-emerald-100 text-[#1b3d2b] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Strictly pure vegetarian kitchen</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-medium text-[#2d1e16]">
                  <div className="p-1 rounded-full bg-emerald-100 text-[#1b3d2b] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Unlimited refills on every thali course</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm font-medium text-[#2d1e16]">
                  <div className="p-1 rounded-full bg-emerald-100 text-[#1b3d2b] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Authentic Gujarati hospitality &amp; comfort</span>
                </li>
              </ul>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#menu"
                  className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#1b3d2b] text-[#fdfbf7] hover:bg-[#163122] shadow-md hover:-translate-y-0.5 transition-all"
                >
                  See Gujarati Thali Menu
                </a>
                <a
                  href="#contact"
                  className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider border border-[#2d1e16]/25 text-[#2d1e16] hover:bg-black/5 hover:-translate-y-0.5 transition-all"
                >
                  Find Us in Kadi
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Guests Come Back / Features Section */}
      <section className="py-24 bg-[#1b3d2b] text-[#fdfbf7] bandhani-pattern relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#ff9933] font-semibold text-xs tracking-widest uppercase mb-3 justify-center">
              <span className="w-6 h-px bg-[#ff9933]" />
              Why Guests Come Back
              <span className="w-6 h-px bg-[#ff9933]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal">
              The little things that make our Thali memorable
            </h2>
            <p className="mt-4 text-[#fdfbf7]/75 text-sm sm:text-base leading-relaxed">
              Everything we do starts with a simple principle: cook the food you would proudly serve to your own revered family and guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#163122]/90 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:bg-[#163122] transition-all duration-300 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ff9933]/15 text-[#ff9933] flex items-center justify-center mb-6">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-white font-normal mb-3">Authentic Taste</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Traditional masalas dry-roasted and ground in our own kitchen. Zero artificial food colors, no artificial preservatives — just pure, time-honored Saurashtra recipes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-[#ff9933] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Desi Ghee &amp; Cold-Pressed Oils
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#163122]/90 border border-[#ff9933]/30 rounded-3xl p-8 hover:-translate-y-2 hover:bg-[#163122] transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#ff9933] text-[#2d1e16] font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Most Loved
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ff9933]/15 text-[#ff9933] flex items-center justify-center mb-6 font-serif text-2xl font-bold">
                  ∞
                </div>
                <h3 className="font-serif text-2xl text-white font-normal mb-3">Unlimited Thali</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Eat to your heart&apos;s delight. Rotli, hot bajra rotla, 3 savory sabzis, sweet kadhi, dal, rice, and cooling masala chaas are refilled generously with warm smiles.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-[#ff9933] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Eat Until You Are Fully Satisfied
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#163122]/90 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:bg-[#163122] transition-all duration-300 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ff9933]/15 text-[#ff9933] flex items-center justify-center mb-6 font-serif text-2xl font-bold">
                  ₹
                </div>
                <h3 className="font-serif text-2xl text-white font-normal mb-3">Honest Pricing</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Grand Gujarati dining at exactly ₹200. No hidden charges or compromises. Generous portions that honor your hard-earned budget every single day.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-[#ff9933] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Best Value Dining in Kadi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Gujarati Thali Menu Section */}
      <section id="menu" className="py-24 sm:py-32 bg-[#f6efe4] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#1b3d2b] font-semibold text-xs tracking-widest uppercase mb-3 justify-center">
              <span className="w-6 h-px bg-[#1b3d2b]" />
              Our Culinary Specialty
              <span className="w-6 h-px bg-[#1b3d2b]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#2d1e16]">
              Signature Gujarati Thali
            </h2>
            <p className="mt-4 text-[#726258] text-sm sm:text-base leading-relaxed">
              Our exclusive everyday specialty, cooked fresh twice daily for lunch and dinner.
            </p>
          </div>

          {/* Highlight Dish Card & Breakdown */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-[#2d1e16]/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Image side */}
              <div className="md:col-span-5 relative min-h-[300px] md:min-h-full">
                <img
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=85"
                  alt="Gujarati Thali at Gir Kathiyavadi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#ff9933] text-[#2d1e16] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                  Unlimited Feast
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-2xl p-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#ff9933] font-semibold block">Fixed Price</span>
                  <div className="text-3xl font-serif font-bold text-white">₹200 <span className="text-xs font-normal text-white/80">/ Person (Unlimited)</span></div>
                </div>
              </div>

              {/* Menu Details & Items Breakdown */}
              <div className="md:col-span-7 p-6 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#1b3d2b]">Gujarati Unlimited Thali</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Pure Veg
                    </span>
                  </div>
                  <p className="text-sm text-[#726258] leading-relaxed mb-6">
                    A grand Saurashtra spread presented in authentic brass tableware. Every dish is cooked in small batches to preserve its natural aroma and piping hot taste.
                  </p>

                  {/* Included Items Grid */}
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#2d1e16] mb-3 pb-1 border-b border-[#2d1e16]/10">
                    What is Included in Your Thali:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#2d1e16] mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>3 Sabzis:</strong> Kathiyawadi, Gujarati &amp; Green</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>Breads:</strong> Phulka Rotli &amp; Bajra No Rotlo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>Dal &amp; Kadhi:</strong> Sweet Gujarati style</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>Rice:</strong> Basmati Rice / Vagharili Khichdi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>Farsan:</strong> Hot Khaman / Dhokla / Samosa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>Sweet (Mithai):</strong> Daily specialty sweet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>Chaas:</strong> Chilled Jeera Masala Buttermilk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                      <span><strong>Sides:</strong> Roasted Papad, Garlic Chutney, Pickle</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2d1e16]/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-[#726258] block">Timing: 11 AM - 3 PM &amp; 7 PM - 11 PM</span>
                    <span className="text-xs font-semibold text-emerald-800">Fresh Refills As Requested</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBookingModalOpen(true)}
                      className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ff9933] text-[#2d1e16] hover:bg-[#ffa94d] shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      Book Table
                    </button>
                    <a
                      href={`https://wa.me/${RESTAURANT_PHONE_RAW}?text=${encodeURIComponent('Hello Gir Kathiyavadi, I would like to order / visit for Gujarati Thali.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border border-[#1b3d2b]/20 text-[#1b3d2b] hover:bg-[#1b3d2b]/5"
                      aria-label="Order or inquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase Section */}
      <section id="gallery" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#1b3d2b] font-semibold text-xs tracking-widest uppercase mb-3 justify-center">
              <span className="w-6 h-px bg-[#1b3d2b]" />
              A Glimpse of Gir
              <span className="w-6 h-px bg-[#1b3d2b]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#2d1e16]">
              Good food. Warm tables. Happy memories.
            </h2>
            <p className="mt-4 text-[#726258] text-sm sm:text-base leading-relaxed">
              Click on any photograph to view our dishes and dining hall up close.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <figure
                key={idx}
                onClick={() => setActiveLightbox(idx)}
                className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-lg border border-[#2d1e16]/10 cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-[#ff9933] font-bold block mb-1">
                    Gir Kathiyavadi Gallery
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight">{img.title}</h3>
                  <p className="text-xs text-white/75 mt-1 line-clamp-1">{img.subtitle}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[activeLightbox].src}
              alt={GALLERY_IMAGES[activeLightbox].title}
              className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {GALLERY_IMAGES[activeLightbox].title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                {GALLERY_IMAGES[activeLightbox].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="py-24 sm:py-32 bg-[#1b3d2b] text-[#fdfbf7] bandhani-pattern relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#ff9933] font-semibold text-xs tracking-widest uppercase">
                <span className="w-6 h-px bg-[#ff9933]" />
                Guest Reviews
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal">
                Loved by families &amp; travelers in Kadi
              </h2>
              <p className="text-[#fdfbf7]/75 text-sm sm:text-base leading-relaxed">
                Read authentic feedback from regular guests, local Gujarati families, and travelers who stop by for our signature unlimited feast.
              </p>

              {/* Rating summary */}
              <div className="bg-[#163122] border border-white/10 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-white/70">Highest rated Gujarati Thali in Kadi</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-white">4.9 / 5</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/60 block">Google Rating</span>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ff9933] text-[#2d1e16] hover:bg-[#ffa94d] shadow-lg transition-all"
              >
                <span>Read More Google Reviews</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Right Testimonials */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-5">
              {REVIEWS_DATA.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-[#163122]/90 border border-white/10 rounded-2xl p-6 sm:p-7 shadow-lg hover:border-[#ff9933]/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ff9933]/20 text-[#ff9933] font-bold text-sm flex items-center justify-center font-serif">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{review.name}</h3>
                        <span className="text-[11px] text-white/60">{review.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-3 text-[10px] text-white/40 uppercase tracking-widest text-right">
                    {review.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-24 sm:py-32 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-[#1b3d2b] font-semibold text-xs tracking-widest uppercase mb-3 justify-center">
              <span className="w-6 h-px bg-[#1b3d2b]" />
              Visit Us in Kadi
              <span className="w-6 h-px bg-[#1b3d2b]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#2d1e16]">
              We would love to welcome you
            </h2>
            <p className="mt-4 text-[#726258] text-sm sm:text-base leading-relaxed">
              Drop by our restaurant in Balapir, Kadi or reach out directly via call or WhatsApp.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-9 border border-[#2d1e16]/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#ff9933] text-[#2d1e16] font-bold flex items-center justify-center font-serif">
                    GK
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#1b3d2b] font-bold">Gir Kathiyavadi</h3>
                    <span className="text-xs text-[#726258]">Balapir, Kadi · Pure Vegetarian</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff9933]/15 text-[#1b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-[#1b3d2b]" />
                    </div>
                    <div>
                      <small className="text-[10px] uppercase tracking-widest text-[#726258] font-bold block">
                        Restaurant Address
                      </small>
                      <p className="text-sm font-medium text-[#2d1e16] mt-0.5">
                        Hanumant Plaza, Ground Floor, Balapir, Kadi, Gujarat 384440, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff9933]/15 text-[#1b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-[#1b3d2b]" />
                    </div>
                    <div>
                      <small className="text-[10px] uppercase tracking-widest text-[#726258] font-bold block">
                        Phone &amp; WhatsApp
                      </small>
                      <p className="text-sm font-semibold text-[#1b3d2b] mt-0.5">
                        <a href={`tel:${RESTAURANT_PHONE_RAW}`} className="hover:underline">
                          {RESTAURANT_PHONE}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff9933]/15 text-[#1b3d2b] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-[#1b3d2b]" />
                    </div>
                    <div>
                      <small className="text-[10px] uppercase tracking-widest text-[#726258] font-bold block">
                        Dining Hours (All 7 Days)
                      </small>
                      <p className="text-sm font-medium text-[#2d1e16] mt-0.5">
                        <strong>Lunch:</strong> 11:00 AM – 3:00 PM<br />
                        <strong>Dinner:</strong> 7:00 PM – 11:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2d1e16]/10 flex flex-wrap gap-3">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full text-center text-xs uppercase tracking-wider font-bold bg-[#1b3d2b] text-white hover:bg-[#163122] transition-colors flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_PHONE_RAW}`}
                  className="py-3 px-6 rounded-full text-center text-xs uppercase tracking-wider font-bold border border-[#2d1e16]/25 text-[#2d1e16] hover:bg-black/5 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Quick Inquiry / Table Booking Form */}
            <div className="bg-white rounded-3xl p-8 sm:p-9 border border-[#2d1e16]/10 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl text-[#1b3d2b] font-bold mb-2">Reserve or Inquire</h3>
                <p className="text-xs text-[#726258] mb-6">
                  Planning a family dinner or large group visit? Send us your details for quick table confirmation via WhatsApp.
                </p>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                        Guests
                      </label>
                      <select
                        value={bookingForm.guests}
                        onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                      >
                        <option>1 Person</option>
                        <option>2 Guests</option>
                        <option>3 - 4 Guests</option>
                        <option>5 - 8 Guests</option>
                        <option>Family / Large Group (9+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                        Preferred Slot
                      </label>
                      <select
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                      >
                        <option>Lunch (11:30 AM)</option>
                        <option>Lunch (12:30 PM)</option>
                        <option>Lunch (1:30 PM)</option>
                        <option>Dinner (7:30 PM)</option>
                        <option>Dinner (8:30 PM)</option>
                        <option>Dinner (9:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                      Special Request (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jain food options, birthday celebration"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ff9933] text-[#2d1e16] hover:bg-[#ffa94d] shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Inquiry to Restaurant</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal (Popup) */}
      {bookingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Table Reservation Modal"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#2d1e16]/10 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#726258] hover:bg-black/5"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff9933] block">
                Gir Kathiyavadi · Kadi
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1b3d2b] mt-1">
                Table Reservation &amp; Inquiry
              </h3>
              <p className="text-xs text-[#726258] mt-1">
                Unlimited Pure Vegetarian Gujarati Thali at ₹200 / person.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 72028 98080"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                    Guests
                  </label>
                  <select
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                  >
                    <option>1 Person</option>
                    <option>2 Guests</option>
                    <option>3 - 4 Guests</option>
                    <option>5 - 8 Guests</option>
                    <option>9+ Family Gathering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                    Dining Slot
                  </label>
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                  >
                    <option>Lunch (11:30 AM)</option>
                    <option>Lunch (12:30 PM)</option>
                    <option>Lunch (1:30 PM)</option>
                    <option>Dinner (7:30 PM)</option>
                    <option>Dinner (8:30 PM)</option>
                    <option>Dinner (9:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#726258] mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  placeholder="Any preferences or questions"
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2d1e16]/15 bg-[#fdfbf7] text-sm focus:outline-none focus:border-[#ff9933]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="flex-1 py-3 rounded-full text-xs uppercase tracking-wider font-bold border border-[#2d1e16]/20 text-[#2d1e16] hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full text-xs uppercase tracking-wider font-bold bg-[#ff9933] text-[#2d1e16] hover:bg-[#ffa94d] shadow-md flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2d1e16] text-[#fdfbf7] pt-20 pb-10 border-t border-[#fdfbf7]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
            {/* Col 1: Brand */}
            <div>
              <a href="#home" className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-[#ff9933] text-[#2d1e16] font-bold text-sm flex items-center justify-center">
                  GK
                </span>
                <div>
                  <span className="font-serif text-lg font-bold text-white block leading-tight">
                    GIR KATHIYAVADI
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#ff9933]">
                    The Taste of Saurashtra
                  </span>
                </div>
              </a>
              <p className="text-xs text-[#fdfbf7]/70 leading-relaxed mb-4">
                Traditional pure vegetarian restaurant serving authentic Gujarati Thali with heartfelt Kathiyawadi hospitality in Balapir, Kadi.
              </p>
              <div className="inline-block border border-white/20 rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-400">
                Pure Vegetarian Restaurant
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h3 className="font-serif text-sm uppercase tracking-widest text-[#ff9933] font-bold mb-4">
                Quick Navigation
              </h3>
              <ul className="space-y-2.5 text-xs text-[#fdfbf7]/75">
                <li><a href="#home" className="hover:text-[#ff9933] transition-colors">Home Corridor</a></li>
                <li><a href="#about" className="hover:text-[#ff9933] transition-colors">About Our Kitchen</a></li>
                <li><a href="#menu" className="hover:text-[#ff9933] transition-colors">Unlimited Gujarati Thali (₹200)</a></li>
                <li><a href="#gallery" className="hover:text-[#ff9933] transition-colors">Photo Gallery</a></li>
                <li><a href="#reviews" className="hover:text-[#ff9933] transition-colors">Google Customer Reviews</a></li>
                <li><a href="#contact" className="hover:text-[#ff9933] transition-colors">Contact &amp; Location</a></li>
              </ul>
            </div>

            {/* Col 3: Hours */}
            <div>
              <h3 className="font-serif text-sm uppercase tracking-widest text-[#ff9933] font-bold mb-4">
                Opening Hours
              </h3>
              <ul className="space-y-2.5 text-xs text-[#fdfbf7]/75">
                <li>
                  <strong className="text-white block">Lunch Service:</strong>
                  11:00 AM – 3:00 PM
                </li>
                <li>
                  <strong className="text-white block">Dinner Service:</strong>
                  7:00 PM – 11:00 PM
                </li>
                <li className="pt-2 text-emerald-400 font-semibold">
                  Open All 7 Days a Week
                </li>
              </ul>
            </div>

            {/* Col 4: Location */}
            <div>
              <h3 className="font-serif text-sm uppercase tracking-widest text-[#ff9933] font-bold mb-4">
                Visit Restaurant
              </h3>
              <p className="text-xs text-[#fdfbf7]/75 leading-relaxed mb-3">
                Hanumant Plaza, Ground Floor, Balapir, Kadi, Gujarat 384440
              </p>
              <a
                href={`tel:${RESTAURANT_PHONE_RAW}`}
                className="text-xs font-bold text-white hover:text-[#ff9933] flex items-center gap-2 mb-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#ff9933]" />
                <span>{RESTAURANT_PHONE}</span>
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#ff9933] hover:underline flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-[#fdfbf7]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#fdfbf7]/50">
            <p>&copy; {new Date().getFullYear()} Gir Kathiyavadi Restaurant, Kadi, Gujarat. All rights reserved.</p>
            <p>Pure Vegetarian · Gujarati Thali ₹200 · Fresh Daily</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${RESTAURANT_PHONE_RAW}?text=${encodeURIComponent('Hello Gir Kathiyavadi, I would like to know more about your Gujarati Thali / Table Booking.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#1b3d2b] text-[#fdfbf7] flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#163122] transition-all duration-200"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-[#ff9933]" />
        </a>

        {/* Direct Call */}
        <a
          href={`tel:${RESTAURANT_PHONE_RAW}`}
          className="w-13 h-13 rounded-full bg-[#ff9933] text-[#2d1e16] flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#ffa94d] transition-all duration-200"
          aria-label="Call Restaurant"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-13 h-13 rounded-full bg-[#fdfbf7] text-[#2d1e16] border border-[#2d1e16]/15 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 text-[#1b3d2b]" />
          </button>
        )}
      </div>
    </div>
  );
}
