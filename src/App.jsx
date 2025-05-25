import { useState } from "react";
import QuizIntro from "./components/QuizIntro";
import SearchInput from "./components/SearchInput";
import CharacterDisplay from "./components/CharacterDisplay";
import axios from "axios";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (name) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      const firstResult = response.data.results[0];
      setCharacter(firstResult);
      setError(null);
    } catch (err) {
      setCharacter(null);
      setError("Personagem não encontrado!");
    }
  };

  return (
    <>
      {!startGame ? (
        <QuizIntro onFinish={() => setStartGame(true)} />
      ) : (
        <div className="min-h-screen bg-black text-white flex flex-col items-center gap-6">
          <img
            className="items-center max-w-[200px] md:max-w-[350px]"
            src="/logo.webp"
            alt="Título Rick and Morty"
          />
          <h1 className="text-2xl md:text-4xl">Escolha seu personagem!</h1>

          <SearchInput onSearch={handleSearch} />

          {error && <p className="text-red-400 font-bold">{error}</p>}

          {character && <CharacterDisplay character={character} />}
        </div>
      )}
    </>
  );
}

export default App;
