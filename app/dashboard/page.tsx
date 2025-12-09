"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type WeatherResult = {
  temperatureC: number;
  time: string | null;
  condition: "sunny" | "partly-cloudy" | "cloudy" | "rain" | "snow" | "sleet" | "hail" |  "drizzle" | "thunder" | "unknown";
};


function getMainIcon(condition?: WeatherResult["condition"]): string {
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
      return "/WeatherTransIcons/Rain.png";
    case "snow":
      return "/WeatherTransIcons/Snow.png";
    case "sleet":
      return "/WeatherTransIcons/Snow.png";
    case "thunder":
      return "/WeatherTransIcons/Thunder.png";  
    case "hail":
      return "/WeatherTransIcons/Snow.png"; 
    default:
      return "/WeatherTransIcons/CloudyDay.png"; // fallback
  }
}



function getIconForCondition(
  condition:
    | "sunny"
    | "partly-cloudy"
    | "cloudy"
    | "rain"
    | "snow"
    | "sleet"
    | "hail"
    | "thunder"
    | "unknown"
): string {
  switch (condition) {
    case "thunder":
      return "/WeatherTransIcons/Thunder.png";
    case "rain":
      return "/WeatherTransIcons/Rain.png";
    case "snow":
      return "/WeatherTransIcons/Snow.png";
    case "sleet":
      return "/WeatherTransIcons/Sleet.png";
    case "hail":
      return "/WeatherTransIcons/Hail.png";
    case "sunny":
      return "/WeatherTransIcons/Sunny.png";
    case "partly-cloudy":
      return "/WeatherTransIcons/CloudyDay.png";
    case "cloudy":
      return "/WeatherTransIcons/Cloudy.png";
    default:
      return "/WeatherTransIcons/CloudyDay.png";
  }
}

export default function Dashboard() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  const displayDate = new Intl.DateTimeFormat("da-DK", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  }).format(now);

  const wholeTemp = weather ? Math.round(weather.temperatureC) : null;

const mainIconSrc = getMainIcon(weather?.condition);
const mainIconAlt = weather?.condition ?? "Weather icon";

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans bg-[linear-gradient(to_bottom,_white_0%,_#FFE8C8_25%,_#FFE8C8_75%,_white_100%)]">
      <main>
        <div className="flex flex-col items-center">
          <Image
            className="mt-5"
            src="/SkywayLogo.png"
            alt="SkyWay logo"
            width={70}
            height={20}
            priority
          />

          <h1 className="text-center text-black text-base">SkyWay</h1>
        </div>

        <div className="text-black flex flex-col justify-center text-center mt-3">
          {/* You don't have a city name from geolocation, so show "Din lokation" */}
          <h1 className="text-xl">
            Din lokation
          </h1>

          {error && (
            <p className="text-sm text-red-500 mt-1">
              {error}
            </p>
          )}

          {loading && !weather && !error && (
            <p className="text-sm text-zinc-700 mt-1">
              Henter vejrdata...
            </p>
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
  {/* Window with fixed / max width + horizontal scroll */}
  <div className="w-full max-w-[380px] overflow-x-auto scroll-hide">
    {/* Your existing styling, just with gap + non-shrinking items */}
    <div className="flex flex-row">
      {weather?.hourly?.map((entry, index) => {
        const date = new Date(entry.time);
        const isNow = index === 0;

        const label = isNow
          ? "nu"
          : date.toLocaleTimeString("da-DK", {
              hour: "2-digit",
            });

        const iconSrc = getIconForCondition(entry.condition);
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

        <div className="flex flex-row justify-center gap-5 mt-5 drop-shadow-xl">
          <div className="w-40 h-40 bg-white rounded-3xl "></div>

          <div className="w-40 h-40 bg-white rounded-3xl "></div>
        </div>

        <div className="flex flex-row justify-center drop-shadow-xl">
          <div className="w-85 h-40 bg-white rounded-3xl mt-5"></div>
        </div>
      </main>
    </div>
  );
}
