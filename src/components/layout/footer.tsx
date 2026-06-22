export function Footer() {
  return (
    <footer className="border-t border-[#1D1D1F]/5">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#86868B]">
          &copy; {new Date().getFullYear()} Wu Jie
        </p>
        <p className="text-xs text-[#86868B]/40">
          Simplicity is the ultimate sophistication
        </p>
      </div>
    </footer>
  );
}
