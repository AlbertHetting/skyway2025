"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// --- Types ---
type Tram = {
  minutes: number;
};

type BusStation = {
  station: string;
  line: string;
  destination: string;
  image?: string;
  nextTrams: Tram[];
};

export default function Bus() {
  const [data, setData] = useState<BusStation[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/bus.json");
        const json: BusStation[] = await res.json();
        setData(json);
      } catch (e) {
        console.error("Fetch error:", e);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // --- UI STATES ---
  if (loading) return <p>Loading…</p>;
  if (!data || data.length === 0) return <p>No data</p>;

  return (
    <div className="w-40 h-40 bg-white rounded-2xl p-2 flex justify-between text-[#4D4D4D]">
      <main className="flex flex-col w-full h-full p-2 items-center gap-4">
        {data.map((stationData, idx) => {
          const nextTrams = stationData.nextTrams || [];
          if (nextTrams.length === 0) return <p key={idx}>No tram times</p>;

          return (
            <section
              key={idx}
              className="w-full flex flex-col items-center pb-2"
            >
              {/* Countdown + Clock */}
              <div className="w-full flex justify-between items-center">
                <p className="text-xl">{`${nextTrams[0].minutes} min.`}</p>
                <p>
                  {new Date().toLocaleTimeString("da-DK", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Station Name */}
              <h3 className="font-bold text-lg">{stationData.station}</h3>

              {/* Upcoming trams (horizontal carousel) */}
              <div className="w-full text-xs font-medium">
                <p>Mod {stationData.destination}</p>

                <div className="flex -mx-4 mt-1 overflow-x-auto snap-x snap-mandatory scroll-hide">
                  {nextTrams.map((tram, tIdx) => (
                    <div
                      key={tIdx}
                      className="shrink-0 flex flex-col items-center w-16 snap-start"
                    >
                      <p className="text-[0.6rem]">{stationData.line}</p>
                      <Image
                        src={stationData.image || "/img/Bus.png"}
                        alt="tram"
                        width={22}
                        height={22}
                      />
                      <p>{`${tram.minutes} min.`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
