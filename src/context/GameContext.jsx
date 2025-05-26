import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [discoveredCharacters, setDiscoveredCharacters] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [collectedCards, setCollectedCards] = useState([]);

  // Atualiza o level baseado no score
  const updateLevel = (newScore) => {
    if (newScore >= 100) setLevel(3);
    else if (newScore >= 50) setLevel(2);
    else setLevel(1);
  };

  const addCharacter = (character) => {
    if (!discoveredCharacters.includes(character.id)) {
      setDiscoveredCharacters((prev) => [...prev, character.id]);
      const newScore = score + 10;
      setScore(newScore);
      updateLevel(newScore);
    }
  };

  return (
    <GameContext.Provider
      value={{
        discoveredCharacters,
        score,
        level,
        achievements,
        collectedCards,
        setAchievements,
        setCollectedCards,
        addCharacter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
