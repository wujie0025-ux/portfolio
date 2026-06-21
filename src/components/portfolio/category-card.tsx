"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    if (!rect) return;
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Link href={href}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="glow-card mono-card p-6 md:p-8 h-full group"
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center mb-5 group-hover:bg-black group-hover:text-white transition-all duration-500">
          <Icon size={23} />
        </div>

        {/* Text */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1.5">
              {label}
            </h3>
            <p className="text-sm text-[#888] leading-relaxed">{description}</p>
            <p className="mt-4 text-xs text-[#bbb]">{count} 个作品</p>
          </div>
          <ArrowUpRight
            size={18}
            className="text-[#ccc] group-hover:text-black opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 translate-x-1 group-hover:translate-x-0 transition-all duration-500 flex-shrink-0 mt-1"
          />
        </div>
      </motion.div>
    </Link>
  );
}
