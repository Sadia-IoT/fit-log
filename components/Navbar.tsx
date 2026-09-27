import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
  <Image
    src="/logo.png"
    alt="FitLog logo"
    className="h-8 w-8"
  />

  <span className="text-2xl font-bold text-white">
    FITLOG
  </span>
</div>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lime-400">
            Workout
          </Link>

          <a href="/my-plan" className="text-zinc-300 hover:text-lime-400">
            My Plan
          </a>
        </div>

        {/* Plan & Saved */}
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-black">
            Plan 0
          </span>

          <span className="rounded-full border border-zinc-600 px-4 py-2 text-sm text-white">
            Saved 0
          </span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;