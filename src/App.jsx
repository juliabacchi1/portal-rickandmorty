import { useState } from "react";
import QuizIntro from "./components/QuizIntro";
import SearchInput from "./components/SearchInput";
import CharacterDisplay from "./components/CharacterDisplay";
import LogoTransition from "./components/LogoTransition";
import { useGame } from "./context/GameContext";
import GameHUD from "./components/GameHUD";
import LevelUpToast from "./components/LevelUpToast";
import CardGallery from "./components/CardGallery";
import CardUnlockedToast from "./components/CardUnlockedToast";
import axios from "axios";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [showLogo, setShowLogo] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const { addCharacter, levelUpMessage, cardUnlockedMessage } = useGame();

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
      <div className="absolute inset-0 z-0 animate-stars bg-[radial-gradient(#ffffff22_1px,transparent_1px)] bg-[length:5px_6px]" />
      {/* HUD e toasts visíveis apenas quando o jogo começou */}
      {startGame && <GameHUD />}
      {startGame && levelUpMessage && <LevelUpToast />}
      {startGame && cardUnlockedMessage && <CardUnlockedToast />}
      {/* Botão para abrir/fechar galeria */}
      {startGame && (
        <button
          onClick={() => setShowGallery((v) => !v)}
          className="fixed top-4 right-4 z-20 bg-green-900/80 text-green-200 py-1 px-3 rounded hover:bg-green-700 transition"
        >
          {showGallery ? "Voltar ao jogo" : "Abrir Galeria"}
        </button>
      )}
      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        {showGallery ? (
          <CardGallery />
        ) : showLogo ? (
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
