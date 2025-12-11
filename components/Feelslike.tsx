import Image from "next/image";
import type { WeatherCondition } from "../app/dmi"; // adjust path if needed

type FeelingProps = {
  temperatureC: number | null;
  condition?: WeatherCondition;
  windSpeedMs: number | null;
};

function computeFeelsLikeDelta(
  temperatureC: number | null,
  condition: WeatherCondition | undefined,
  windSpeedMs: number | null
): number {
  let score = 0;

  // Wind contribution to feels like
  if (typeof windSpeedMs === "number") {
    if (windSpeedMs > 10) {
      score += 4;
    } else if (windSpeedMs > 5) {
      score += 2;
    }
  }

  // Precipitation contribution
  if (condition === "drizzle") {
    score += 1;
  }

  if (condition === "rain") {
    score += 3;
  }

  if (
    condition === "snow" ||
    condition === "sleet" ||
    condition === "hail"
  ) {
    score += 5;
  }

  if (score < 0) score = 0;
  if (score > 15) score = 15;
  let delta = 0;

  if (score === 0) {
    delta = 0;
  } else if (score <= 3) {
    delta = -2;
  } else if (score <= 7) {
    delta = -3;
  } else if (score <= 11) {
    delta = -4;
  } else {
    delta = -5;
  }

  return delta;
}

export default function FeelsLike({
  temperatureC,
  condition,
  windSpeedMs,
}: FeelingProps) {
  const wholeTemp =
    typeof temperatureC === "number" ? Math.round(temperatureC) : null;

  const feelsDelta = computeFeelsLikeDelta(
    temperatureC,
    condition,
    windSpeedMs
  );

  const feelsLikeTemp =
    wholeTemp !== null ? wholeTemp + feelsDelta : null;


  return (
    <main>
      <div className="w-40 h-40 bg-white rounded-3xl">
        {/* Header: Running + dynamic condition label */}
        <div className="flex flex-row justify-center items-center gap-4 text-[#4D4D4D]">
          <h1 className="mt-2 ml-1 text-md font-bold">Feels Like</h1>
        </div>

       
        <div className="flex flex-row justify-center mt-6">


            <h1 className="text-[#4D4D4D] text-4xl font-bold">{feelsLikeTemp}<span>&#176;</span></h1>

        </div>

            <div className="text-[#4D4D4D] mt-3">
          <h1 className="mt-2 text-lg text-center">
            Actual {wholeTemp}<span>&#176;</span>
          </h1>
        </div>
        </div>
    </main>
  );
}
