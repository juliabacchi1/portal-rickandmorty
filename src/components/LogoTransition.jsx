import { useEffect, useState } from "react";

export default function LogoTransition({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 pointer-events-none">
      <img
        className={`max-w-[200px] md:max-w-[300px] transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        src="/logo.webp"
        alt="Rick and Morty"
      />
    </div>
  );
}
