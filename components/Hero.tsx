import Image from "next/image";
const Hero = () => {
  return (
    <section className="mt-8 rounded-3xl bg-[#15171D] px-10 py-12 md:py-16 text-white">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2">

        {/* Left */}
        <div className="max-w-xl">
          <p className="mt-4 mb-4 text-sm font-semibold tracking-[0.3em] text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h2>

          <p className="mt-6 max-w-xl text-zinc-400">
            Build stronger habits, track your workouts, and stay consistent
            with every set you complete.
          </p>

          <a
            href="#library"
            className="mt-8 inline-block rounded-full bg-[#C2F800] px-6 py-3 font-semibold text-black transition hover:bg-lime-300"
          >
            BROWSE WORKOUTS →
          </a>
        </div>

        {/* Right */}
        <div className="flex justify-center">
  <Image
    src="/banner.png"
    alt="FitLog workout"
    width={600}
    height={500}
    className="w-full max-w-md rounded-3xl object-cover"
  />
</div>

      </div>
    </section>
  );
};

export default Hero;