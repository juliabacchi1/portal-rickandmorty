import { useState } from "react";

export default function SearchInput({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      onSearch(value.trim());
      setValue("");
    }
  };

  return (
    <div className="relative mt-10 md:mt-0">
      <h1 className="text-[22px] md:text-4xl m-4 pt-6">
        Escolha seu personagem!
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 justify-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Digite o nome (ex: Rick)"
          aria-label="Campo de busca de personagem"
          className="px-4 py-2 rounded bg-gray-800 text-green-300 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
