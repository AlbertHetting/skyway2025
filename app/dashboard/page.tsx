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
  hourly: HourlyForecast[];
  cloudFrac: number | null;
  condition: WeatherCondition;
  windspeedMs: number | null;
};

type SmallWidgetId = "running" | "feelsLike" | "bus" | "letbane";

const DEFAULT_SMALL_LAYOUT: SmallWidgetId[] = [
  "running",
  "feelsLike",
  "bus",
  "letbane",
];

function getIconForCondition(
  condition?: WeatherCondition,
  isDaytime: boolean = true
): string {
  // Night icons
  if (!isDaytime) {
    switch (condition) {
      case "sunny":
        return "/WeatherTransIcons/NightClear.png";
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

  // Day icons
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

  const { editMode } = useEditMode();

  const [smallLayout, setSmallLayout] = useState<SmallWidgetId[]>(
    DEFAULT_SMALL_LAYOUT
  );

  // ---- movement helpers for small widgets (inside component!) ----
  const swapSmallWidgets = (fromIndex: number, toIndex: number) => {
    setSmallLayout((prev) => {
      if (
        toIndex < 0 ||
        toIndex >= prev.length ||
        fromIndex < 0 ||
        fromIndex >= prev.length
      ) {
        return prev;
      }
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  };

  const moveSmallUp = (index: number) => {
    // one row up in 2-column grid => index - 2
    swapSmallWidgets(index, index - 2);
  };

  const moveSmallDown = (index: number) => {
    // one row down => index + 2
    swapSmallWidgets(index, index + 2);
  };

  const moveSmallLeft = (index: number) => {
    // left only if in right column (odd index)
    if (index % 2 === 1) {
      swapSmallWidgets(index, index - 1);
    }
  };

  const moveSmallRight = (index: number) => {
    // right only if in left column (even index)
    if (index % 2 === 0 && index + 1 < smallLayout.length) {
      swapSmallWidgets(index, index + 1);
    }
  };

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
            height={285}
            priority
          />
        </div>

        {/* HOURLY STRIP (static) */}
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

        {/* SMALL WIDGET GRID (movable with arrows) */}
        <div className="mt-5 flex justify-center">
          <div className="grid grid-cols-2 gap-5">
            {smallLayout.map((id, index) => {
              let content: JSX.Element | null = null;

              switch (id) {
                case "running":
                  content = (
                    <Running
                      temperatureC={weather?.temperatureC ?? null}
                      condition={weather?.condition}
                      windSpeedMs={weather?.windspeedMs ?? null}
                    />
                  );
                  break;

                case "feelsLike":
                  content = (
                    <FeelsLike
                      temperatureC={weather?.temperatureC ?? null}
                      condition={weather?.condition}
                      windSpeedMs={weather?.windspeedMs ?? null}
                    />
                  );
                  break;

                case "bus":
                  content = <Bus />;
                  break;

                case "letbane":
                  content = <Letbane />;
                  break;
              }

              return (
                <div
                  key={id}
                  className="relative w-40 h-40 bg-white rounded-3xl drop-shadow-xl flex items-center justify-center"
                >
                  {content}

                  {editMode && (
                    <>
                      {/* UP */}
                      <button
                        type="button"
                        onClick={() => moveSmallUp(index)}
                        className="absolute top-1 left-1/2 -translate-x-1/2"
                      >
                        <Image
                          src="/UiIcons/MoveUp.png"
                          alt="Move up"
                          width={50}
                          height={50}
                        />
                      </button>

                      {/* DOWN */}
                      <button
                        type="button"
                        onClick={() => moveSmallDown(index)}
                        className="absolute bottom-1 left-1/2 -translate-x-1/2"
                      >
                        <Image
                          src="/UiIcons/MoveDown.png"
                          alt="Move down"
                          width={50}
                          height={50}
                        />
                      </button>

                      {/* LEFT */}
                      <button
                        type="button"
                        onClick={() => moveSmallLeft(index)}
                        className="absolute top-1/2 left-1 -translate-y-1/2"
                      >
                        <Image
                          src="/UiIcons/MoveLeft.png"
                          alt="Move left"
                          width={50}
                          height={50}
                        />
                      </button>

                      {/* RIGHT */}
                      <button
                        type="button"
                        onClick={() => moveSmallRight(index)}
                        className="absolute top-1/2 right-1 -translate-y-1/2"
                      >
                        <Image
                          src="/UiIcons/MoveRight.png"
                          alt="Move right"
                          width={50}
                          height={50}
                        />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* WEEKLY WIDGET (static below grid) */}
        <div className="flex flex-row justify-center drop-shadow-xl mt-5">
          <div className="w-85 h-40 bg-white rounded-3xl">
            <WeeklyWeather />
          </div>
        </div>
      </main>
    </div>
  );
}
