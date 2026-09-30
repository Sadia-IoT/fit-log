import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C2F800]">
          FitLog
        </p>

        <h1 className="mt-4 text-7xl font-black">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold">
          WORKOUT NOT FOUND
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
}