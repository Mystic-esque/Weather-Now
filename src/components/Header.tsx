import { useState, useEffect, useRef } from "react";
import { useUnits } from "../context/UnitsContext";
import Logo from "../assets/images/logo.svg";
import SettingsIcon from "../assets/images/icon-units.svg";
import ChevronDown from "../assets/images/icon-dropdown.svg";
import Checkmark from "../assets/images/icon-checkmark.svg";

const Header = () => {
  const { units, setUnits } = useUnits();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  //  Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleUnits = () => {
    if (units.temperature === "celsius") {
      setUnits({
        temperature: "fahrenheit",
        windspeed: "mph",
        precipitation: "in",
      });
    } else {
      setUnits({
        temperature: "celsius",
        windspeed: "kmh",
        precipitation: "mm",
      });
    }
    setOpen(false); // close after switching
  };

  return (
    <header className="flex items-center justify-between px-4 py-3">
      {/* Logo */}
      <img src={Logo} alt="WeatherNow Logo" className="h-6 md:h-8 w-auto select-none" />

      {/* ref and click-only behavior */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 rounded-lg bg-neut-700 hover:bg-neut-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img src={SettingsIcon} className="w-5 h-5" alt="Settings" />
          <span>Units</span>
          <img
            src={ChevronDown}
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
            alt="Chevron"
          />
        </button>

        {open && (
          <div className="absolute right-0 z-10 mt-2 w-56 bg-neut-700 text-neut-0 rounded-lg shadow-lg p-2">
            <button
              onClick={toggleUnits}
              className="w-full text-left px-3 py-2 rounded hover:bg-neut-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Switch to {units.temperature === "celsius" ? "Imperial" : "Metric"}
            </button>
            <hr className="border-neut-600 my-2" />

            {/* Temperature */}
            <div className="px-3 py-1 text-sm text-neut-300">Temperature</div>
            <div className="space-y-1">
              <div
                className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                  units.temperature === "celsius" ? "bg-neut-600" : ""
                }`}
              >
                <span>Celsius (°C)</span>
                {units.temperature === "celsius" && (
                  <img src={Checkmark} alt="Selected" className="w-4 h-4" />
                )}
              </div>
              <div
                className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                  units.temperature === "fahrenheit" ? "bg-neut-600" : ""
                }`}
              >
                <span>Fahrenheit (°F)</span>
                {units.temperature === "fahrenheit" && (
                  <img src={Checkmark} alt="Selected" className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Wind */}
            <div className="px-3 py-1 mt-2 text-sm text-neut-300">Wind</div>
            <div className="space-y-1">
              <div
                className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                  units.windspeed === "kmh" ? "bg-neut-600" : ""
                }`}
              >
                <span>km/h</span>
                {units.windspeed === "kmh" && (
                  <img src={Checkmark} alt="Selected" className="w-4 h-4" />
                )}
              </div>
              <div
                className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                  units.windspeed === "mph" ? "bg-neut-600" : ""
                }`}
              >
                <span>mph</span>
                {units.windspeed === "mph" && (
                  <img src={Checkmark} alt="Selected" className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Precipitation */}
            <div className="px-3 py-1 mt-2 text-sm text-neut-300">Precipitation</div>
            <div className="space-y-1">
              <div
                className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                  units.precipitation === "mm" ? "bg-neut-600" : ""
                }`}
              >
                <span>Millimeters (mm)</span>
                {units.precipitation === "mm" && (
                  <img src={Checkmark} alt="Selected" className="w-4 h-4" />
                )}
              </div>
              <div
                className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                  units.precipitation === "in" ? "bg-neut-600" : ""
                }`}
              >
                <span>Inches (in)</span>
                {units.precipitation === "in" && (
                  <img src={Checkmark} alt="Selected" className="w-4 h-4" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
