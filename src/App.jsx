import { useState } from "react";
import QuizIntro from "./components/QuizIntro";
import SearchInput from "./components/SearchInput";
import CharacterDisplay from "./components/CharacterDisplay";
import LogoTransition from "./components/LogoTransition";
import { useGame } from "./context/GameContext";
import GameHUD from "./components/GameHUD";
import LevelUpToast from "./components/LevelUpToast";

import axios from "axios";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const { addCharacter, score, level } = useGame();

  const handleQuizFinish = () => {
    setShowLogo(true);
  };

  const handleFinishLogo = () => {
    setShowLogo(false);
    setStartGame(true);
  };

  const handleSearch = async (name) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      const firstResult = response.data.results[0];
      setCharacter(firstResult);
      setError(null);

      addCharacter(firstResult);
    } catch (err) {
      setCharacter(null);
      setError(
        "Ei, seu buraco negro da informação... Não achei nada aqui. Se vira!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-300 px-4 relative overflow-hidden">
      {/* Fundo com estrelas animadas */}
      <div className="absolute inset-0 z-0 animate-stars bg-[radial-gradient(#ffffff22_1px,transparent_1px)] bg-[length:5px_6px]" />

      {/* HUD e levelUp visíveis apenas quando o jogo começou */}
      {startGame && <GameHUD />}
      {startGame && <LevelUpToast />}

      {/* Conteúdo principal sobre o fundo */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        {showLogo ? (
          <LogoTransition onFinish={handleFinishLogo} />
        ) : !startGame ? (
          <QuizIntro onFinish={handleQuizFinish} />
        ) : (
          <>
            <SearchInput onSearch={handleSearch} />

            {error && (
              <p
                className="text-red-400 font-bold text-xl m-4 p-2 text-center"
                aria-live="polite"
              >
                {error}
              </p>
            )}

            {character && <CharacterDisplay character={character} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
