"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

const navItems = [
  { href: "/", label: "关于我" },
  { href: "/portfolio", label: "作品集" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function handleSearch() {
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/portfolio?search=${encodeURIComponent(q)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1D1D1F]">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[-0.01em] text-white hover:opacity-60 transition-opacity shrink-0"
          >
            WU JIE
          </Link>

          {/* Desktop nav + search */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-[-0.01em] transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* Search box */}
            <div className="relative w-48">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="搜索..."
                className="w-full h-9 pl-3 pr-8 text-[13px] bg-white/15 border-none rounded-full outline-none placeholder:text-white/40 text-white transition-all focus:bg-white/20"
              />
              <button
                onClick={handleSearch}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#1D1D1F]/10 transition-colors"
              >
                <Search size={13} className="text-white/50" />
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-white"
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
            className="fixed inset-0 z-40 bg-[#FBFBFD] flex flex-col items-center justify-center gap-10"
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
                  className={`text-2xl font-medium tracking-[-0.01em] ${
                    pathname === item.href ? "text-[#1D1D1F]" : "text-white/50"
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
