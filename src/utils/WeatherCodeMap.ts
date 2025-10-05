// utils/WeatherCodeMap.ts
import drizzle from "../assets/images/icon-drizzle.webp";
import fog from "../assets/images/icon-fog.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";
import sunny from "../assets/images/icon-sunny.webp";

/**
 * Maps Open-Meteo weather codes to corresponding icon assets.
 * Reference: https://open-meteo.com/en/docs
 */
export const WeatherCodeMap: Record<number, string> = {
  // Clear sky
  0: sunny,

  // Mainly clear, partly cloudy, overcast
  1: sunny,
  2: partlyCloudy,
  3: overcast,

  // Fog & depositing rime fog
  45: fog,
  48: fog,

  // Drizzle
  51: drizzle,
  53: drizzle,
  55: drizzle,

  // Freezing drizzle
  56: drizzle,
  57: drizzle,

  // Rain
  61: rain,
  63: rain,
  65: rain,

  // Freezing rain
  66: rain,
  67: rain,

  // Snow fall
  71: snow,
  73: snow,
  75: snow,

  // Snow grains
  77: snow,

  // Rain showers
  80: rain,
  81: rain,
  82: rain,

  // Snow showers
  85: snow,
  86: snow,

  // Thunderstorm
  95: storm,
  96: storm,
  99: storm,
};
