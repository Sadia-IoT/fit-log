import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E2330] bg-black py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="h-7 w-7"
          />

          <span className="text-lg font-bold">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-slate-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}