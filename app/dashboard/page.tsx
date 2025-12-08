"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type WeatherResult = {
  temperatureC: number;
  time: string | null;
};

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
            src="/WeatherTransIcons/Sunny.png"
            alt="Weather icon"
            width={285}
            height={20}
            priority
          />
        </div>

        <div className="flex flex-row mt-[-50]">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-black font-bold">now</h1>

            <Image
              className="mt-[-10]"
              src="/WeatherTransIcons/CloudyDay.png"
              alt="Cloudy"
              width={50}
              height={50}
              priority
            />

            <h1 className="text-black font-bold mt-[-10]">
              10<span>&#176;</span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-black font-bold">12</h1>

            <Image
              className="mt-[-10]"
              src="/WeatherTransIcons/CloudyDay.png"
              alt="Cloudy"
              width={50}
              height={50}
              priority
            />

            <h1 className="text-black font-bold mt-[-10]">
              11<span>&#176;</span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-black font-bold">13</h1>

            <Image
              className="mt-[-10]"
              src="/WeatherTransIcons/Cloudy.png"
              alt="Cloudy"
              width={50}
              height={50}
              priority
            />

            <h1 className="text-black font-bold mt-[-10]">
              13<span>&#176;</span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-black font-bold">14</h1>

            <Image
              className="mt-[-10]"
              src="/WeatherTransIcons/HeavyRain.png"
              alt="Heavy rain"
              width={50}
              height={50}
              priority
            />

            <h1 className="text-black font-bold mt-[-10]">
              13<span>&#176;</span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-black font-bold">15</h1>

            <Image
              className="mt-[-10]"
              src="/WeatherTransIcons/Thunder.png"
              alt="Thunder"
              width={50}
              height={50}
              priority
            />

            <h1 className="text-black font-bold mt-[-10]">
              13<span>&#176;</span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-black font-bold">16</h1>

            <Image
              className="mt-[-10]"
              src="/WeatherTransIcons/Rain.png"
              alt="Rain"
              width={50}
              height={50}
              priority
            />

            <h1 className="text-black font-bold mt-[-10]">
              8<span>&#176;</span>
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-black font-bold">16:23</h1>

            <Image
              className="mt-[-10]"
              src="/WeatherTransIcons/Sunset.png"
              alt="Sunset"
              width={50}
              height={50}
              priority
            />

            <h1 className="text-black font-bold mt-[-10]">
              8<span>&#176;</span>
            </h1>
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
