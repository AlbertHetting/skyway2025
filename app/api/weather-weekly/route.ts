import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Missing lat or lon", debug: { lat, lon } },
        { status: 400 }
      );
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      return NextResponse.json(
        { error: "Invalid coordinates", debug: { lat, lon } },
        { status: 400 }
      );
    }

    const latFixed = latNum.toFixed(6);
    const lonFixed = lonNum.toFixed(6);

    const dmiUrl = `https://opendataapi.dmi.dk/v1/forecastedr/collections/harmonie_dini_sf/position?coords=POINT(${lonFixed} ${latFixed})&crs=crs84&parameter-name=temperature-0m`;

    const res = await fetch(dmiUrl, { next: { revalidate: 1800 } });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "DMI fetch failed", details: text },
        { status: res.status }
      );
    }

    const json = await res.json();

    const timeseries = (json.properties?.timeseries || []).map((entry) => ({
      time: entry.time,
      temperature: entry.data["temperature-0m"],
    }));

    return NextResponse.json({
      timeseries,
      lat: latFixed,
      lon: lonFixed,
    });
  } catch (err) {
    console.error("weather-weekly error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
