export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const categories = [
  {
    key: "poster",
    label: "海报设计",
    icon: "Palette",
    description: "视觉传达与平面设计作品",
  },
  {
    key: "3d-animation",
    label: "三维动画",
    icon: "Boxes",
    description: "3D建模与动画作品",
  },
  {
    key: "documentary",
    label: "纪录片",
    icon: "Film",
    description: "纪录短片与影像作品",
  },
  {
    key: "photography",
    label: "视频",
    icon: "Video",
    description: "视频影像作品",
  },
  {
    key: "ai-video",
    label: "AI视频",
    icon: "Sparkles",
    description: "AI生成视频作品",
  },
  {
    key: "project",
    label: "项目",
    icon: "FolderKanban",
    description: "综合项目作品",
  },
] as const;

export type CategoryKey = (typeof categories)[number]["key"];

export function getCategoryLabel(key: string): string {
  return categories.find((c) => c.key === key)?.label || key;
}

export function getCategoryDescription(key: string): string {
  return categories.find((c) => c.key === key)?.description || "";
}
