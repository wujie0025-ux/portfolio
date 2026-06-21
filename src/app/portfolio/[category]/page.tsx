"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WorkCard } from "@/components/portfolio/work-card";
import { WorkDetail } from "@/components/portfolio/work-detail";
import { getCategoryLabel, getCategoryDescription } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  videoUrl?: string | null;
  createdAt: string;
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Work | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/works?category=${category}`)
      .then((r) => r.json())
      .then(setWorks)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-[#1a1a1a] transition-colors"
        >
          <ArrowLeft size={16} />
          返回作品集
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1a1a1a]">
          {getCategoryLabel(category)}
        </h1>
        <p className="mt-2 text-[#888]">
          {getCategoryDescription(category)}
        </p>
      </motion.div>

      {/* Works grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/3] rounded-2xl" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : works.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-[#888] text-lg">
            暂无作品，敬请期待
          </p>
          <p className="text-[#888]/60 text-sm mt-2">
            该分类下还没有上传作品
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <WorkCard
                {...work}
                onClick={() => setSelected(work)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {selected && (
        <WorkDetail work={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
