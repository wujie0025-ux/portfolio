"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";

interface HeroSectionProps {
  name: string;
  tagline: string;
  avatar?: string;
}

export function HeroSection({ name, tagline, avatar }: HeroSectionProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-28 pb-16 md:pt-44 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Avatar — glass framed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 ring-1 ring-white/40 shadow-lg"
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#FBFBFD] flex items-center justify-center">
              <User size={44} className="text-[#86868B]" />
            </div>
          )}
        </motion.div>

        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em] text-[#1D1D1F] leading-[1.1]">
          {name}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-5 text-base md:text-lg text-[#86868B] max-w-md leading-relaxed font-medium"
        >
          {tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Link
            href="/portfolio"
            className="glass-btn-primary inline-flex items-center gap-2"
          >
            查看作品
            <ArrowRight size={15} />
          </Link>
          <a
            href="#education"
            className="glass-btn-ghost inline-flex items-center gap-2"
          >
            教育背景
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
