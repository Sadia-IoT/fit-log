const Navbar = () => {
  return (
    <nav className="border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-lime-400">
          FITLOG
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-lime-400">
            Workout
          </a>

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