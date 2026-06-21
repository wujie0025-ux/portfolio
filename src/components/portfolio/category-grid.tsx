"use client";

import { motion } from "framer-motion";
import { CategoryCard } from "./category-card";
import { categories } from "@/lib/utils";

interface CategoryGridProps {
  counts: Record<string, number>;
}

export function CategoryGrid({ counts }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.key}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <CategoryCard
            label={cat.label}
            description={cat.description}
            href={`/portfolio/${cat.key}`}
            icon={cat.icon}
            count={counts[cat.key] || 0}
          />
        </motion.div>
      ))}
    </div>
  );
}
