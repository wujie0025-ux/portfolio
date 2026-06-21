import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "吴杰 - 作品集",
    template: "%s | 吴杰",
  },
  description:
    "吴杰的个人作品集 - 戏剧与影视硕士研究生，海报设计、三维动画、纪录片、摄影、项目作品展示",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
