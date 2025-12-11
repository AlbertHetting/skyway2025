"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { WeatherCondition, HourlyForecast } from "../dmi";
import Running from "@/components/Running";
import FeelsLike from "@/components/Feelslike";
import WeeklyWeather from "@/components/WeeklyWeather";
import Bus from "@/components/Bus";
import Letbane from "@/components/Letbane";
import { useEditMode } from "@/app/EditModeContext";

type WeatherResult = {
  temperatureC: number;
  time: string | null;
  hourly: HourlyForecast[]; // 👈 add this
  cloudFrac: number | null;
  condition: WeatherCondition;
  windspeedMs: number | null;
};

type WidgetRowId = "runningFeels" | "weekly" | "transport";

const DEFAULT_LAYOUT: WidgetRowId[] = [
  "runningFeels",
  "weekly",
  "transport",
];

const LAYOUT_STORAGE_KEY = "skyway-widget-layout-v1";





function getIconForCondition(
  condition?: WeatherCondition,
  isDaytime: boolean = true
): string {
  // Night icons
  if (!isDaytime) {
    switch (condition) {
      case "sunny":
        return "/WeatherTransIcons/NightClear.png";      // moon version
      case "partly-cloudy":
        return "/WeatherTransIcons/CloudyNight.png";
      case "cloudy":
        return "/WeatherTransIcons/Cloudy.png";
      case "rain":
      case "drizzle":
        return "/WeatherTransIcons/Rain.png";
      case "snow":
      case "sleet":
      case "hail":
        return "/WeatherTransIcons/Snow.png";
      case "thunder":
        return "/WeatherTransIcons/Thunder.png";
      default:
        return "/WeatherTransIcons/CloudyNight.png";
    }
  }

  // Day icons (your current mapping)
  switch (condition) {
    case "sunny":
      return "/WeatherTransIcons/Sunny.png";
    case "partly-cloudy":
      return "/WeatherTransIcons/CloudyDay.png";
    case "cloudy":
      return "/WeatherTransIcons/Cloudy.png";
    case "rain":
      return "/WeatherTransIcons/Rain.png";
    case "drizzle":
      return "/WeatherTransIcons/LightRain.png";
    case "snow":
      return "/WeatherTransIcons/Snow.png";
    case "sleet":
      return "/WeatherTransIcons/Snow.png";
    case "thunder":
      return "/WeatherTransIcons/Thunder.png";
    case "hail":
      return "/WeatherTransIcons/Snow.png";
    default:
      return "/WeatherTransIcons/CloudyDay.png";
  }
}

function getBackgroundGradient(condition?: WeatherCondition): string {
  switch (condition) {
    case "sunny":
      return "linear-gradient(to bottom, white 0%, #FFE8C8 25%, #FFE8C8 85%, white 100%)";

    case "partly-cloudy":
    case "cloudy":
      return "linear-gradient(to bottom, white 0%, #B4B4B4 25%, #B4B4B4 90%, white 100%)";

    case "drizzle":
    case "rain":
    case "snow":
    case "hail":
    case "sleet":
      return "linear-gradient(to bottom, white 0%, #C7E4FF 25%, #C7E4FF 85%, white 100%)";

    case "thunder":
      return "linear-gradient(to bottom, white 0%, #5B5B5B 40%, #F8DC2A 80%, white 100%)";

    default:
      return "linear-gradient(to bottom, white 0%, #B4B4B4 25%, #B4B4B4 85%, white 100%)";
  }
}

export default function Dashboard() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ...existing state: coords, weather, loading, error...

const { editMode } = useEditMode(); // 👈 get editMode from context
  const [layout, setLayout] = useState<WidgetRowId[]>(DEFAULT_LAYOUT);

  const moveRowUp = (index: number) => {
    if (index === 0) return;
    setLayout((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveRowDown = (index: number) => {
    setLayout((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  };

  // ...your existing now/hour/isDaytime/displayDate/etc...


  // 1) Get user location (client-side)
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation er ikke understøttet i denne browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        setError(err.message || "Kunne ikke hente din lokation.");
      }
    );
  }, []);

  // 2) Fetch weather for that location from our API route
  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/weather?lat=${coords.lat}&lon=${coords.lon}`
        );

        if (!res.ok) {
          throw new Error(`Weather fetch failed: ${res.status}`);
        }

        const data = (await res.json()) as WeatherResult;
        setWeather(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Kunne ikke hente vejret.";
        setError(message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);

  // 3) Format temperature and date for display
const now = new Date();
const hour = now.getHours();
const isDaytime = hour >= 7 && hour < 18;

const displayDate = new Intl.DateTimeFormat("da-DK", {
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Copenhagen",
}).format(now);

  const wholeTemp = weather ? Math.round(weather.temperatureC) : null;

const mainIconSrc = getIconForCondition(weather?.condition, isDaytime);
const mainIconAlt = weather?.condition ?? "Weather icon";
const bgGradient = getBackgroundGradient(weather?.condition);

  return (
    <div
      className="flex min-h-screen justify-center bg-zinc-50 font-sans"
      style={{ backgroundImage: bgGradient }}
    >
      <main>
        <div className="w-full flex items-center justify-center pt-5">
          <Image
            src="/img/skyway-logo-with-text.svg"
            alt="Skyway logo"
            width={200}
            height={100}
            className="size-20"
          />
        </div>

        <div className="text-black flex flex-col justify-center text-center mt-3">
          {/* You don't have a city name from geolocation, so show "Din lokation" */}
          <h1 className="text-xl">Din lokation</h1>

          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

          {loading && !weather && !error && (
            <p className="text-sm text-zinc-700 mt-1">Henter vejrdata...</p>
          )}

          <h2 className="font-bold text-4xl mt-1">
            {wholeTemp !== null ? (
              <>
                {wholeTemp} <span>&#176;</span>
              </>
            ) : (
              "--"
            )}
          </h2>

          <h3>{displayDate}</h3>
        </div>

        <div className="flex flex-row justify-center">
          <Image
            className="mt-[-40]"
            src={mainIconSrc}
            alt={mainIconAlt}
            width={285}
            height={285} // or whatever size you actually want
            priority
          />
        </div>

          <div className="mt-[-50] flex justify-center">
            <div className="w-full max-w-[380px] overflow-x-auto scroll-hide">
              <div className="flex flex-row">
                {weather?.hourly?.map((entry, index) => {
                  const date = new Date(entry.time);
                  const isNow = index === 0;

                  const label = isNow
                    ? "nu"
                    : date.toLocaleTimeString("da-DK", {
                        hour: "2-digit",
                      });

                  // compute day/night for THIS forecast hour
                  const entryHour = date.getHours();
                  const entryIsDay = entryHour >= 7 && entryHour < 18;

                  const iconSrc = getIconForCondition(entry.condition, entryIsDay);
                  const tempWhole = Math.round(entry.temperatureC);

                  return (
                    <div
                      key={entry.time}
                      className="flex flex-col items-center justify-center text-center min-w-[60px] shrink-0"
                    >
                      <h1 className="text-black font-bold">{label}</h1>

                      <Image
                        className="mt-[-10]"
                        src={iconSrc}
                        alt={entry.condition}
                        width={50}
                        height={50}
                        priority={index === 0}
                      />

                      <h1 className="text-black font-bold mt-[-10]">
                        {tempWhole}
                        <span>&#176;</span>
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


<div className="mt-5 flex flex-col gap-5 drop-shadow-xl">
  {layout.map((rowId, index) => {
    const canMoveUp = index > 0;
    const canMoveDown = index < layout.length - 1;

    const Arrows = () =>
      editMode ? (
        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 gap-2 text-xs">
          <button
            disabled={!canMoveUp}
            onClick={() => moveRowUp(index)}
            className={canMoveUp ? "opacity-100" : "opacity-30"}
          >
            ▲
          </button>
          <button
            disabled={!canMoveDown}
            onClick={() => moveRowDown(index)}
            className={canMoveDown ? "opacity-100" : "opacity-30"}
          >
            ▼
          </button>
        </div>
      ) : null;

            switch (rowId) {
            case "runningFeels":
              return (
                <div
                  key={rowId + index}
                  className="relative flex flex-row justify-center gap-5"
                >
                  <Arrows />
                  <Running
                    temperatureC={weather?.temperatureC ?? null}
                    condition={weather?.condition}
                    windSpeedMs={weather?.windspeedMs ?? null}
                  />
                  <FeelsLike
                    temperatureC={weather?.temperatureC ?? null}
                    condition={weather?.condition}
                    windSpeedMs={weather?.windspeedMs ?? null}
                  />
                </div>
              );

            case "weekly":
              return (
                <div
                  key={rowId + index}
                  className="relative flex flex-col justify-center"
                >
                  <Arrows />
                  <div className="w-85 h-40 bg-white rounded-3xl mt-5">
                    <WeeklyWeather />
                  </div>
                </div>
              );

            case "transport":
              return (
                <div
                  key={rowId + index}
                  className="relative flex flex-row justify-center gap-5"
                >
                  <Arrows />
                  {/* put your transport widget(s) here */}
                  <Bus
                  />
                  <Letbane
                  />
                </div>
              );

            default:
              return null;
          }
          })}
        </div>
      </main>
    </div>
  );
}

