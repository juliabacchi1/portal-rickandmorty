import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

const LOCAL_STORAGE_KEY = "rickandmorty_game";

export const GameProvider = ({ children }) => {
  // Tenta carregar do localStorage ou inicializa
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

  // Salva tudo no localStorage sempre que algo mudar
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

  // Atualiza o level baseado no score e total de personagens
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
      // Depois de mostrar mensagem, limpa ela depois de alguns segundos (ex: 3s)
      setTimeout(() => setLevelUpMessage(null), 3000);
      // Também pode salvar achievement de level, se quiser:
      addAchievement(`Nível ${newLevel} alcançado!`);
    }
  };

  // Evita duplicatas nas conquistas
  const addAchievement = (achievement) => {
    setAchievements((prev) => {
      if (!prev.includes(achievement)) return [...prev, achievement];
      return prev;
    });
  };

  // Evita duplicatas nos cards colecionáveis
  const addCollectedCard = (card) => {
    setCollectedCards((prev) => {
      if (!prev.find((c) => c.id === card.id)) return [...prev, card];
      return prev;
    });
  };

  // Função para adicionar personagem descoberto, atualizar score, level e cards
  const addCharacter = (character) => {
    if (!discoveredCharacters.includes(character.id)) {
      setDiscoveredCharacters((prev) => [...prev, character.id]);
      const newScore = score + 10;
      setScore(newScore);
      updateLevel(newScore);

      // Aqui podemos adicionar lógica pra dar cards a cada 4 personagens descobertos
      const totalDiscovered = discoveredCharacters.length + 1;
      if (totalDiscovered % 4 === 0) {
        const newCard = {
          id: character.id,
          name: character.name,
          image: character.image,
        };
        addCollectedCard(newCard);
        addAchievement(
          `Você desbloqueou um card colecionável: ${character.name}`
        );
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
