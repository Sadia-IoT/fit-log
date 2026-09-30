"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlan } from "./PlanContext";

const Navbar = () => {
  const { planCount, savedCount } = usePlan();

  return (
    <nav className="border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />

          <span className="text-2xl font-bold text-white">
            FITLOG
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-[#C2F800]"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-zinc-300 hover:text-[#C2F800]"
          >
            My Plan
          </Link>
        </div>

        {/* Plan & Saved */}
        <div className="flex items-center gap-3">

          {/* Plan */}
          <Link
            href="/my-plan?tab=plan"
            className="rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
          >
            Plan {planCount}
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan?tab=saved"
            className="rounded-full border border-zinc-600 px-4 py-2 text-sm text-white transition hover:border-[#C2F800] hover:text-[#C2F800]"
          >
            Saved {savedCount}
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;