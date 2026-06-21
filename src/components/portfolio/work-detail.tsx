"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategoryLabel } from "@/lib/utils";

interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  videoUrl?: string | null;
  createdAt: string;
}

interface WorkDetailProps {
  work: Work;
  onClose: () => void;
}

export function WorkDetail({ work, onClose }: WorkDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const allImages = work.images.length > 0 ? work.images : [];
  const images = allImages.filter((url) => !url.endsWith(".pdf"));

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const prev = () =>
    setCurrentImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setCurrentImage((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Image gallery */}
          {images.length > 0 && (
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={images[currentImage]}
                alt={work.title}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} className="text-[#1a1a1a]" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} className="text-[#1a1a1a]" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === currentImage
                            ? "bg-white w-4"
                            : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-[#666] bg-[#f5f5f5] px-2.5 py-1 rounded-full">
                {getCategoryLabel(work.category)}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#999]">
                <Calendar size={12} />
                {new Date(work.createdAt).toLocaleDateString("zh-CN")}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              {work.title}
            </h2>
            <p className="text-sm text-[#666] leading-relaxed whitespace-pre-wrap">
              {work.description}
            </p>

            {/* PDF files */}
            {work.images.filter((url) => url.endsWith(".pdf")).length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[#1a1a1a] mb-3">
                  PDF 文件
                </h3>
                <div className="space-y-2">
                  {work.images
                    .filter((url) => url.endsWith(".pdf"))
                    .map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#f5f5f5] hover:bg-[#eee] transition-colors group"
                      >
                        <FileText size={20} className="text-[#888] group-hover:text-[#1a1a1a] transition-colors" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#1a1a1a] truncate">
                            PDF 文件 {i + 1}
                          </p>
                          <p className="text-xs text-[#999]">点击查看</p>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            )}

            {work.videoUrl && (
              <>
                {work.videoUrl.startsWith("/api/media/") ? (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-[#1a1a1a] mb-3">
                      作品视频
                    </h3>
                    <video
                      src={work.videoUrl}
                      controls
                      className="w-full rounded-xl overflow-hidden bg-black"
                      style={{ maxHeight: "480px" }}
                      preload="metadata"
                    >
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                ) : (
                  <a
                    href={work.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 text-sm text-[#1a1a1a] hover:opacity-60 transition-opacity underline underline-offset-4"
                  >
                    查看视频 →
                  </a>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
