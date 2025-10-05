import Loader from "../assets/images/icon-loading.svg";

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
