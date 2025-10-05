# 🌦️ Weather App — Frontend Mentor Challenge Solution

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Open-Meteo API](https://img.shields.io/badge/API-Open%20Meteo-0F172A)](https://open-meteo.com/)
[![Frontend Mentor](https://img.shields.io/badge/Challenge-Frontend%20Mentor-F74780)](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)

This is my solution to the [Weather App Challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49) on Frontend Mentor.  
The app provides accurate weather data powered by the **Open-Meteo API**, built with **React + TypeScript + Tailwind CSS**, and features live search, hourly & daily forecasts, and beautiful responsive design.

---

##  Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

##  Overview

### The Challenge

Users should be able to:

- Search for weather information by entering a location  
- View **current weather conditions**, including temperature, weather icon, and location details  
- See **additional metrics** (feels like temperature, humidity, wind speed, precipitation)  
- Browse a **7-day forecast** with daily highs/lows and condition icons  
- View an **hourly forecast** showing temperature changes throughout the day  
- Toggle between **metric and imperial units** (Celsius/Fahrenheit, km/h/mph, mm/in)  
- Enjoy a **responsive, mobile-first layout** optimized for all screen sizes  
- See **hover and focus states** for all interactive elements  
- Experience graceful **loading states and no-results messages**
- Search for **weather information** by entering location in search bar 
- Use  **a Voice Search** option to find location

---



---

###  Links

- **Solution URL:** [https://www.frontendmentor.io/profile/Mystic-esque/solutions/](#)
- **Live Site URL:** [https://your-weather-app.vercel.app](#)
- **Repository:** [https://github.com/mystic-esque/Weather-now](#)

---

##  My Process

###  Built With

-  **React + TypeScript**
-  **Tailwind CSS** for styling and layout
-  **Vite** for fast build setup
- **Web Speech API** for voice search
-  **Lodash.debounce** for optimized search
-  **Open-Meteo API** for weather & geocoding
-  **Component-driven architecture** with reusable hooks and utilities
- **Skeleton loaders** for smooth user experience during fetches

---

###  What I Learned

This project deepened my understanding of:

- Structuring a **custom React hook (`useWeather`)** for data fetching and error handling  
- Managing **loading, error, and no-result states** in a user-friendly way  
- Implementing **debounced geocoding search** for efficient API usage  
- Designing a **modular weather dashboard** (Current, Hourly, and Daily forecasts)  
- Mapping **weather codes to condition icons** dynamically via a utility file  
- Combining **real-world APIs** with responsive UI and state-driven behavior 
- Customize **variants for reusable components** for various purpose
- Use hook for **Typewriter Effect** for dynamic text display


Example: you can customize variants for components with less code
```tsx
// Skeleton loader
type SkeletonProps = {
  className?: string;
  variant?: "default" | "currentWeather"; // new variant
};

const Skeleton = ({ className = "", variant = "default" }: SkeletonProps) => {
  if (variant === "currentWeather") {
    return (
      <div
        className={`relative rounded-2xl bg-[hsl(243,23%,24%)]/60 flex flex-col items-center justify-center ${className}`}
      >
        <img
          src={Loader}
          alt="Loading..."
          className="w-10 h-10 animate-spin mb-3"
        />
        <span className="text-neut-300">Loading...</span>
      </div>
    );
  }

  // default blank pulsing skeleton
  return (
    <div
      className={`animate-pulse rounded-xl bg-[hsl(243,23%,24%)]/60 ${className}`}
    />
  );
};

export default Skeleton;
```
```tsx
 <Skeleton variant="currentWeather" className="h-[220px]" />
 {/* CurrentWeather skeleton with loader */}
 ```

 
## Author

- Frontend Mentor - [@Mystic-esque](https://www.frontendmentor.io/profile/Mystic-esque)
- Discord - [@mysticx404]
