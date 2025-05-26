import { useGame } from "../context/GameContext";

const CardUnlockedToast = () => {
  const { cardUnlockedMessage } = useGame();

  if (!cardUnlockedMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-100 text-green-900 px-6 py-3 rounded-xl shadow-lg border border-green-300 animate-bounce">
      {cardUnlockedMessage}
    </div>
  );
};

export default CardUnlockedToast;
