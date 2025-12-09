// lib/dmi.ts

const DMI_BASE =
  "https://opendataapi.dmi.dk/v1/forecastedr/collections/harmonie_dini_sf/position";

type DmiFeature = {
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    "temperature-2m"?: number;
    "precipitation-type"?: number;
    "fraction-of-cloud-cover"?: number;
    "probability-of-lightning"?: number;
    step?: string;
    [key: string]: unknown;
  };
};

type DmiResponse = {
  type: string;
  features: DmiFeature[];
};

export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "snow"
  | "sleet"
  | "hail"
  | "drizzle"
  | "thunder"
  | "unknown";



  export type HourlyForecast = {
  time: string;           // ISO string
  temperatureC: number;
  condition: WeatherCondition;
};

function buildDmiUrl(lat: number, lon: number) {
  const coords = `POINT(${lon} ${lat})`; 

  const params = new URLSearchParams({
    coords,
    crs: "crs84",
    "parameter-name":
    "temperature-2m,precipitation-type,fraction-of-cloud-cover,probability-of-lightning",
    f: "GeoJSON",
  });

  return `${DMI_BASE}?${params.toString()}`;
}

function deriveCondition(
  precipType?: number,
  cloudFrac?: number,
  lightningProb?: number
): WeatherCondition {
    if (typeof lightningProb === "number" && lightningProb >= 0.6) {
    return "thunder";
  }

  // drizzle = 0, rain = 1, sleet = 2, snow = 3,
  // freezing drizzle = 4, freezing rain = 5, graupel = 6, hail = 7
  if (typeof precipType === "number") {
    if (precipType === 0){
      return "drizzle";
    }
    if (precipType === 1 || precipType === 4 || precipType === 5) {
      return "rain";
    }
    if (precipType === 3 || precipType === 7 || precipType === 2 || precipType === 6) {
      return "snow";
    }
    if (precipType === 7) {
      return "hail"; // or treat 0 as drizzle/rain if you prefer
    }
  }

  // If no active precip, decide from cloud fraction (0..1)
  if (typeof cloudFrac === "number") {
    if (cloudFrac < 0.1) return "sunny";
    if (cloudFrac < 0.5) return "partly-cloudy";
    if (cloudFrac < 0.8) return "cloudy";
    return "cloudy";
  }

  return "unknown";
}

export async function getDmiWeather(
  lat: number,
  lon: number
): Promise<{
  temperatureC: number;
  time: string | null;
  condition: WeatherCondition;
  cloudFrac: number | null;
  hourly: HourlyForecast[];
}> {
  const url = buildDmiUrl(lat, lon);

  const res = await fetch(url, {
    next: { revalidate: 600 }, // cache 10 min on server
  });

  if (!res.ok) {
    throw new Error(`DMI fetch failed: ${res.status}`);
  }

  const json = (await res.json()) as DmiResponse;

  if (!json.features || json.features.length === 0) {
    throw new Error("DMI returned no features");
  }

  // 1) Sort all features by time
  const withTime = json.features.filter(
    (f) => typeof f.properties.step === "string"
  );

  withTime.sort((a, b) => {
    const ta = new Date(a.properties.step as string).getTime();
    const tb = new Date(b.properties.step as string).getTime();
    return ta - tb;
  });

  const nowMs = Date.now();

  // 2) Pick "current" as the feature closest to now
  let currentFeature = withTime[0];
  let minDiff = Math.abs(
    new Date(currentFeature.properties.step as string).getTime() - nowMs
  );

  for (const f of withTime) {
    const t = new Date(f.properties.step as string).getTime();
    const diff = Math.abs(t - nowMs);
    if (diff < minDiff) {
      currentFeature = f;
      minDiff = diff;
    }
  }

  const cp = currentFeature.properties;

  const tempK = cp["temperature-2m"];
  if (typeof tempK !== "number") {
    throw new Error("No temperature-2m in DMI response");
  }

  const precipType = cp["precipitation-type"];
  const cloudFracTotal = cp["fraction-of-cloud-cover"]; // 👈 total cloud
  const lightningProb = cp["probability-of-lightning"];

  const tempC = tempK - 273.15;
  const timeIso = cp.step as string | undefined;

  const condition = deriveCondition(
    typeof precipType === "number" ? precipType : undefined,
    typeof cloudFracTotal === "number" ? cloudFracTotal : undefined,
    typeof lightningProb === "number" ? lightningProb : undefined
  );

  // 3) Build hourly forecast array (now + a few hours ahead)
  const hourly: HourlyForecast[] = [];

  for (const f of withTime) {
    const p = f.properties;
    const stepStr = p.step as string | undefined;
    if (!stepStr) continue;

    const tMs = new Date(stepStr).getTime();
    if (tMs < nowMs - 30 * 60 * 1000) {
      // skip forecasts older than ~30 minutes
      continue;
    }

    const tK = p["temperature-2m"];
    if (typeof tK !== "number") continue;

    const tC = tK - 273.15;
    const cf = p["fraction-of-cloud-cover"];
    const pt = p["precipitation-type"];
    const lp = p["probability-of-lightning"];

    const cond = deriveCondition(
      typeof pt === "number" ? pt : undefined,
      typeof cf === "number" ? cf : undefined,
      typeof lp === "number" ? lp : undefined
    );

    hourly.push({
      time: stepStr,
      temperatureC: tC,
      condition: cond,
    });

    if (hourly.length >= 23) break; // e.g. now + next 6
  }

  return {
    temperatureC: tempC,
    time: timeIso || null,
    condition,
    cloudFrac: typeof cloudFracTotal === "number" ? cloudFracTotal : null,
    hourly,
  };
}
