const DMI_BASE =
  "https://opendataapi.dmi.dk/v1/forecastedr/collections/harmonie_dini_sf/position";

type DmiFeature = {
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    "temperature-2m"?: number;
    step?: string;
    [key: string]: unknown;
  };
};

type DmiResponse = {
  type: string;
  features: DmiFeature[];
};

function buildDmiUrl(lat: number, lon: number) {
  // DMI expects coords as POINT(lon lat) with a SPACE, not comma
  const coords = `POINT(${lon} ${lat})`;

  const params = new URLSearchParams({
    coords,
    crs: "crs84",
    "parameter-name": "temperature-2m",
    f: "GeoJSON",
  });

  return `${DMI_BASE}?${params.toString()}`;
}

// Generic helper for any position:
export async function getDmiTemperature(lat: number, lon: number) {
  const url = buildDmiUrl(lat, lon);

  const res = await fetch(url, {
    // You *can* still cache, but for per-user positions you might prefer no cache:
    // cache: "no-store",
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`DMI fetch failed: ${res.status}`);
  }

  const json = (await res.json()) as DmiResponse;
  const feature = json.features[0];
  if (!feature) {
    throw new Error("DMI returned no features");
  }

  const tempK = feature.properties["temperature-2m"];
  if (typeof tempK !== "number") {
    throw new Error("DMI returned no temperature-2m value");
  }

  const timeIso = feature.properties.step as string | undefined;
  const tempC = tempK - 273.15;

  return {
    temperatureC: tempC,
    time: timeIso ? new Date(timeIso) : null,
  };
}