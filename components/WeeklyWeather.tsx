"use client";

import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function WeeklyWeather() {
  const {
    coords,
    error: geoError,
    loading: geoLoading,
    requestLocation,
  } = useGeolocation();

  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords) return;

    async function loadWeather() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/weather-weekly?lat=${coords.lat}&lon=${coords.lon}`
        );
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t);
        }

        const json = await res.json();
        const days = aggregateToDays(json);
        console.log("Aggregated forecast:", days); // optional debug
        setForecast(days);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load weather");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [coords]);

  // --- UI ---
  if (!coords && !geoLoading) {
    return (
      <button
        onClick={requestLocation}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Enable location
      </button>
    );
  }

  if (geoLoading || loading) return <p>Loading weekly weather…</p>;
  if (geoError) return <p className="text-red-500">{geoError}</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="grid grid-cols-3 gap-2 mt-3">
      {forecast.map((d) => (
        <div key={d.date} className="flex flex-col items-center text-center">
          <p className="font-bold">
            {d.tempDay !== undefined
              ? Math.round(d.tempDay - 273.15) + "°C"
              : "--"}
          </p>
          <h5>
            {d.tempNight !== undefined
              ? Math.round(d.tempNight - 273.15) + "°C"
              : "--"}
          </h5>
          <div>{d.weekday}</div>
        </div>
      ))}
    </section>
  );
}

/* ---------------- Helpers ---------------- */
function aggregateToDays(data) {
  const map = {};

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
    .slice(0, 3) // <-- only take the first 3 days
    .map((date) => {
      const entries = map[date];

      const dayEntry = pickNearest(entries, 14) || entries[0]; // fallback
      const nightEntry = pickNearest(entries, 3) || entries[0]; // fallback

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

function pickNearest(list, targetHour) {
  let best = null;
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
