import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question: "Qual dessas é uma frase clássica do Rick?",
    options: ["Wubba Lubba Dub Dub!", "Aw jeez!", "Pickle Time!", "Oh man..."],
    answer: "Wubba Lubba Dub Dub!",
  },
  {
    question: "Quem é o Sr. Meeseeks?",
    options: [
      "Um robô assassino",
      "Uma invenção do Jerry",
      "Uma criatura que vive pra te ajudar",
      "Um rato intergaláctico",
    ],
    answer: "Uma criatura que vive pra te ajudar",
  },
  {
    question: "O que significa 'Wubba Lubba Dub Dub'?",
    options: [
      "Estou super animado!",
      "Me salve, estou sofrendo!",
      "Vamos nessa!",
      "Nada, é só uma zoeira",
    ],
    answer: "Me salve, estou sofrendo!",
  },
  {
    question: "Em qual planeta o Morty quase virou geleia?",
    options: ["Gazorpazorp", "Plutão", "Forbodulon Prime", "Cronenberg World"],
    answer: "Forbodulon Prime",
  },
];

export default function QuizIntro({ onFinish }) {
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hideAll, setHideAll] = useState(false); // novo estado!
  const [index] = useState(Math.floor(Math.random() * questions.length));
  const q = questions[index];
  const successSound = new Audio("/success.wav");
  const failSound = new Audio("/fail.wav");

  const handleAnswer = (option) => {
    setSelected(option);
    const isCorrect = option === q.answer;
    setCorrect(isCorrect);

    if (isCorrect) {
      successSound.play();
    } else {
      failSound.play();
    }

    setTimeout(() => {
      setShowResult(true);
      setTimeout(() => {
        setHideAll(true);
        setTimeout(onFinish, 1000);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-green-300 text-center px-4 relative overflow-hidden">
      {/* Fundo com estrelas animadas */}
      <div className="absolute inset-0 z-0 animate-stars bg-[radial-gradient(#ffffff22_1px,transparent_1px)] bg-[length:5px_6px]" />

      <AnimatePresence>
        {!hideAll && (
          <motion.div
            key="quiz-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col md:flex-row items-center gap-8"
          >
            {/* Imagem */}
            <motion.img
              src="/hello.webp"
              alt="Rick and Morty"
              className="w-full max-w-[200px] md:max-w-[450px] select-none pointer-events-none"
              layoutId="rick-image"
            />

            {/* Quiz ou Resultado */}
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 max-w-md"
              >
                <h1 className="text-2xl md:text-3xl font-bold">
                  Você é fã de verdade?
                </h1>
                <h2 className="text-md md:text-lg">{q.question}</h2>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className={`py-2 px-4 rounded bg-gray-800 hover:bg-green-600 transition ${
                        selected === opt ? "bg-green-500 text-black" : ""
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold"
              >
                {correct
                  ? "VOCÊ ENTROU PRO TIME 🛸🔥"
                  : "DESGRAÇADO! 🤯 Vai estudar mais..."}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
