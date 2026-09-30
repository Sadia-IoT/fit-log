import Image from "next/image";
import Link from "next/link";
import WorkoutActions from "@/components/workoutAction";

type Workout = {
  id: number;
  name: string;
  image: string;
  description: string;
  muscleGroups: string[];
  difficulty: string;
  equipment: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  instructions: string[];
};

async function getWorkout(id: string): Promise<Workout> {
  const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch workout");
  }

  return res.json();
}

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <main className="min-h-screen bg-black px-4 py-10">
      <div className="container mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-lime-300 hover:text-green-500"
        >
          ← Back to Library
        </Link>

        <div className="grid overflow-hidden rounded-2xl border border-[#222630] bg-[#15171D] md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-80 md:min-h-full">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-4 leading-7 text-slate-300">
              {workout.description}
            </p>

            {/* Muscle groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border bg-[#C2F800] px-3 py-1 text-xs font-semibold text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Workout information */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[#1E2330] bg-[#151922]">
              <div className="grid grid-cols-2 border-b border-[#1E2330] px-4 py-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">
                  EQUIPMENT
                </p>
                <p className="text-right text-sm text-white">
                  {workout.equipment}
                </p>
              </div>

              <div className="grid grid-cols-2 border-b border-[#1E2330] px-4 py-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">
                  DIFFICULTY
                </p>
                <p className="text-right text-sm text-white">
                  {workout.difficulty}
                </p>
              </div>

              <div className="grid grid-cols-2 border-b border-[#1E2330] px-4 py-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">
                  SETS
                </p>
                <p className="text-right text-sm text-white">{workout.sets}</p>
              </div>

              <div className="grid grid-cols-2 border-b border-[#1E2330] px-4 py-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">
                  REPS
                </p>
                <p className="text-right text-sm text-white">{workout.reps}</p>
              </div>

              <div className="grid grid-cols-2 border-b border-[#1E2330] px-4 py-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">
                  DURATION
                </p>
                <p className="text-right text-sm text-white">
                  {workout.duration} min
                </p>
              </div>

              <div className="grid grid-cols-2 border-b border-[#1E2330] px-4 py-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">
                  CALORIES
                </p>
                <p className="text-right text-sm text-white">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="grid grid-cols-2 px-4 py-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">
                  RATING
                </p>
                <p className="text-right text-sm text-yellow-400">
                  ⭐ {workout.rating}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 border-t border-[#222630] pt-6">
              <h2 className="text-xl font-bold text-white">INSTRUCTIONS</h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-slate-300"
                  >
                    <span className="font-semibold">{index + 1}.</span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

             <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}
