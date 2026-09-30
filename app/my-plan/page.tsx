"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { usePlan } from "@/components/PlanContext";

type SortBy = "duration" | "calories" | "rating";
type SortOrder = "asc" | "desc";

export default function MyPlan() {
  const {
    workouts,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const router = useRouter();
  const searchParams = useSearchParams();

 
  const [sortBy, setSortBy] = useState<SortBy>("duration");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

 const [completedWorkouts, setCompletedWorkouts] = useState<number[]>(
  () => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedCompleted =
      localStorage.getItem("completedWorkouts");

    return savedCompleted
      ? JSON.parse(savedCompleted)
      : [];
  }
);



  const activeTab =
    searchParams.get("tab") === "saved" ? "saved" : "plan";

  const currentWorkouts =
    activeTab === "plan" ? workouts : savedWorkouts;

  // Metrics
  const totalExercises = currentWorkouts.length;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + (workout.caloriesBurned ?? 0),
    0
  );

  // Sorting
  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
    let firstValue = 0;
    let secondValue = 0;

    if (sortBy === "duration") {
      firstValue = a.duration;
      secondValue = b.duration;
    }

    if (sortBy === "calories") {
      firstValue = a.caloriesBurned ?? 0;
      secondValue = b.caloriesBurned ?? 0;
    }

    if (sortBy === "rating") {
      firstValue = a.rating ?? 0;
      secondValue = b.rating ?? 0;
    }

    return sortOrder === "asc"
      ? firstValue - secondValue
      : secondValue - firstValue;
  });

  // Tab handlers
  const handlePlanTab = () => {
    if (activeTab === "plan") {
      toast.error("Today's Plan is already selected.");
      return;
    }

    router.push("/my-plan?tab=plan");
  };

  const handleSavedTab = () => {
    if (activeTab === "saved") {
      toast.error("Saved is already selected.");
      return;
    }

    router.push("/my-plan?tab=saved");
  };

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <section>
          <h1 className="text-4xl font-black tracking-tight">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* ================= METRICS ================= */}
        <section className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

          {/* Exercises */}
          <div className="rounded-lg border border-[#1E2330] bg-[#151922] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Exercises
            </p>

            <p className="mt-2 text-2xl font-bold text-[#C2F800]">
              {totalExercises}
            </p>
          </div>

          {/* Minutes */}
          <div className="rounded-lg border border-[#1E2330] bg-[#151922] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Minutes
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-lg border border-[#1E2330] bg-[#151922] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Calories
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {totalCalories}
            </p>
          </div>

        </section>

        {/* ================= TABS + SORT ================= */}
        <section className="mt-8 flex flex-col gap-4 border-b border-[#1E2330] sm:flex-row sm:items-end sm:justify-between">

          {/* Tabs */}
          <div className="flex gap-6">

            <button
              onClick={handlePlanTab}
              className={`pb-3 text-sm font-semibold transition ${
                activeTab === "plan"
                  ? "border-b-2 border-[#C2F800] text-[#C2F800]"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={handleSavedTab}
              className={`pb-3 text-sm font-semibold transition ${
                activeTab === "saved"
                  ? "border-b-2 border-[#C2F800] text-[#C2F800]"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 pb-3">

            <span className="text-xs text-slate-500">
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortBy)
              }
              className="rounded-md border border-[#1E2330] bg-[#151922] px-3 py-2 text-xs text-white outline-none"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <button
              onClick={() =>
                setSortOrder((prev) =>
                  prev === "asc" ? "desc" : "asc"
                )
              }
              className="rounded-md border border-[#1E2330] bg-[#151922] px-3 py-2 text-sm hover:bg-[#222630]"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>

          </div>

        </section>

        {/* ================= EMPTY STATE ================= */}
        {currentWorkouts.length === 0 ? (

          <section className="flex min-h-[400px] flex-col items-center justify-center text-center">

            <h2 className="text-2xl font-black">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 max-w-md text-sm text-slate-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              Go to workouts
            </Link>

          </section>

        ) : (

          /* ================= WORKOUT LIST ================= */
        

<section className="mt-6 space-y-2">

  {sortedWorkouts.map((workout) => (

    <article
      key={workout.id}
      className="rounded-lg border border-[#1E2330] bg-[#151922] px-3 py-3"
    >

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

        {/* TOP / IMAGE + INFO */}
        <div className="flex min-w-0 flex-1 items-center gap-3">

          {/* IMAGE */}
          <div className="relative h-[60px] w-[105px] shrink-0 overflow-hidden rounded-md">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              sizes="105px"
            />
          </div>

          {/* WORKOUT INFO */}
          <div className="min-w-0 flex-1">

            <h2 className="truncate text-sm font-bold text-white">
              {workout.name}
            </h2>

            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {workout.equipment ?? "No equipment"}
            </p>

            {/* STATS */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">

              <span>
                ⏱ {workout.duration} min
              </span>

              <span>
                🔥 {workout.caloriesBurned ?? 0} kcal
              </span>

              <span>
                ★ {workout.rating ?? 0}
              </span>

            </div>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
             <Link
            href={`/workouts/${workout.id}`}
            className="flex-1 rounded-md border border-[#303642] px-3 py-2 text-center text-[11px] font-semibold text-white transition hover:bg-[#222630] sm:flex-none"
          >
            View Details
          </Link>
         {activeTab === "plan" && (
  <button
    onClick={() => {
      const updatedCompleted = [
        ...completedWorkouts,
        workout.id,
      ];

      setCompletedWorkouts(updatedCompleted);

      localStorage.setItem(
        "completedWorkouts",
        JSON.stringify(updatedCompleted)
      );

      toast.success("Workout marked as done!");
    }}
    disabled={completedWorkouts.includes(workout.id)}
    className={`flex-1 rounded-md px-3 py-2 text-[11px] font-bold transition sm:flex-none ${
      completedWorkouts.includes(workout.id)
        ? "cursor-default bg-[#303642] text-slate-400"
        : "bg-[#C2F800] text-black hover:bg-lime-300"
    }`}
  >
    {completedWorkouts.includes(workout.id)
      ? "✓ Completed"
      : "✓ Mark as Done"}
  </button>
)}

          <button
            onClick={() => {
              if (activeTab === "plan") {
                removeFromPlan(workout.id);

                toast.success(
                  "Removed from today's plan"
                );
              } else {
                removeFromSaved(workout.id);

                toast.success(
                  "Removed from saved"
                );
              }
            }}
            className="px-2 py-2 text-sm text-slate-500 transition hover:text-red-400"
          >
            ✕
          </button>

        </div>

      </div>

    </article>

  ))}

</section>

        )}

      </div>
    </main>
  );
}