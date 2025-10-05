import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import type { WeatherData, Units } from "../types/weather";

type UseWeatherArgs = {
  lat?: number;
  lon?: number;
  timezone?: string;
  units: Units;
};

// define a proper error type
type WeatherError = { message: string };

type State = {
  loading: boolean;
  error: WeatherError | null; // 
  data: WeatherData | null;
};

const HOURLY_VARS = [
  "temperature_2m",
  "apparent_temperature",
  "relativehumidity_2m",
  "precipitation",
  "weathercode",
  "windspeed_10m",
];

const DAILY_VARS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "weathercode",
  "sunrise",
  "sunset",
];

const toArray = (val: any): any[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try {
    return Array.from(val);
  } catch {
    return [];
  }
};

export default function useWeather({
  lat,
  lon,
  timezone = "auto",
  units,
}: UseWeatherArgs) {
  const [state, setState] = useState<State>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!lat || !lon) {
      setState({ loading: false, error: null, data: null });
      return;
    }

    let mounted = true;

    const fetcher = async (attempt = 1): Promise<void> => {
      setState({ loading: true, error: null, data: null });

      try {
        const params: Record<string, any> = {
          latitude: lat,
          longitude: lon,
          timezone,
          current: HOURLY_VARS,
          hourly: HOURLY_VARS.join(","),
          daily: DAILY_VARS.join(","),
          temperature_unit: units.temperature,
          windspeed_unit: units.windspeed,
          precipitation_unit: units.precipitation,
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params, 15000);

        if (!responses || responses.length === 0) {
          throw new Error("No response from Open-Meteo");
        }

        const resp: any = responses[0];
        const utcOffsetSeconds =
          typeof resp.utcOffsetSeconds === "function"
            ? Number(resp.utcOffsetSeconds?.())
            : 0;

        // HOURLY
        const hourlyObject = resp.hourly?.();
        const hStart = Number(hourlyObject?.time?.());
        const hEnd = Number(hourlyObject?.timeEnd?.());
        const hInterval = Number(hourlyObject?.interval?.()) || 3600;
        const hLen = Math.max(0, Math.floor((hEnd - hStart) / hInterval));

        const hourlyTime: string[] = Array.from({ length: hLen }, (_, i) =>
          new Date(
            (hStart + i * hInterval + (utcOffsetSeconds || 0)) * 1000
          ).toISOString()
        );

        const hourlyVars: Record<string, number[]> = {};
        HOURLY_VARS.forEach((v, idx) => {
          try {
            const varObj = hourlyObject?.variables
              ? hourlyObject.variables(idx)
              : null;
            hourlyVars[v] = toArray(varObj?.valuesArray?.());
          } catch {
            hourlyVars[v] = [];
          }
        });

        // DAILY
        const dailyObj = resp.daily?.();
        const dStart = Number(dailyObj?.time?.());
        const dEnd = Number(dailyObj?.timeEnd?.());
        const dInterval = Number(dailyObj?.interval?.()) || 86400;
        const dLen = Math.max(0, Math.floor((dEnd - dStart) / dInterval));

        const dailyTime: string[] = Array.from({ length: dLen }, (_, i) =>
          new Date(
            (dStart + i * dInterval + (utcOffsetSeconds || 0)) * 1000
          ).toISOString()
        );

        const dailyVars: Record<string, any[]> = {};
        DAILY_VARS.forEach((v, idx) => {
          try {
            const raw = dailyObj?.variables?.(idx)?.valuesArray?.();
            dailyVars[v] = toArray(raw);
          } catch {
            dailyVars[v] = [];
          }
        });

        // CURRENT
        const currentObj = resp.current?.();
        const current = currentObj
          ? {
              temperature: currentObj.variables(0)?.value(),
              apparent_temperature: currentObj.variables(1)?.value(),
              relativehumidity: currentObj.variables(2)?.value(),
              precipitation: currentObj.variables(3)?.value(),
              weathercode: currentObj.variables(4)?.value(),
              windspeed: currentObj.variables(5)?.value(),
              time: new Date(
                (Number(currentObj.time()) + utcOffsetSeconds) * 1000
              ).toISOString(),
            }
          : undefined;

        const mapped: WeatherData = {
          latitude:
            typeof resp.latitude === "function" ? resp.latitude() : resp.latitude,
          longitude:
            typeof resp.longitude === "function"
              ? resp.longitude()
              : resp.longitude,
          elevation:
            typeof resp.elevation === "function"
              ? resp.elevation()
              : resp.elevation,
          utcOffsetSeconds,
          current_weather: current,
          hourly: {
            time: hourlyTime,
            temperature_2m: hourlyVars["temperature_2m"] ?? [],
            apparent_temperature: hourlyVars["apparent_temperature"] ?? [],
            relativehumidity_2m: hourlyVars["relativehumidity_2m"] ?? [],
            precipitation: hourlyVars["precipitation"] ?? [],
            weathercode: hourlyVars["weathercode"] ?? [],
            windspeed_10m: hourlyVars["windspeed_10m"] ?? [],
          },
          daily: {
            time: dailyTime,
            temperature_2m_max: dailyVars["temperature_2m_max"] ?? [],
            temperature_2m_min: dailyVars["temperature_2m_min"] ?? [],
            weathercode: dailyVars["weathercode"] ?? [],
            sunrise: dailyVars["sunrise"] ?? [],
            sunset: dailyVars["sunset"] ?? [],
          },
        };

        if (!mounted) return;
        setState({ loading: false, error: null, data: mapped });
      } catch (err: any) {
        if (!mounted) return;

        if (attempt < 3) {
          console.warn(`Retrying fetch (attempt ${attempt + 1})…`);
          setTimeout(() => fetcher(attempt + 1), 500 * attempt);
        } else {
          setState({
            loading: false,
            error: { message: err?.message ?? "Unknown error" }, // now object
            data: null,
          });
        }
      }
    };

    fetcher();

    return () => {
      mounted = false;
    };
  }, [
    lat,
    lon,
    timezone,
    units.temperature,
    units.windspeed,
    units.precipitation,
  ]);

  return { loading: state.loading, error: state.error, data: state.data };
}
