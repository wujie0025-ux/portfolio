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
    if (!rect) return;
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glow-card mono-card overflow-hidden cursor-pointer group"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
        {firstImage ? (
          <>
            {!loaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={firstImage}
              alt={title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={40} className="text-[#ddd]" />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-[#1a1a1a] mb-1.5 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-[#888] line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
