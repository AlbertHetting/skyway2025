"use client";

import Image from "next/image";
import WeeklyWeather from "@/components/WeeklyWeather";

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
      <section className="grid grid-cols-2 gap-5 justify-items-center w-full max-w-4xl">
        {/* Placeholder widgets */}
        <div className="w-40 h-36 bg-white rounded-2xl p-2 flex justify-between">
          <Image src="/img/add-icon.svg" alt="add" width={50} height={50} />
          <Image src="/img/heart-icon.svg" alt="heart" width={50} height={50} />
        </div>

        <div className="w-40 h-36 bg-white rounded-2xl p-2 flex justify-between">
          <Image src="/img/add-icon.svg" alt="add" width={50} height={50} />
          <Image src="/img/heart-icon.svg" alt="heart" width={50} height={50} />
        </div>

        {/* Weekly Weather Widget - full width */}
        <div className="w-full bg-white rounded-2xl col-span-2 p-4 flex flex-col items-center">
          {/* Icons row stays at the top */}
          <div className="flex justify-between w-full mb-4">
            <Image src="/img/add-icon.svg" alt="add" width={50} height={50} />
            <Image
              src="/img/heart-icon.svg"
              alt="heart"
              width={50}
              height={50}
            />
          </div>

          {/* WeeklyWeather underneath */}
          <div className="w-full">
            <WeeklyWeather />
          </div>
        </div>

        {/* Additional placeholder widgets */}
        <div className="w-40 h-36 bg-white rounded-2xl p-2 flex justify-between">
          <Image src="/img/add-icon.svg" alt="add" width={50} height={50} />
          <Image src="/img/heart-icon.svg" alt="heart" width={50} height={50} />
        </div>

        <div className="w-40 h-36 bg-white rounded-2xl p-2 flex justify-between">
          <Image src="/img/add-icon.svg" alt="add" width={50} height={50} />
          <Image src="/img/heart-icon.svg" alt="heart" width={50} height={50} />
        </div>
      </section>
    </main>
  );
}
