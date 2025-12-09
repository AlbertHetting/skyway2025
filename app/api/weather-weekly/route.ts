import { NextResponse } from "next/server";

const DMI_BASE =
  "https://opendataapi.dmi.dk/v1/forecastedr/collections/harmonie_dini_sf/position";

function buildDmiUrl(lat, lon) {
  const coords = `POINT(${lon} ${lat})`;
  const params = new URLSearchParams({
    coords,
    crs: "crs84",
    "parameter-name": "temperature-2m",
    f: "GeoJSON",
  });
  return `${DMI_BASE}?${params.toString()}`;
}

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;

    const lat = parseFloat(searchParams.get("lat"));
    const lon = parseFloat(searchParams.get("lon"));

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

    const json = await res.json();

    // Simplify: create timeseries for front-end
    const timeseries = (json.features || []).map((f) => ({
      time: f.properties.step || f.properties.time,
      temperature: f.properties["temperature-2m"],
    }));

    return NextResponse.json({ timeseries, lat, lon });
  } catch (err) {
    console.error("weather-weekly error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
