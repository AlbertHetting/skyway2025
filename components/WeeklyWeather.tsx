"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// --- Types ---
type Coord = { lat: number; lon: number };

type TimeseriesEntry = {
  time: string;
  temperature: number;
};

type WeeklyForecastEntry = {
  date: string;
  weekday: string;
  tempDay?: number;
  tempNight?: number;
};

export default function WeeklyWeather() {
  const [coords, setCoords] = useState<Coord | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(true);

  const [forecast, setForecast] = useState<WeeklyForecastEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically request location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation er ikke understøttet i denne browser.");
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoLoading(false);
      },
      (err) => {
        setGeoError(err.message || "Fejl ved hentning af lokation.");
        setGeoLoading(false);
      }
    );
  }, []);

  // Fetch weather when coordinates are available
  useEffect(() => {
    if (!coords) return;

    async function loadWeather() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/weather-weekly?lat=${coords!.lat}&lon=${coords!.lon}`
        );
        if (!res.ok) throw new Error(await res.text());

        const json = await res.json();
        const days = aggregateToDays(json);
        setForecast(days);
      } catch (err: any) {
        setError(err.message || "Kunne ikke hente vejret");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [coords]);

  // --- UI ---
  if (geoLoading || loading) return <p>Indlæser ugevær…</p>;
  if (geoError) return <p className="text-red-500">{geoError}</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      className="w-85 h-40 bg-white rounded-3xl mt-5 flex flex-col items-center justify-center p-4 text-[#4D4D4D]"
      role="region"
      aria-label="Ugevejr: daglige temperaturer og ikoner"
    >
      <section className="grid grid-cols-3 gap-15 justify-items-center">
        {forecast.map((d) => {
          const tempDayC =
            d.tempDay !== undefined ? Math.round(d.tempDay - 273.15) : null;

          let icon = "/WeatherTransIcons/Cloudy.png";
          if (tempDayC !== null && tempDayC > 8)
            icon = "/WeatherTransIcons/Sunny.png";

          return (
            <div key={d.date}>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={icon}
                  alt={`Vejrikon for ${d.weekday}`}
                  width={40}
                  height={40}
                />
                <p className="font-bold text-2xl">
                  {tempDayC !== null ? tempDayC + "°C" : "--"}
                </p>
                <p className="text-sm">
                  {d.tempNight !== undefined
                    ? Math.round(d.tempNight - 273.15) + "°C"
                    : "--"}
                </p>
                <div className="font-bold">{d.weekday}</div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

/* ---------------- Helpers ---------------- */
function aggregateToDays(data: { timeseries: TimeseriesEntry[] }) {
  const map: Record<string, { hour: number; temp: number }[]> = {};

  (data.timeseries || []).forEach((entry) => {
    const dt = new Date(entry.time);
    const date = entry.time.split("T")[0];
    const hour = dt.getHours();
    const temp = entry.temperature;

    if (!map[date]) map[date] = [];
    map[date].push({ hour, temp });
  });

  return Object.keys(map)
    .sort()
    .slice(0, 3)
    .map((date) => {
      const entries = map[date];
      const dayEntry = pickNearest(entries, 14) || entries[0];
      const nightEntry = pickNearest(entries, 3) || entries[0];

      return {
        date,
        weekday: new Date(date).toLocaleDateString("da-DK", {
          weekday: "short",
        }),
        tempDay: dayEntry.temp,
        tempNight: nightEntry.temp,
      };
    });
}

function pickNearest(
  list: { hour: number; temp: number }[],
  targetHour: number
) {
  let best: { hour: number; temp: number } | null = null;
  let bestDiff = Infinity;

  for (const e of list) {
    const diff = Math.abs(e.hour - targetHour);
    if (diff < bestDiff) {
      best = e;
      bestDiff = diff;
    }
  }
  return best;
}
