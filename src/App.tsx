// src/App.tsx
import React, { useState } from 'react';
import UserPrompt from './components/UserPrompt';
import GameBoard from './components/GameBoard';
import './App.css';

const App: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (playerNames: string[]) => {
    setPlayers(playerNames);
    setGameStarted(true);
  };

  const handleRestart = () => {
    setPlayers([]);
    setGameStarted(false);
  };

  return (
    <div className="App">
      <h2>
        Memory Game
      </h2>
      {!gameStarted ? (
        <UserPrompt onStartGame={handleStartGame} />
      ) : (
        <GameBoard players={players} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;