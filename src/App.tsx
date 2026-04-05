/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Droplets, Wind, Sparkles, ChevronDown } from 'lucide-react';

// --- Components ---

const Navbar = () => {
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
          <a href="#" className="text-2xl font-serif font-bold tracking-widest text-white">soHELL</a>
          <div className="hidden md:flex gap-6 text-sm font-light tracking-widest uppercase">
            <a href="#" className="hover:text-ocean-400 transition-colors">Collection</a>
            <a href="#" className="hover:text-ocean-400 transition-colors">The Story</a>
            <a href="#" className="hover:text-ocean-400 transition-colors">Boutiques</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:text-ocean-400 transition-colors">
            <ShoppingBag size={20} />
          </button>
          <button className="md:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Bottle transformations
  const bottleY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ["0%", "40%", "10%", "50%"]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1.2, 2.5, 0.8, 1.5]);
  const bottleRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, -10]);
  const bottleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0.8]);

  const smoothScale = useSpring(bottleScale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(bottleY, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative font-sans">
      <Navbar />
      <BackgroundWaves />

      {/* Animated Perfume Bottle - Fixed during scroll sections */}
      <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center">
        <motion.div
          style={{
            y: smoothY,
            scale: smoothScale,
            rotate: bottleRotate,
            opacity: bottleOpacity,
          }}
          className="relative w-64 h-96 md:w-80 md:h-[30rem]"
        >
          {/* The Bottle Body */}
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/40 via-ocean-800/80 to-ocean-950 rounded-[2rem] border border-white/20 shadow-[0_0_100px_rgba(14,165,233,0.4)] overflow-hidden">
            {/* Liquid Effect */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full bg-ocean-400/30"
              animate={{ height: ["60%", "65%", "60%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Branding */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <span className="text-xs tracking-[0.5em] uppercase opacity-50 mb-2">Parfum</span>
              <h2 className="text-4xl font-serif font-bold tracking-widest text-white">soHELL</h2>
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 mt-8">Deep Ocean</span>
            </div>
            {/* Reflections */}
            <div className="absolute top-0 left-4 w-4 h-full bg-white/10 blur-sm" />
            <div className="absolute top-0 right-8 w-1 h-full bg-white/5 blur-[1px]" />
          </div>
          
          {/* Bottle Cap */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-slate-200 to-slate-400 rounded-lg shadow-lg border border-white/30" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-12 h-4 bg-slate-300 rounded-sm" />
        </motion.div>
      </div>

      {/* Section 1: Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll to explore</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* Section 2: The Essence */}
      <section className="relative h-screen flex items-center px-6 md:px-24">
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

      {/* Section 3: Visual Showcase */}
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

      {/* Section 4: Call to Action */}
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
            <button className="group relative px-10 py-4 bg-white text-ocean-950 font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:pr-14">
              <span className="relative z-10">Shop Now — $240</span>
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
              <a href="#" className="hover:text-white transition-colors">Shop</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Journal</a>
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
