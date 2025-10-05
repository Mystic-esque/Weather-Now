import { format } from "date-fns";
import { useUnits } from "../context/UnitsContext";
import type { WeatherData, Location } from "../types/weather";


import Backdrop from "../assets/images/bg-today-large.svg";
import SmallBackdrop from "../assets/images/bg-today-small.svg";
import { WeatherCodeMap } from "../utils/WeatherCodeMap";

type Props = {
  data: WeatherData["current_weather"] | null | undefined;
  location: Location | null;
  loading?: boolean;
};

const CurrentWeatherCard = ({ data, location }: Props) => {
  const { units } = useUnits();

 

  // No data
  if (!data || !location) {
    return (
      <div className="bg-neut-800 rounded-2xl px-6 py-20 flex justify-center items-center text-neut-400">
        No data available
      </div>
    );
  }

  // format temperature based on unit
  const temperature =
    units.temperature === "celsius"
      ? `${Math.round(data.temperature ?? 0)}°C`
      : `${Math.round(data.temperature! * 1.8 + 32)}°F`; // fallback conversion

  const dateStr = format(new Date(data.time), "EEEE, MMM d, yyyy");

  // Map weather code → icon asset
  const weatherIcon =
    (data.weathercode !== undefined && WeatherCodeMap[data.weathercode]) ||
    WeatherCodeMap[0]; // fallback to sunny

  return (
    <div className="relative bg-neut-800 py-5 rounded-2xl overflow-hidden">
      {/* Backgrounds */}
      <img
        src={Backdrop}
        alt="Backdrop"
        className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />
      <img
        src={SmallBackdrop}
        alt="Small backdrop"
        className="block md:hidden absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Content */}
      <div className="relative  px-6 py-5 md:py-20 flex flex-col md:flex-row md:justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold">
            {location.name}, {location.country}
          </h2>
          <p className="text-neut-300">{dateStr}</p>
        </div>
        <div className="flex items-center gap-6 md:gap-4">
          <img
            src={weatherIcon}
            alt="Weather icon"
            className="w-30 h-30 object-contain"
          />
          <span className="text-5xl font-semibold">{temperature}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
