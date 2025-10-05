import React, { useRef, useState } from "react";
import debounce from "lodash.debounce";
import { Search, Mic, MicOff } from "lucide-react";
import type { Location } from "../types/weather";

type SearchBarProps = {
  onSelect: (loc: Location) => void;
  setError?: (err: { message?: string } | null) => void; // added for error handling
};

type GeoResult = {
  id?: string | number;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};

export default function SearchBar({ onSelect, setError }: SearchBarProps) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);

  //  Call Open-Meteo geocoding API
  const geocode = async (term: string) => {
    if (!term || term.length < 2) {
      setResults([]);
      setOpen(false);
      setError?.(null);
      return;
    }

    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        term
      )}&count=8&language=en`;
      const res = await fetch(url);
      const json = await res.json();

      const found = json.results ?? [];
      setResults(found);
      setOpen(found.length > 0);
      
      console.log("geocode results", found);

      if (found.length === 0) {
        //  no matches found
        setError?.({ message: "NO_RESULTS" });
      } else {
        setError?.(null);
      }
    } catch (err) {
      console.error("geocode error", err);
      setResults([]);
      setOpen(false);
      //  API/network error
      setError?.({ message: "FAILED_GEOCODE" });
    }
  };

  // Debounced search
  const debounced = useRef(debounce(geocode, 350)).current;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQ(v);
    debounced(v);
  }

  function handleSelect(item: GeoResult) {
    const loc: Location = {
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone ?? "auto",
      country: item.country,
      admin1: item.admin1,
    };
    setQ(
      `${item.name}${item.admin1 ? `, ${item.admin1}` : ""}${
        item.country ? `, ${item.country}` : ""
      }`
    );
    setResults([]);
    setOpen(false);
    setError?.(null); // clear error when valid selection made
    onSelect(loc);
  }

  // 🎙 Voice search
  function handleVoiceSearch() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎤 Voice input:", transcript);
      setQ(transcript);
      geocode(transcript);
    };

    recognition.start();
  }

  return (
    <div className="mx-auto max-w-[700px] px-4 lg:px-8 pb-4 relative">
      <div className="flex items-center gap-3">
        {/* Input with search + mic inside */}
        <div className="flex-1 relative">
          <input
            value={q}
            onChange={handleChange}
            placeholder="Search for a place..."
            className="w-full rounded-xl border border-white/10 bg-[hsl(243,23%,24%)]/70 px-4 py-3 pl-10 pr-12 text-[hsl(250,6%,84%)] placeholder-[hsl(240,6%,70%)] outline-none focus:border-[hsl(233,67%,56%)] focus:ring-2 focus:ring-[hsl(233,67%,56%)]"
            aria-label="Search for a place"
          />

          {/* Left search icon */}
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(240,6%,70%)]"
            aria-hidden
          />

          {/* Right voice button inside input */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(240,6%,70%)] hover:text-white"
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>

        {/* Outer search button */}
        <button
          onClick={() => geocode(q)}
          className="rounded-xl bg-[hsl(233,67%,56%)] px-6 py-3 text-sm font-medium text-white hover:bg-[hsl(248,70%,36%)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[hsl(233,67%,56%)] focus:ring-offset-[hsl(243,96%,9%)]"
        >
          Search
        </button>
      </div>

      {/* Dropdown results */}
      {open && results.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border border-white/10 bg-[hsl(243,23%,24%)] shadow-lg">
          {results.map((item) => (
            <button
              key={`${item.id}-${item.latitude}-${item.longitude}`}
              onClick={() => handleSelect(item)}
              className="block w-full px-4 py-2 text-left text-[hsl(250,6%,84%)] hover:bg-[hsl(248,70%,20%)]"
            >
              {item.name}
              {item.admin1 ? `, ${item.admin1}` : ""}
              {item.country ? `, ${item.country}` : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
