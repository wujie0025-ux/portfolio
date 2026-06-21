"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "关于我" },
  { href: "/portfolio", label: "作品集" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[#e5e5e5]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-[#1a1a1a] hover:opacity-60 transition-opacity"
          >
            WU JIE
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-sm tracking-wide ${
                  pathname === item.href ? "text-[#1a1a1a]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-[#1a1a1a]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`text-2xl font-medium tracking-tight ${
                    pathname === item.href ? "text-black" : "text-[#1a1a1a]"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
