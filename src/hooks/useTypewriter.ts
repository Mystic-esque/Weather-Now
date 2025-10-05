import { useState, useEffect } from "react";

export function useTypewriter(
  texts: string[],
  typingSpeed: number = 120,
  deletingSpeed: number = 50,
  pauseTime: number = 1500
) {
  const [index, setIndex] = useState(0); // which text
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index % texts.length];
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    const handleTyping = () => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          const next = current.substring(0, prev.length + 1);
          if (next === current) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
          return next;
        } else {
          const next = current.substring(0, prev.length - 1);
          if (next === "") {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % texts.length);
          }
          return next;
        }
      });
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}
