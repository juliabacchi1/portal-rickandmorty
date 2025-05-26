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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite o nome (ex: Rick)"
        className="px-4 py-2 rounded bg-gray-800 text-green-300 placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400"
      >
        Buscar
      </button>
    </form>
  );
}
