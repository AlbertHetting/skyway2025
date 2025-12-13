"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// --- Types ---
type Tram = {
  minutes: number;
};

type LetbaneStation = {
  station: string;
  line: string;
  destination: string;
  image?: string;
  nextTrams: Tram[];
};

export default function Letbane() {
  const [data, setData] = useState<LetbaneStation[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/letbane.json");
        const json: LetbaneStation[] = await res.json();
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
  if (loading) return <p>Indlæser…</p>;
  if (!data || data.length === 0) return <p>Ingen data tilgængelig</p>;

  return (
    <div
      className="w-40 h-40 bg-white rounded-2xl p-2 flex justify-between text-[#4D4D4D]"
      role="region"
      aria-label="Letbane: Næste afgange"
    >
      <main className="flex flex-col w-full h-full p-2 items-center gap-4">
        {data.map((stationData, idx) => {
          const nextTrams = stationData.nextTrams || [];
          if (nextTrams.length === 0) return <p key={idx}>Ingen afgange</p>;

          return (
            <section
              key={idx}
              className="w-full flex flex-col items-center pb-2"
              aria-label={`Station ${stationData.station}, næste afgange`}
            >
              {/* Countdown + Clock */}
              <div
                className="w-full flex justify-between items-center"
                aria-label={`Næste letbane om ${
                  nextTrams[0].minutes
                } minutter, klokkeslæt ${new Date().toLocaleTimeString(
                  "da-DK",
                  { hour: "2-digit", minute: "2-digit" }
                )}`}
              >
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
                <p aria-label={`Mod ${stationData.destination}`}>
                  Mod {stationData.destination}
                </p>

                <div
                  className="flex -mx-4 mt-1 overflow-x-auto snap-x snap-mandatory scroll-hide"
                  role="list"
                >
                  {nextTrams.map((tram, tIdx) => (
                    <div
                      key={tIdx}
                      className="shrink-0 flex flex-col items-center w-16 snap-start"
                      role="listitem"
                      aria-label={`Linje ${stationData.line}, afgang om ${tram.minutes} minutter`}
                    >
                      <p className="text-[0.6rem]">{stationData.line}</p>
                      <Image
                        src={stationData.image || "/img/Letbanen.png"}
                        alt="Letbane ikon"
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
