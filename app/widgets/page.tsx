"use client";

import Image from "next/image";
import WeeklyWeather from "@/components/WeeklyWeather";
import Letbane from "@/components/Letbane";
import Bus from "@/components/Bus";
import Running from "@/components/Running";
import FeelsLike from "@/components/Feelslike";

export default function Widgets() {
  return (
    <main
      className="w-full min-h-screen bg-fixed bg-cover bg-center bg-[url('/img/bg-widgets-cloudy.svg')] flex flex-col items-center p-5"
      aria-labelledby="widgets-title"
    >
      {/* Header */}
      <section className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-5">
          <Image
            src="/img/skyway-logo-with-text.svg"
            alt="Skyway logo"
            width={200}
            height={100}
            loading="eager"
          />
        </div>

        <h1
          id="widgets-title"
          className="w-[80vw] text-center text-black text-sm italic mb-10"
        >
          Vælg de widgets du gerne vil have vist på dashboardet. Hjertet
          placerer widget'en øverst.
        </h1>
      </section>

      {/* Widget Grid */}
      <section
        className="grid grid-cols-2 gap-5 justify-items-center w-85 max-w-4xl"
        role="region"
        aria-label="Widgets til dashboard"
      >
        {/* Bus */}
        <div role="region" aria-label="Bus-widget">
          <Bus />
        </div>

        {/* Letbane */}
        <div role="region" aria-label="Letbane-widget">
          <Letbane />
        </div>

        {/* WeeklyWeather */}
        <div
          className="col-span-2"
          role="region"
          aria-label="Ugentlig vejrudsigt"
        >
          <WeeklyWeather />
        </div>

        {/* Running */}
        <div role="region" aria-label="Løbe-widget">
          <Running temperatureC={null} windSpeedMs={null} />
        </div>

        {/* FeelsLike */}
        <div role="region" aria-label="Føles-som-temperatur-widget">
          <FeelsLike temperatureC={null} windSpeedMs={null} />
        </div>
      </section>
    </main>
  );
}
