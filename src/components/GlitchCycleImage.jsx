import { useState, useEffect } from "react";
import "../styles/glitch.css";

const GlitchCycleImage = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src="/hello.webp"
      alt="Rick and Morty Glitch"
      className={`w-full max-w-[200px] md:max-w-[450px] ${
        glitch ? "glitch" : ""
      }`}
    />
  );
};

export default GlitchCycleImage;
