import { NextResponse } from "next/server";

// --- DMI API ---
const DMI_BASE =
  "https://opendataapi.dmi.dk/v1/forecastedr/collections/harmonie_dini_sf/position";

// Types
type DmiFeature = {
  properties: {
    step?: string;
    time?: string;
    "temperature-2m": number;
  };
};

type DmiGeoJson = {
  features: DmiFeature[];
};

// Build DMI URL
function buildDmiUrl(lat: number, lon: number): string {
  const coords = `POINT(${lon} ${lat})`;
  const params = new URLSearchParams({
    coords,
    crs: "crs84",
    "parameter-name": "temperature-2m",
    f: "GeoJSON",
  });
  return `${DMI_BASE}?${params.toString()}`;
}

// GET handler
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const latStr = searchParams.get("lat");
    const lonStr = searchParams.get("lon");

    if (!latStr || !lonStr) {
      return NextResponse.json(
        { error: "Missing coordinates" },
        { status: 400 }
      );
    }

    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json(
        { error: "Invalid coordinates", debug: { lat, lon } },
        { status: 400 }
      );
    }

    const dmiUrl = buildDmiUrl(lat, lon);
    const res = await fetch(dmiUrl, { next: { revalidate: 1800 } });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "DMI fetch failed", details: text },
        { status: res.status }
      );
    }

    const json: DmiGeoJson = await res.json();

    const timeseries = (json.features || []).map((f) => ({
      time: f.properties.step ?? f.properties.time ?? null,
      temperature: f.properties["temperature-2m"],
    }));

    return NextResponse.json({ timeseries, lat, lon });
  } catch (err: any) {
    console.error("weather-weekly error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
