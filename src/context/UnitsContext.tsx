import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";


type Units = {
  temperature: "celsius" | "fahrenheit";
  windspeed: "kmh" | "mph";
  precipitation: "mm" | "in";
};

type UnitsContextType = {
  units: Units;
  setUnits: (u: Units) => void;
};

const defaultUnits: Units = {
  temperature: "celsius",
  windspeed: "kmh",
  precipitation: "mm",
};

const UnitsContext = createContext<UnitsContextType>({
  units: defaultUnits,
  setUnits: () => {},
});

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Units>(defaultUnits);

  
  const value = useMemo(() => ({ units, setUnits }), [units]);


  return (
    <UnitsContext.Provider value={value}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = () => useContext(UnitsContext);
