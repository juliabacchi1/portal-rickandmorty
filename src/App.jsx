import { useState } from "react";
import QuizIntro from "./components/QuizIntro";

function App() {
  const [startGame, setStartGame] = useState(false);

  return (
    <>
      {!startGame ? (
        <QuizIntro onFinish={() => setStartGame(true)} />
      ) : (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          <h1 className="text-4xl">Tela de personagens aqui depois! 👾</h1>
        </div>
      )}
    </>
  );
}

export default App;
