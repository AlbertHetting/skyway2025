"use client";

import Image from "next/image";
import type { WeatherCondition } from "../app/dmi"; // adjust path if needed

type RunningProps = {
  temperatureC: number | null;
  condition?: WeatherCondition;
  windSpeedMs: number | null;
};

/**
 * Compute running label
 */
function computeRunningLabel(
  temperatureC: number | null,
  condition: WeatherCondition | undefined,
  windSpeedMs: number | null
): string {
  let score = 0;

  if (typeof windSpeedMs === "number" && windSpeedMs > 5) score += 1;
  if (typeof windSpeedMs === "number" && windSpeedMs > 10) score += 2;
  if (condition === "drizzle") score += 1;
  if (condition === "rain") score += 3;
  if (condition === "snow" || condition === "sleet" || condition === "hail")
    score += 4;
  if (typeof temperatureC === "number" && temperatureC > 25) score += 2;

  if (score < 0) score = 0;
  if (score > 10) score = 10;

  if (score === 0) return "Super";
  if (score <= 3) return "Godt";
  if (score <= 5) return "Okay";
  if (score <= 7) return "Dårligt";
  return "Meget Dårligt";
}

// Icon mapping
function getIconForCondition(condition?: WeatherCondition): string {
  switch (condition) {
    case "sunny":
      return "/WeatherTransIcons/Sunny.png";
    case "partly-cloudy":
      return "/WeatherTransIcons/CloudyDay.png";
    case "cloudy":
      return "/WeatherTransIcons/Cloudy.png";
    case "rain":
    case "drizzle":
      return "/WeatherTransIcons/Rain.png";
    case "snow":
    case "sleet":
    case "hail":
      return "/WeatherTransIcons/Snow.png";
    case "thunder":
      return "/WeatherTransIcons/Thunder.png";
    default:
      return "/WeatherTransIcons/CloudyDay.png";
  }
}

export default function Running({
  temperatureC,
  condition,
  windSpeedMs,
}: RunningProps) {
  const runningLabel = computeRunningLabel(
    temperatureC,
    condition,
    windSpeedMs
  );
  const conditionIcon = getIconForCondition(condition);

  const windText =
    typeof windSpeedMs === "number"
      ? `Vindhastighed op til ${windSpeedMs.toFixed(1)} m/s`
      : "Vindhastighed ikke tilgængelig";

  return (
    <main>
      <div
        className="w-40 h-40 bg-white rounded-3xl"
        role="region"
        aria-label="Løb widget: viser aktuelle forhold og anbefaling"
      >
        {/* Header: Running + dynamic condition label */}
        <div className="flex flex-row justify-center items-center gap-12 text-[#4D4D4D]">
          <h1 className="mt-2 ml-1 text-md font-bold">Løb</h1>
          <h1
            className="mt-2 text-xs"
            aria-label={`Løbe anbefaling: ${runningLabel}`}
          >
            {runningLabel}
          </h1>
        </div>

        {/* Running icon */}
        <div className="flex flex-row justify-center mt-[-10]">
          <Image
            className="mt-0"
            src="/WeatherTransIcons/Running.png"
            alt="Løbe ikon"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* Dynamic wind text */}
        <h1
          className="text-[#4D4D4D] text-center text-xs mt-[-15]"
          aria-label={windText}
        >
          {windText.split("op til")[0]} <br />
          {windText.includes("op til") ? windText.split("op til")[1] : windText}
        </h1>

        {/* Bottom: current weather condition icon */}
        <div className="flex flex-col justify-center items-center mt-0">
          <h1 className="text-[#4D4D4D] text-center text-xs font-bold">
            Nuværende
          </h1>
          <Image
            className="mt-[-4]"
            src={conditionIcon}
            alt={`Aktuelt vejr: ${condition ?? "ukendt"}`}
            width={30}
            height={30}
            priority
          />
        </div>
      </div>
    </main>
  );
}
