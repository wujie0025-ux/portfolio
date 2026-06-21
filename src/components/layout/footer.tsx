export function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#999]">
          &copy; {new Date().getFullYear()} Wu Jie. All rights reserved.
        </p>
        <p className="text-xs text-[#bbb]">Simplicity is the ultimate sophistication.</p>
      </div>
    </footer>
  );
}
