"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Workout = {
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

type PlanContextType = {
  workouts: Workout[];
  savedWorkouts: Workout[];
  planCount: number;
  savedCount: number;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = localStorage.getItem("fitlog-plan");

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  });

  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = localStorage.getItem("fitlog-saved");

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts]);

  const addToPlan = (workout: Workout) => {
    setWorkouts((prev) => {
      // Maximum 5 workouts
      if (prev.length >= 5) {
        return prev;
      }

      // Don't add duplicate workout
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: number) => {
    setWorkouts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const saveForLater = (workout: Workout) => {
    setSavedWorkouts((prev) => {
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const isInPlan = (id: number) => {
    return workouts.some((item) => item.id === id);
  };

  const isSaved = (id: number) => {
    return savedWorkouts.some((item) => item.id === id);
  };

  return (
    <PlanContext.Provider
      value={{
        workouts,
        savedWorkouts,
        planCount: workouts.length,
        savedCount: savedWorkouts.length,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}