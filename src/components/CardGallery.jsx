import { useGame } from "../context/GameContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LockIcon } from "lucide-react";
import { useState, useEffect } from "react";

const SortableCard = ({ character, isLocked }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: character.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <a
      href={`/cards/${character.id}.webp`}
      download={`${character.name.replace(/\s+/g, "_").toLowerCase()}.webp`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative block rounded-xl p-2 border bg-green-900/30 backdrop-blur-md shadow-md text-center ${
        isLocked
          ? "opacity-30 blur-sm pointer-events-none"
          : "hover:scale-105 transition"
      }`}
    >
      <img
        src={`/cards/${character.id}.webp`}
        alt={character.name}
        className="w-full h-52 object-cover rounded-lg mb-2"
      />
      <h3 className="text-green-100 font-semibold text-sm">{character.name}</h3>

      {isLocked && (
        <div className="absolute top-2 right-2 text-green-200">
          <LockIcon size={16} />
        </div>
      )}
    </a>
  );
};

const CardGallery = () => {
  const { availableCards, collectedCards } = useGame();
  const [orderedCards, setOrderedCards] = useState(collectedCards);

  useEffect(() => {
    setOrderedCards(collectedCards);
  }, [collectedCards]);
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedCards.findIndex((c) => c.id === active.id);
      const newIndex = orderedCards.findIndex((c) => c.id === over?.id);
      setOrderedCards(arrayMove(orderedCards, oldIndex, newIndex));
    }
  };

  const lockedCards = availableCards.filter(
    (card) => !collectedCards.some((c) => c.id === card.id)
  );

  return (
    <div className="relative mt-20 md:mt-0">
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
            {lockedCards.map((character) => (
              <SortableCard
                key={`locked-${character.id}`}
                character={character}
                isLocked={true}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CardGallery;
