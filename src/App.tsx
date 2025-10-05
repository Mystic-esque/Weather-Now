import { useState } from "react";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import DailyForecast from "./components/DailyForecast";
import Header from "./components/Header";
import Headline from "./components/Headline";
import HourlyForecast from "./components/HourlyForecast";
import SearchBar from "./components/SearchBar";
import StatsCards from "./components/StatsCards";
import useWeather from "./hooks/useWeather";
import type { Location } from "./types/weather";
import Skeleton from "./components/Skeleton"; 

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [appError, setAppError] = useState<{ message?: string } | null>(null);

  const units = {
    temperature: "celsius",
    windspeed: "kmh",
    precipitation: "mm",
  } as const;

  const { data, loading, error } = useWeather({
    lat: location?.latitude,
    lon: location?.longitude,
    timezone: location?.timezone || "auto",
    units,
  });

  return (
    <div className="min-h-screen bg-neut-900 text-neut-0 font-sans">
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <Header />
        <Headline />
        <SearchBar onSelect={setLocation} setError={setAppError} />

{/* ---------- States ---------- */}
{!location && !loading && !error && !appError && (
  <p className="mt-6 text-center text-neut-300">
    Search for a city to see the weather 🌍
  </p>
)}

{appError?.message === "NO_RESULTS" && (
  <p className="mt-6 text-2xl font-bold text-center text-white">
    No search result found!
  </p>
)}

{loading && (
  <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      {/* CurrentWeather skeleton with loader */}
      <Skeleton variant="currentWeather" className="h-[220px]" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>

      <Skeleton className="h-[150px]" />
    </div>
    <Skeleton className="h-[420px]" />
  </section>
)}

{error && error?.message !== "NO_RESULTS" && (
  <div className="max-w-lg mx-auto mt-20 text-center">
    <div className="rounded-2xl border border-white/10 bg-[hsl(243,27%,20%)] p-10">
      <div className="text-2xl">⚠️</div>
      <h2 className="mt-2 text-xl font-semibold">Something went wrong</h2>
      <p className="mt-1 text-neut-300">
        Couldn’t fetch weather. Please try again.
      </p>
      <button
        onClick={() => setLocation(null)}
        className="mt-4 rounded-xl bg-bluew-500 px-4 py-2 text-white hover:bg-bluew-600"
      >
        Retry
      </button>
    </div>
  </div>
)}

{data && (
  <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Left side */}
    <div className="lg:col-span-2 space-y-6">
      <CurrentWeatherCard
        data={data?.current_weather}
        location={location}
      />

      <StatsCards data={data?.current_weather} />

      <DailyForecast daily={data?.daily} />
    </div>

    {/* Right side */}
    <HourlyForecast hourly={data?.hourly} />
  </section>
)}

      </main>
    </div>
  );
}

export default App;
