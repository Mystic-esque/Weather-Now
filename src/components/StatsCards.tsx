import { useUnits } from "../context/UnitsContext";
import type { WeatherData } from "../types/weather";

type Props = {
  data: WeatherData["current_weather"] | null | undefined;
};

const StatsCards = ({ data }: Props) => {
  const { units } = useUnits();

  if (!data) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 text-neut-400">
        <div className="col-span-3 sm:col-span-4 flex justify-center">
          No stats available
        </div>
      </div>
    );
  }

  const feelsLike =
    units.temperature === "celsius"
      ? `${Math.round(data.apparent_temperature ?? 0)}°C`
      : `${Math.round((data.apparent_temperature ?? 0) * 1.8 + 32)}°F`;

  const humidity = `${Math.round(data.relativehumidity ?? 0)}%`;

  const wind =
    units.windspeed === "kmh"
      ? `${Math.round(data.windspeed ?? 0)} km/h`
      : `${Math.round((data.windspeed ?? 0) / 1.609)} mph`;

  const precipitation =
    units.precipitation === "mm"
      ? `${(data.precipitation ?? 0).toFixed(1)} mm`
      : `${((data.precipitation ?? 0) / 25.4).toFixed(2)} in`;

  const stats = [
    { label: "Feels Like", value: feelsLike },
    { label: "Humidity", value: humidity },
    { label: "Wind", value: wind },
    { label: "Precipitation", value: precipitation },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-neut-800 bg-blue-glow border border-white/10 rounded-xl p-4 flex flex-col items-start space-y-5"
        >
          <span className="text-neut-300 text-wrap">{stat.label}</span>
          <span className="text-xl font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
