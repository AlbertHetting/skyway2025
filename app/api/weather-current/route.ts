import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Missing latitude or longitude" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key not set in .env.local" },
        { status: 500 }
      );
    }

    // Metric units = Celsius
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenWeather API error: ${text}`);
    }

    const data = await res.json();

    return NextResponse.json({
      temp: data.main.temp,
      feels_like: data.main.feels_like,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
