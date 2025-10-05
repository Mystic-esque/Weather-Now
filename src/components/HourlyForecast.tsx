import type { WeatherData } from "../types/weather";
import { useUnits } from "../context/UnitsContext";
import { useMemo, useState } from "react";
import { WeatherCodeMap } from "../utils/WeatherCodeMap";

type Props = {
  hourly: WeatherData["hourly"] | null | undefined;
};

const HourlyForecast = ({ hourly }: Props) => {
  const { units } = useUnits();
  const [dayFilter, setDayFilter] = useState<string>("");

  if (!hourly || !hourly.time?.length) {
    return (
      <div className="bg-neut-800 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-2">Hourly Forecast</h3>
        <p className="text-neut-400">No forecast available</p>
      </div>
    );
  }

  // Group hours by day (e.g., "Tue Sep 30")
  const groupedByDay = useMemo(() => {
    const map: Record<string, { time: string; icon: string; temp: string }[]> =
      {};

    hourly.time.forEach((t, idx) => {
      const date = new Date(t);
      const dayLabel = date.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Tuesday"

      const label = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const code = hourly.weathercode?.[idx];
      const icon =
        (code !== undefined && WeatherCodeMap[code]) || WeatherCodeMap[0]; // fallback sunny

      const tempRaw = hourly.temperature_2m?.[idx] ?? 0;
      const temp =
        units.temperature === "celsius"
          ? `${Math.round(tempRaw)}°C`
          : `${Math.round(tempRaw * 1.8 + 32)}°F`;

      if (!map[dayLabel]) map[dayLabel] = [];
      map[dayLabel].push({ time: label, icon, temp });
    });

    return map;
  }, [hourly, units.temperature]);

  // Get available days (keys of groupedByDay)
  const days = Object.keys(groupedByDay);
  const currentDay = days[0]; // first day in forecast
  const activeDay = dayFilter || currentDay;

  return (
    <div className="bg-neut-800 border border-white/10 rounded-2xl p-6 flex flex-col max-h-158 md:max-h-175">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Hourly Forecast</h3>
        <select
          className="bg-neut-700 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={activeDay}
          onChange={(e) => setDayFilter(e.target.value)}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col space-y-2 overflow-y-auto pr-2">
        {groupedByDay[activeDay]?.map((h, idx) => (
          <div
            key={`${activeDay}-${idx}`}
            className="flex justify-between items-center bg-neut-700 rounded-xl px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={h.icon}
                alt="Weather icon"
                className="w-6 h-6 object-contain"
              />
              <span>{h.time}</span>
            </div>
            <span className="font-semibold">{h.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
