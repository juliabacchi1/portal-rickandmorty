import { useState } from "react";
import QuizIntro from "./components/QuizIntro";
import SearchInput from "./components/SearchInput";
import CharacterDisplay from "./components/CharacterDisplay";
import LogoTransition from "./components/LogoTransition";
import axios from "axios";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [showLogo, setShowLogo] = useState(false);

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
    } catch (err) {
      setCharacter(null);
      setError(
        "Ei, seu buraco negro da informação... Não achei nada aqui. Se vira!"
      );
    }
  };

  return (
    <>
      {!startGame && !showLogo && <QuizIntro onFinish={handleQuizFinish} />}

      {showLogo && <LogoTransition onFinish={handleFinishLogo} />}

      {startGame && !showLogo && (
        <div className="min-h-screen bg-black text-white flex flex-col items-center gap-y-2">

          <SearchInput onSearch={handleSearch} />

          {error && <p className="text-red-400 font-bold text-xl m-4 p-2 text-center">{error}</p>}

          {character && <CharacterDisplay character={character} />}
        </div>
      )}
    </>
  );
}

export default App;
