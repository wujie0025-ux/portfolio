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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
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
      className="glow-card mono-card p-6 md:p-8 group"
    >
      {/* Top row: icon + arrow */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all duration-500">
          <GraduationCap size={19} />
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#ccc] group-hover:text-black opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 translate-x-1 group-hover:translate-x-0 transition-all duration-500"
        />
      </div>

      {/* School name */}
      <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
        {data.school}
      </h3>

      {/* Degree + Major */}
      <p className="text-sm text-[#666] mb-3">
        {data.degree} · {data.major}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-[#999]">
        <span className="inline-flex items-center gap-1">
          <Calendar size={12} />
          {data.period}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} />
          {data.location}
        </span>
      </div>

      {/* "点击查看详情" hint */}
      <p className="mt-5 text-xs text-[#bbb] group-hover:text-[#666] transition-colors duration-300">
        点击查看详情 →
      </p>
    </motion.div>
  );
}
