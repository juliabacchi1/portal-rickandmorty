import { useGame } from "../context/GameContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { DownloadIcon, LockIcon } from "lucide-react";

const SortableCard = ({ character, isLocked }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: character.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative rounded-xl p-2 border bg-green-900/30 backdrop-blur-md shadow-md text-center ${
        isLocked
          ? "opacity-30 blur-sm pointer-events-none"
          : "hover:scale-105 transition"
      }`}
    >
      <img
        src={`/cards/${character.id}.webp`}
        alt={character.name}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <h3 className="text-green-100 font-semibold text-sm">{character.name}</h3>
      {!isLocked ? (
        <a
          href={`/cards/${character.id}.webp`}
          download={`${character.name.replace(/\s+/g, "_").toLowerCase()}.webp`}
          className="mt-1 inline-flex items-center gap-1 text-xs text-green-300 hover:underline"
        >
          <DownloadIcon size={14} /> Download
        </a>
      ) : (
        <div className="absolute top-2 right-2 text-green-200">
          <LockIcon size={16} />
        </div>
      )}
    </div>
  );
};

const CardGallery = () => {
  const { collectedCards } = useGame();
  const [orderedCards, setOrderedCards] = useState(collectedCards);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedCards.findIndex((c) => c.id === active.id);
      const newIndex = orderedCards.findIndex((c) => c.id === over?.id);
      setOrderedCards(arrayMove(orderedCards, oldIndex, newIndex));
    }
  };

  return (
    <div className="relative mt-10 md:mt-0">
      <h2 className="text-[22px] md:text-4xl m-4 pt-6">Galeria de Cards</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={orderedCards}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orderedCards.map((character) => (
              <SortableCard
                key={character.id}
                character={character}
                isLocked={false}
              />
            ))}

            {/* Cards bloqueados estáticos */}
            {[...Array(4)].map((_, i) => (
              <div
                key={`locked-${i}`}
                className="rounded-xl p-2 border bg-green-900/20 backdrop-blur-md shadow-md opacity-30 blur-sm relative"
              >
                <div className="w-full h-40 bg-green-800/20 rounded-lg mb-2" />
                <div className="h-4 w-2/3 bg-green-700/20 mx-auto mb-1 rounded" />
                <div className="absolute top-2 right-2 text-green-300">
                  <LockIcon size={16} />
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CardGallery;
