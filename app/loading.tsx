export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-black">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#1E2330] border-t-[#C2F800]" />

        <p className="mt-4 text-sm font-medium text-slate-400">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}