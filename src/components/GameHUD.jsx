import { useGame } from "../context/GameContext";
import { RocketIcon, FlaskConicalIcon, UsersIcon } from "lucide-react"; // ou qualquer outro ícone que você goste

const GameHUD = () => {
  const { score, level, discoveredCharacters } = useGame();

  return (
    <div className="absolute top-4 left-4 z-20 bg-green-950/80 text-green-200 px-4 py-3 rounded-xl shadow-md backdrop-blur-md border border-green-400/30 space-y-1 text-sm md:text-base">
      <div className="flex items-center gap-2">
        <FlaskConicalIcon size={18} />
        <span>
          XP: <strong>{score}</strong>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <RocketIcon size={18} />
        <span>
          Nível: <strong>{level}</strong>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <UsersIcon size={18} />
        <span>
          Descobertos: <strong>{discoveredCharacters.length}</strong>
        </span>
      </div>
    </div>
  );
};

export default GameHUD;
