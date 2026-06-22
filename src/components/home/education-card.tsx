"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, ArrowUpRight } from "lucide-react";

export interface EducationData {
  school: string;
  degree: string;
  major: string;
  period: string;
  location: string;
  detail: string;
  image: string;
}

interface EducationCardProps {
  data: EducationData;
  index: number;
  onClick: () => void;
}

export function EducationCard({ data, index, onClick }: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card p-6 md:p-8"
    >
      {/* Top row: icon + arrow */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-10 h-10 rounded-full bg-[#1D1D1F]/5 flex items-center justify-center group-hover:bg-[#1D1D1F] group-hover:text-white transition-all duration-500">
          <GraduationCap size={19} />
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#86868B]/30 group-hover:text-[#1D1D1F] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 translate-x-1 group-hover:translate-x-0 transition-all duration-500"
        />
      </div>

      {/* School name */}
      <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">
        {data.school}
      </h3>

      {/* Degree + Major */}
      <p className="text-sm text-[#86868B] mb-3">
        {data.degree} · {data.major}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-[#86868B]/70">
        <span className="inline-flex items-center gap-1">
          <Calendar size={12} />
          {data.period}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} />
          {data.location}
        </span>
      </div>

      <p className="mt-5 text-[11px] text-[#86868B]/40 group-hover:text-[#86868B] transition-colors duration-300">
        点击查看详情 →
      </p>
    </motion.div>
  );
}
