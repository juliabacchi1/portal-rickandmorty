import { motion } from "framer-motion";

export default function CharacterDisplay({ character }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-4 border border-green-500 rounded-lg">
      {/* Personagem - tipo "lado esquerdo da luta" */}
      <motion.img
        src={character.image}
        alt={character.name}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-40 h-40 rounded-full border-4 border-green-300"
      />

      {/* Dados do personagem */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-left space-y-2"
      >
        <h2 className="text-2xl font-orbitron text-green-300">
          {character.name}
        </h2>
        <p>
          Status: <span className="font-bold">{character.status}</span>
        </p>
        <p>
          Origem: <span className="font-bold">{character.origin.name}</span>
        </p>
        <p>
          Espécie: <span className="font-bold">{character.species}</span>
        </p>
      </motion.div>
    </div>
  );
}
