"use client";

import { motion } from "framer-motion";
import { CategoryGrid } from "@/components/portfolio/category-grid";
import { useEffect, useState } from "react";

export default function PortfolioPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/works")
      .then((r) => r.json())
      .then((works: { category: string }[]) => {
        const c: Record<string, number> = {};
        works.forEach((w) => {
          c[w.category] = (c[w.category] || 0) + 1;
        });
        setCounts(c);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1a1a1a]">
          作品集
        </h1>
        <p className="mt-4 text-[#888] max-w-md mx-auto">
          精选作品，涵盖海报设计、三维动画、纪录片、摄影与综合项目
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-48 skeleton rounded-2xl" />
          ))}
        </div>
      ) : (
        <CategoryGrid counts={counts} />
      )}
    </div>
  );
}
