'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'ARCHIV', path: '/archiv' },
    { name: 'MANIFESTO', path: '/manifesto' },
    { name: 'BUNKR', path: '/bunkr' },
  ];

  // Zamezení scrollování pozadí při otevřeném menu na mobilu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Automatické zavření menu při změně stránek
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/90 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 backdrop-blur-md font-mono">
        <Link href="/" className="flex items-center gap-4 z-50">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full flex items-center justify-center text-black font-bold animate-pulse text-xs md:text-base">WT</div>
          <span className="text-lg md:text-xl font-bold tracking-tighter text-white">WILLY TEA</span>
        </Link>
        <nav className="hidden md:flex gap-6 md:gap-12 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "transition-colors",
                  isActive ? "text-emerald-500 underline underline-offset-8" : "hover:text-white text-zinc-400"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="hidden md:block text-[10px] text-zinc-600">
          SYS_STATE: <span className="text-emerald-900 font-bold">STABLE</span>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden z-50 text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center font-mono md:hidden"
          >
            <nav className="flex flex-col gap-10 text-center">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.path);
                return (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    className={cn(
                      "text-2xl uppercase tracking-[0.3em] font-bold transition-colors",
                      isActive ? "text-emerald-500" : "text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="absolute bottom-24 text-xs text-zinc-600">
              SYS_STATE: <span className="text-emerald-900 font-bold animate-pulse">MOBILE_OVERRIDE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
