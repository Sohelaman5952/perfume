/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Droplets, Wind, Sparkles, ChevronDown, CheckCircle2, ShoppingCart } from 'lucide-react';

// --- Types ---

interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
  description: string;
  gradient: string;
}

// --- Constants ---

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "soHELL Abyss",
    price: 180,
    color: "ocean-500",
    description: "The original deep-sea immersion.",
    gradient: "from-ocean-500/40 via-ocean-800/80 to-ocean-950"
  },
  {
    id: 2,
    name: "soHELL Coral",
    price: 145,
    color: "rose-500",
    description: "Warm sunset notes over tropical reefs.",
    gradient: "from-rose-400/40 via-rose-700/80 to-slate-900"
  },
  {
    id: 3,
    name: "soHELL Mist",
    price: 120,
    color: "emerald-500",
    description: "Fresh morning fog on the northern coast.",
    gradient: "from-emerald-400/40 via-emerald-800/80 to-slate-950"
  },
  {
    id: 4,
    name: "soHELL Midnight",
    price: 195,
    color: "indigo-500",
    description: "The mysterious scent of the moonlit tide.",
    gradient: "from-indigo-500/40 via-indigo-900/80 to-black"
  }
];

// --- Components ---

const Notification = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: 20, x: "-50%" }}
        className="fixed bottom-10 left-1/2 z-[100] glass px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl border-ocean-400/30"
      >
        <CheckCircle2 className="text-ocean-400" size={20} />
        <span className="text-sm font-medium tracking-wide">{message}</span>
        <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">
          <X size={16} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = ({ cartCount, onOpenCart, onScrollTo }: { cartCount: number, onOpenCart: () => void, onScrollTo: (id: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button onClick={() => onScrollTo('hero')} className="text-2xl font-serif font-bold tracking-widest text-white">soHELL</button>
          <div className="hidden md:flex gap-6 text-sm font-light tracking-widest uppercase">
            <button onClick={() => onScrollTo('collection')} className="hover:text-ocean-400 transition-colors">Collection</button>
            <button onClick={() => onScrollTo('essence')} className="hover:text-ocean-400 transition-colors">The Story</button>
            <button onClick={() => alert('Boutique locator coming soon!')} className="hover:text-ocean-400 transition-colors">Boutiques</button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onOpenCart} className="relative hover:text-ocean-400 transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-ocean-400 text-ocean-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const ProductCard: React.FC<{ product: Product, onAddToCart: (p: Product) => void }> = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group glass p-6 rounded-[2.5rem] flex flex-col gap-6 hover:border-ocean-400/50 transition-all duration-500"
    >
      <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-ocean-950/50 flex items-center justify-center p-8">
        {/* Mini Bottle Visual */}
        <div className={`relative w-24 h-40 bg-gradient-to-br ${product.gradient} rounded-2xl border border-white/10 shadow-lg`}>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-4 bg-slate-300 rounded-sm" />
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-[8px] font-serif font-bold tracking-widest uppercase rotate-90">soHELL</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-ocean-400/0 group-hover:bg-ocean-400/10 transition-colors duration-500" />
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-serif font-bold">{product.name}</h3>
          <span className="text-ocean-400 font-bold">${product.price}</span>
        </div>
        <p className="text-sm text-slate-400 font-light leading-relaxed">
          {product.description}
        </p>
      </div>
      
      <button 
        onClick={() => onAddToCart(product)}
        className="w-full py-3 bg-white/5 hover:bg-white text-white hover:text-ocean-950 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
      >
        <ShoppingCart size={14} />
        Add to Bag
      </button>
    </motion.div>
  );
};

const BackgroundWaves = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* The Provided Image Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=1920')`,
          filter: 'brightness(0.4) contrast(1.2)'
        }}
      />
      
      {/* Animated Caustics (Light patterns underwater) */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.05) 0%, transparent 40%)
          `
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles / Bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-10"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            scale: Math.random() * 2
          }}
          animate={{
            y: ["0%", "-20%"],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Film Grain / Texture Overlay (Inspired by the collage reference) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Moving Light Rays */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <motion.div 
          className="absolute top-[-20%] left-1/4 w-32 h-[140%] bg-ocean-400/10 blur-[100px] -rotate-12"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[-20%] right-1/4 w-32 h-[140%] bg-ocean-500/10 blur-[100px] rotate-12"
          animate={{ x: [50, -50, 50] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    setNotification(`${product.name} added to your bag.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative font-sans">
      <Navbar 
        cartCount={cart.length} 
        onOpenCart={() => alert(`Cart contains ${cart.length} items. Checkout coming soon!`)} 
        onScrollTo={scrollToSection}
      />
      <BackgroundWaves />
      <Notification 
        message={notification || ""} 
        isVisible={!!notification} 
        onClose={() => setNotification(null)} 
      />

      {/* Section 1: Hero */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="z-40 mix-blend-plus-lighter"
        >
          <h1 className="text-8xl md:text-[14rem] font-serif font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-ocean-400 to-ocean-800 drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]">
            soHELL
          </h1>
          <p className="text-lg md:text-xl font-light tracking-[0.6em] uppercase text-white/90 max-w-2xl mx-auto">
            The Essence of the Abyss
          </p>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-40 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('essence')}
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* Section 2: The Essence */}
      <section id="essence" className="relative h-screen flex items-center px-6 md:px-24">
        <div className="grid md:grid-cols-2 w-full max-w-7xl mx-auto">
          <div className="flex flex-col justify-center gap-8 z-40">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6">The Essence of Fluidity</h2>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Crafted with rare marine accords, salt-crusted driftwood, and the mysterious scent of deep-sea ambergris. soHELL is not just a perfume; it's an immersion.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Droplets className="text-ocean-400" />, label: "Marine Notes" },
                { icon: <Wind className="text-ocean-400" />, label: "Fresh Breeze" },
                { icon: <Sparkles className="text-ocean-400" />, label: "Luminous" },
                { icon: <Droplets className="text-ocean-400" />, label: "Long Lasting" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 glass p-4 rounded-xl"
                >
                  {item.icon}
                  <span className="text-sm font-light uppercase tracking-wider">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="hidden md:block" /> {/* Spacer for bottle */}
        </div>
      </section>

      {/* Section 3: Collection */}
      <section id="collection" className="relative min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-6xl font-serif mb-6">The Collection</h2>
              <p className="text-slate-400 tracking-wide">
                Explore our range of abyssal fragrances, each designed to capture a different facet of the ocean's mystery. Now at accessible prices for the modern explorer.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-ocean-950 transition-all">Filter</button>
              <button className="px-6 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-ocean-950 transition-all">Sort</button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Visual Showcase */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]) }}
          className="absolute inset-0 bg-ocean-400/5 blur-3xl rounded-full scale-150"
        />
        <div className="z-10 text-center max-w-4xl px-6">
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif italic mb-8"
          >
            "A scent that lingers like the tide."
          </motion.h2>
          <div className="h-px w-24 bg-ocean-400 mx-auto" />
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="text-center z-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-20 rounded-[3rem] max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Claim Your Abyss</h2>
            <p className="text-slate-400 mb-10">
              Experience the luxury of the deep. Limited edition ocean-blue glass bottle, hand-crafted in the heart of the coast.
            </p>
            <button 
              onClick={() => scrollToSection('collection')}
              className="group relative px-10 py-4 bg-white text-ocean-950 font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:pr-14"
            >
              <span className="relative z-10">Shop the Collection</span>
              <div className="absolute inset-0 bg-ocean-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-serif font-bold tracking-widest mb-4">soHELL</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Luxury fragrances inspired by the raw power and serene beauty of the world's oceans.
            </p>
          </div>
          <div className="flex gap-12 text-sm font-light uppercase tracking-widest">
            <div className="flex flex-col gap-4">
              <span className="text-ocean-400 font-bold">Explore</span>
              <button onClick={() => scrollToSection('collection')} className="text-left hover:text-white transition-colors">Shop</button>
              <button onClick={() => scrollToSection('essence')} className="text-left hover:text-white transition-colors">About</button>
              <button onClick={() => alert('Journal coming soon!')} className="text-left hover:text-white transition-colors">Journal</button>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-ocean-400 font-bold">Legal</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Shipping</a>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center text-[10px] uppercase tracking-[0.5em] text-slate-600">
          &copy; 2026 soHELL Fragrances. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
