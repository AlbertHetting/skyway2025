"use client";

import { useState } from "react";

type Coords = {
  lat: number;
  lon: number;
};

export function useGeolocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);

  function requestLocation() {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      setLoading(false);
      return;
    }

navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Could not get your location.");
        setLoading(false);
      }
    );
  }

  return { coords, error, loading, requestLocation };
}
