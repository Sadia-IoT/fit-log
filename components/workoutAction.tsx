"use client";

import { usePlan } from "./PlanContext";
import { toast } from "react-toastify";

type WorkoutActionsProps = {
  workout: {
    id: number;
    name: string;
    image: string;
    difficulty: string;
    sets: number;
    reps: string;
    duration: number;
    equipment?: string;
    caloriesBurned?: number;
    rating?: number;
  };
};

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    addToPlan,
    isInPlan,
    saveForLater,
    isSaved,
  } = usePlan();

  const added = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {/* Add to Plan */}
      <button
       onClick={() => {
  addToPlan(workout);
  toast.success("Added to today's plan");
}}
        disabled={added}
        className="rounded-lg bg-[#C2F800] px-5 py-3 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {added
          ? "Added to today's plan ✓"
          : "Add to today's plan"}
      </button>

      {/* Save for Later */}
      <button
        onClick={() => {
  saveForLater(workout);
  toast.success("Saved for later");
}}
        disabled={saved}
        className="rounded-lg border border-[#222630] px-5 py-3 font-semibold text-white transition hover:bg-[#222630] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {saved ? "Saved ✓" : "Save for later"}
      </button>
    </div>
  );
}