"use client";

import { useEffect, useState } from "react";

export default function FeelsLikeWidget() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(true);

  const [weather, setWeather] = useState<{
    temp: number;
    feels_like: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Request user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported.");
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGeoLoading(false);
      },
      (err) => {
        setGeoError(err.message || "Failed to get location.");
        setGeoLoading(false);
      }
    );
  }, []);

  // Fetch current weather for "feels like"
  useEffect(() => {
    if (!coords) return;

    async function loadWeather() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/weather-current?lat=${coords.lat}&lon=${coords.lon}`
        );
        if (!res.ok) throw new Error(await res.text());

        const json = await res.json();
        setWeather(json);
      } catch (err: any) {
        setError(err.message || "Failed to load weather");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [coords]);

  // --- UI ---
  if (geoLoading || loading) return <p>Loading weather…</p>;
  if (geoError) return <p className="text-red-500">{geoError}</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return <p>No weather data</p>;

  // Convert Kelvin → Celsius
  const actualTemp = Math.round(weather.temp - 273.15);
  const feelsLikeTemp = Math.round(weather.feels_like - 273.15);

  return (
    <div className="w-full bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-md">
      <h3 className="font-bold text-lg">Feels Like</h3>
      <p className="text-2xl font-bold">{actualTemp}°C</p>
      <p className="text-sm text-gray-600">Feels like {feelsLikeTemp}°C</p>
    </div>
  );
}
