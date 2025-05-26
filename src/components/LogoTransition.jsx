import { useEffect } from "react";

export default function LogoTransition({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // chama a função que carrega a próxima tela
    }, 2000);

    return () => clearTimeout(timer); // limpeza
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-black z-50 fixed inset-0">
      <img
        className="max-w-[200px] md:max-w-[300px]"
        src="/logo.webp"
        alt="Rick and Morty"
      />
    </div>
  );
}
