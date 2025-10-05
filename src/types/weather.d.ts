export type Location = {
  name: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  country?: string;
  admin1?: string;
};

export type HourlyData = {
  time: string[]; // ISO strings
  temperature_2m: number[];
  apparent_temperature?: number[];
  relativehumidity_2m?: number[];
  precipitation?: number[];
  weathercode?: number[];
  windspeed_10m?: number[];
};

export type DailyData = {
  time: string[]; // ISO date strings (one per day)
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode?: number[];
  sunrise?: string[];
  sunset?: string[];
};

export type WeatherData = {
  latitude?: number;
  longitude?: number;
  elevation?: number;
  utcOffsetSeconds?: number;
  current_weather?: {
    temperature: number;
    apparent_temperature: number;
    relativehumidity: number;
    precipitation: number;
    windspeed: number;
    weathercode: number;
    time: string; // ISO string
  };
  hourly?: HourlyData;
  daily?: DailyData;
};

export type UnitSystem = "metric" | "imperial";

export type Units = {
  temperature: "celsius" | "fahrenheit";
  windspeed: "kmh" | "mph";
  precipitation: "mm" | "inch";
};

