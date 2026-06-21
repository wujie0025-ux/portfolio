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
    <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-40 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-[#e5e5e5] overflow-hidden mb-8 bg-[#f5f5f5] flex items-center justify-center"
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={44} className="text-[#bbb]" />
          )}
        </motion.div>

        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1a1a1a] leading-tight">
          {name}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-base md:text-lg text-[#888] max-w-lg leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/portfolio"
            className="mono-btn-primary shine inline-flex items-center gap-2"
          >
            查看作品
            <ArrowRight size={15} />
          </Link>
          <a
            href="#education"
            className="mono-btn-ghost inline-flex items-center gap-2"
          >
            教育背景
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
