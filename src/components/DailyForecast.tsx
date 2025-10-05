import type { WeatherData } from "../types/weather";
import { useUnits } from "../context/UnitsContext";
import { WeatherCodeMap } from "../utils/WeatherCodeMap";

type Props = {
  daily: WeatherData["daily"] | null | undefined;
};

const DailyForecast = ({ daily }: Props) => {
  const { units } = useUnits();

  if (!daily || !daily.time?.length) {
    return (
      <div className="py-6 text-neut-400">
        <h3 className="mb-4 font-semibold">Daily Forecast</h3>
        <p>No forecast available</p>
      </div>
    );
  }

  const days = daily.time.map((t, idx) => {
    const date = new Date(t);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    const max = daily.temperature_2m_max?.[idx] ?? 0;
    const min = daily.temperature_2m_min?.[idx] ?? 0;
    const code = daily.weathercode?.[idx];

    const high =
      units.temperature === "celsius"
        ? `${Math.round(max)}°C`
        : `${Math.round(max * 1.8 + 32)}°F`;

    const low =
      units.temperature === "celsius"
        ? `${Math.round(min)}°C`
        : `${Math.round(min * 1.8 + 32)}°F`;

    const icon =
      (code !== undefined && WeatherCodeMap[code]) || WeatherCodeMap[0]; // fallback sunny

    return {
      day,
      icon,
      high,
      low,
    };
  });

  return (
    <div className="py-6">
      <h3 className="mb-4 font-semibold">Daily Forecast</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {days.map((d) => (
          <div
            key={d.day}
            className="flex flex-col items-center bg-neut-700 bg-blue-glow border border-white/10 rounded-xl px-3 py-4 space-y-6"
          >
            <span className="font-semibold">{d.day}</span>
            <img
              src={d.icon}
              alt="Weather icon"
              className="w-10 h-10 object-contain"
            />
            <div className="flex items-center justify-between w-full text-sm text-neut-300">
              <span>{d.high}</span>
              <span>{d.low}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
