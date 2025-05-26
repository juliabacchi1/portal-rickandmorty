import { useGame } from "../context/GameContext";

const LevelUpToast = () => {
  const { levelUpMessage } = useGame();

  if (!levelUpMessage) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-yellow-100 text-yellow-900 px-6 py-3 rounded-xl shadow-lg border border-yellow-300 animate-bounce">
      {levelUpMessage}
    </div>
  );
};

export default LevelUpToast;
