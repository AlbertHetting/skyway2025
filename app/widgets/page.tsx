"use client";

import Image from "next/image";
import WeeklyWeather from "@/components/WeeklyWeather";
import Letbane from "@/components/Letbane";
import Bus from "@/components/Bus";
import Running from "@/components/Running";
import FeelsLike from "@/components/Feelslike";

export default function Widgets() {
  return (
    <main className="w-full min-h-screen bg-fixed bg-cover bg-center bg-[url('/img/bg-widgets-cloudy.svg')] flex flex-col items-center p-5">
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

        <div className="w-[80vw] text-center text-black text-sm italic mb-10">
          Vælg de widgets du gerne <br /> vil have vist på dashboardet <br />
          Hjertet placerer widget'en øverst
        </div>
      </section>

      {/* Widget Grid */}
      <section className="grid grid-cols-2 gap-5 justify-items-center w-85 max-w-4xl ">
        {/* Overlay icons */}

        {/* Letbane content */}
        <div>
          <Bus />
        </div>

        <div>
          {/* Letbane content */}
          <div>
            <Letbane />
          </div>
        </div>

        {/* WeeklyWeather underneath */}
        <div className="col-span-2">
          <WeeklyWeather />
        </div>

        <div>
          <Running />
        </div>

        <div>
          <FeelsLike />
        </div>
      </section>
    </main>
  );
}

{
  /*Gammel widget struktur */
}
{
  /* <div className="w-full h-36 bg-white rounded-2xl p-2 flex justify-between">
  <div className="flex items-start justify-between w-full z-10">
    <Image src="/img/add-icon.svg" alt="add" width={40} height={40} />
    <Image src="/img/heart-icon.svg" alt="heart" width={40} height={40} />
  </div>
</div>;
 */
}
