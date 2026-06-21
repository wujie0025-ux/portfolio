"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/home/hero-section";
import {
  EducationCard,
  type EducationData,
} from "@/components/home/education-card";
import { Mail, MapPin, X, GraduationCap, ImageIcon } from "lucide-react";

const personalInfo = {
  name: "吴杰",
  tagline:
    "戏剧与影视硕士研究生。擅长标准化内容生产、数据复盘优化视觉内容，兼顾艺术质感与商业传播力。",
  email: "wujie00425@163.com",
  location: "重庆",
  avatar: "/uploads/image-1779634763477.png",
};

const education: EducationData[] = [
  {
    school: "河北传媒学院",
    degree: "硕士学位",
    major: "戏剧与影视",
    period: "2024 - 2027",
    location: "河北",
    image: "/uploads/河北传媒学院.webp",
    detail:
      "河北传媒学院戏剧与影视专业依托河北省重点学科，聚焦影视编导、表演理论、戏剧创作与影视制作等方向。研究生阶段注重理论与实践并重，培养具备独立创作能力和学术研究素养的高层次专业人才。课程涵盖影视美学、剧作理论、导演技法、数字影像制作等核心领域。",
  },
  {
    school: "重庆工程学院",
    degree: "学士学位",
    major: "数字媒体艺术",
    period: "2018 - 2023",
    location: "重庆",
    image: "/uploads/重庆工程学院.webp",
    detail:
      "重庆工程学院数字媒体艺术专业立足重庆、服务西南，培养具备数字内容创作、交互设计、视觉传达与影像制作能力的应用型人才。课程体系涵盖数字影像、UI/UX 设计、三维建模、动态图形设计、新媒体艺术等方向，强调艺术与技术融合。",
  },
];

export default function HomePage() {
  const [selectedEdu, setSelectedEdu] = useState<EducationData | null>(null);

  return (
    <>
      <HeroSection
        name={personalInfo.name}
        tagline={personalInfo.tagline}
        avatar={personalInfo.avatar}
      />

      {/* ===== 个人信息（放上面）===== */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-8">
            个人信息
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="mono-card p-5 flex items-center gap-4 group"
            >
              <span className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 flex-shrink-0">
                <Mail size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[#999] mb-0.5">邮箱</p>
                <p className="text-sm text-[#1a1a1a] truncate">
                  {personalInfo.email}
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="mono-card p-5 flex items-center gap-4 group">
              <span className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 flex-shrink-0">
                <MapPin size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[#999] mb-0.5">城市</p>
                <p className="text-sm text-[#1a1a1a]">{personalInfo.location}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 教育背景 ===== */}
      <section id="education" className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label">Education</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1a1a1a]">
            教育背景
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((edu, i) => (
            <EducationCard
              key={i}
              data={edu}
              index={i}
              onClick={() => setSelectedEdu(edu)}
            />
          ))}
        </div>
      </section>

      {/* ===== Education Detail Modal ===== */}
      <AnimatePresence>
        {selectedEdu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedEdu(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-auto"
            >
              <button
                onClick={() => setSelectedEdu(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
              >
                <X size={18} className="text-[#333]" />
              </button>

              {/* School image */}
              <div className="relative w-full aspect-[16/9] bg-[#f5f5f5] overflow-hidden">
                {selectedEdu.image ? (
                  <img
                    src={selectedEdu.image}
                    alt={selectedEdu.school}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#ccc]">
                    <ImageIcon size={40} className="mb-2" />
                    <span className="text-xs">暂无图片</span>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="w-11 h-11 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-4">
                  <GraduationCap size={20} className="text-[#1a1a1a]" />
                </div>
                <h2 className="text-xl font-semibold text-[#1a1a1a] mb-1">
                  {selectedEdu.school}
                </h2>
                <p className="text-sm text-[#666] mb-4">
                  {selectedEdu.degree} · {selectedEdu.major}
                </p>
                <div className="flex gap-4 text-xs text-[#999] mb-6 pb-6 border-b border-[#e5e5e5]">
                  <span>{selectedEdu.period}</span>
                  <span>{selectedEdu.location}</span>
                </div>
                <h3 className="text-sm font-medium text-[#1a1a1a] mb-3">
                  专业介绍
                </h3>
                <p className="text-sm text-[#666] leading-relaxed whitespace-pre-wrap">
                  {selectedEdu.detail}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
