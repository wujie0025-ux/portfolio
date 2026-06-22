"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Palette,
  Boxes,
  Film,
  Video,
  Sparkles,
  FolderKanban,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Boxes,
  Film,
  Video,
  Sparkles,
  FolderKanban,
};

interface CategoryCardProps {
  label: string;
  description: string;
  href: string;
  icon: string;
  count: number;
}

export function CategoryCard({
  label,
  description,
  href,
  icon,
  count,
}: CategoryCardProps) {
  const Icon = iconMap[icon] || FolderKanban;
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => router.push(href)}
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 md:p-8 h-full group"
    >
      <div className="w-12 h-12 rounded-xl bg-[#1D1D1F]/5 flex items-center justify-center mb-5 group-hover:bg-[#1D1D1F] group-hover:text-white transition-all duration-500">
        <Icon size={23} />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1.5">
            {label}
          </h3>
          <p className="text-sm text-[#86868B] leading-relaxed">
            {description}
          </p>
          <p className="mt-4 text-[11px] text-[#86868B]/40">{count} 个作品</p>
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#86868B]/20 group-hover:text-[#1D1D1F] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 translate-x-1 group-hover:translate-x-0 transition-all duration-500 flex-shrink-0 mt-1"
        />
      </div>
    </motion.div>
  );
}
