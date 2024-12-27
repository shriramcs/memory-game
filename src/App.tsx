import React, { useState } from 'react';
import UserPrompt from './components/UserPrompt';
import GameBoard from './components/GameBoard';
import './App.css';

const App: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Load state from localStorage on app load
  // useEffect(() => {
  //   const savedPlayers = localStorage.getItem('players');
  //   const savedGameStarted = localStorage.getItem('gameStarted');

  //   if (savedPlayers) {
  //     setPlayers(JSON.parse(savedPlayers));
  //   }
  //   if (savedGameStarted === 'true') {
  //     setGameStarted(true);
  //   }
  // }, []);

  // Save state to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('players', JSON.stringify(players));
  //   localStorage.setItem('gameStarted', JSON.stringify(gameStarted));
  // }, [players, gameStarted]);

  const handleStartGame = (playerNames: string[]) => {
    setPlayers(playerNames);
    setGameStarted(true);
  };

  const handleRestart = () => {
    setPlayers([]);
    setGameStarted(false);
    // localStorage.clear(); // Clear localStorage on game restart
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <UserPrompt onStartGame={handleStartGame} />
      ) : (
        <GameBoard players={players} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
