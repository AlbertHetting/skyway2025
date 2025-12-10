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

    const API_KEY = process.env.OPENWEATHER_API_KEY; // set this in .env.local
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch weather");

    const data = await res.json();

    return NextResponse.json({
      temp: data.main.temp, // Kelvin
      feels_like: data.main.feels_like, // Kelvin
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
