import Image from "next/image";
type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  difficulty: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/fitlog"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

export default async function Library() {
  const workouts = await getWorkouts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-widest text-green-500">
            THE LIBRARY
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Explore Your Workouts
          </h2>

          <p className="mt-3 max-w-2xl text-slate-300">
            Discover workouts that help you stay active, build strength, and
            achieve your fitness goals.
          </p>
        </div>

        {/* Workout cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="overflow-hidden rounded-2xl border border-[#222630] bg-[#15171D]"
            >
              {/* Image */}
              <Image 
                src={workout.image}
                alt={workout.name}
                 width={500}
                 height={300}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
                    {workout.muscleGroups[0]}
                  </span>

                  <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
                    {workout.difficulty}
                  </span>
                </div>

                {/* Workout name */}
                <h3 className="mt-4 text-xl font-bold text-white">
                  {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-2 text-sm text-slate-400">
                  {workout.equipment}
                </p>

                {/* Workout info */}
                <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                  <span>⏱ {workout.duration} min</span>

                  <span>🔥 {workout.caloriesBurned} kcal</span>

                  <span>⭐ {workout.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

