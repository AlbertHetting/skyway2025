// app/api/weather/route.ts
import { NextResponse } from "next/server";
import { getDmiWeather } from "../../dmi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lat = parseFloat(searchParams.get("lat") || "");
  const lon = parseFloat(searchParams.get("lon") || "");

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return NextResponse.json(
      { error: "Missing or invalid lat/lon" },
      { status: 400 }
    );
  }

  try {
    const data = await getDmiWeather(lat, lon);
    // data = { temperatureC, time, condition }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch weather from DMI" },
      { status: 500 }
    );
  }
}

