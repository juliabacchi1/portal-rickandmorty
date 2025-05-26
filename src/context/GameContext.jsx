import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();
const LOCAL_STORAGE_KEY = "rickandmorty_game";

// Lista fixa de cards disponíveis
const availableCards = [
  { id: 1, name: "Rick Sanchez", image: "/cards/1.webp" },
  { id: 2, name: "Morty Smith", image: "/cards/2.webp" },
  { id: 3, name: "Summer Smith", image: "/cards/3.webp" },
  { id: 4, name: "Beth Smith", image: "/cards/4.webp" },
  { id: 5, name: "Jerry Smith", image: "/cards/5.webp" },
  { id: 6, name: "Abadango Cluster Princess", image: "/cards/6.webp" },
];

export const GameProvider = ({ children }) => {
  const [discoveredCharacters, setDiscoveredCharacters] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).discoveredCharacters : [];
  });

  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).score : 0;
  });

  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).level : 1;
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).achievements : [];
  });

  const [collectedCards, setCollectedCards] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved).collectedCards : [];
  });

  const [levelUpMessage, setLevelUpMessage] = useState(null);
  const [cardUnlockedMessage, setCardUnlockedMessage] = useState(null);

  useEffect(() => {
    const dataToSave = {
      discoveredCharacters,
      score,
      level,
      achievements,
      collectedCards,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [discoveredCharacters, score, level, achievements, collectedCards]);

  const updateLevel = (newScore) => {
    const totalCharacters = 826;
    const percentage = (newScore / (totalCharacters * 10)) * 100;

    let newLevel;
    if (percentage >= 75) newLevel = 4;
    else if (percentage >= 50) newLevel = 3;
    else if (percentage >= 25) newLevel = 2;
    else newLevel = 1;

    if (newLevel > level) {
      setLevel(newLevel);
      setLevelUpMessage(`🏆 Você alcançou o nível ${newLevel}!`);
      setTimeout(() => setLevelUpMessage(null), 3000);
      addAchievement(`Nível ${newLevel} alcançado!`);
    }
  };

  const addAchievement = (achievement) => {
    setAchievements((prev) => {
      if (!prev.includes(achievement)) return [...prev, achievement];
      return prev;
    });
  };

  const addCollectedCard = (card) => {
    setCollectedCards((prev) => {
      if (!prev.find((c) => c.id === card.id)) return [...prev, card];
      return prev;
    });
  };

  const getRandomAvailableCard = () => {
    const unlockedIds = collectedCards.map((card) => card.id);
    const available = availableCards.filter(
      (card) => !unlockedIds.includes(card.id)
    );
    if (available.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  };

  const addCharacter = (character) => {
    if (!discoveredCharacters.includes(character.id)) {
      const newDiscovered = [...discoveredCharacters, character.id];
      setDiscoveredCharacters(newDiscovered);

      const newScore = score + 10;
      setScore(newScore);
      updateLevel(newScore);

      if (newDiscovered.length % 4 === 0) {
        const newCard = getRandomAvailableCard();
        if (newCard) {
          addCollectedCard(newCard);
          const message = `🃏 Você desbloqueou um card colecionável: ${newCard.name}`;
          addAchievement(message);
          setCardUnlockedMessage(message);
          setTimeout(() => setCardUnlockedMessage(null), 3000);
        }
      }
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
        addCharacter,
        addAchievement,
        addCollectedCard,
        levelUpMessage,
        cardUnlockedMessage,
        availableCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
