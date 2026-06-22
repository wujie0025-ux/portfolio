"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

interface WorkCardProps {
  title: string;
  description: string;
  images: string[];
  category: string;
  onClick: () => void;
}

export function WorkCard({
  title,
  description,
  images,
  onClick,
}: WorkCardProps) {
  const [loaded, setLoaded] = useState(false);
  const firstImage = images.find((url) => !url.endsWith(".pdf")) || null;
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
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card overflow-hidden !p-0"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#FBFBFD] overflow-hidden rounded-t-[20px]">
        {firstImage ? (
          <>
            {!loaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={firstImage}
              alt={title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={40} className="text-[#86868B]/20" />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-[#1D1D1F] mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-[13px] text-[#86868B] line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
