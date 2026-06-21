import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-[#1a1a1a] mb-4">404</h1>
        <p className="text-[#888] mb-8">页面不存在</p>
        <Link href="/" className="mono-btn-primary">
          返回首页
        </Link>
      </div>
    </div>
  );
}
