"use-client"

export default function Home() {
  return (
    <div className="flex flex-center justify-center flex-col min-h-[50vh] width-full">
      <div className="orange_gradient text font-extrabold text-[3rem] md:text-[5rem] leading-relaxed">
        Smart Fridge
      </div>
      <p className="text-lg md:text-2xl text-black/75 dark:text-white/75">Monitor your smart fridge remotely.</p>
    </div>
  );
}
