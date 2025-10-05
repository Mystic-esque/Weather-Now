import { useTypewriter } from "../hooks/useTypewriter";

const Headline = () => {
  const headlines = [
    "How's the sky looking today?",
    "Hoping for a rain soon?",
    "Planning a sunny picnic?",
    "Checking if you'll need an umbrella?",
    "Wondering how cold tonight gets?",
  ];

  const text = useTypewriter(headlines);

  return (
    <h1 className="text-center leading-relaxed max-w-[1200px] text-3xl sm:text-6xl px-4 sm:px-8 pt-4 pb-3 font-grotesque ">
      {text}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default Headline;
