import React, { useState } from 'react';

interface UserPromptProps {
  onStartGame: (playerNames: string[]) => void;
}

const UserPrompt: React.FC<UserPromptProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const handleInputChange = (index: number, name: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = name;
    setPlayerNames(updatedNames);
  };

  const handleStart = () => {
    if (
      playerNames.length === numPlayers &&
      playerNames.every((name) => name.trim() !== '')
    ) {
      onStartGame(playerNames);
    } else {
      alert('Please enter all player names!');
    }
  };

  return (
    <div className="user-prompt">
      <h3>Enter Number of Players</h3>
      <input
        type="number"
        min="2"
        max="4"
        value={numPlayers}
        onChange={(e) => setNumPlayers(Number(e.target.value))}
      />
      <h3>Enter Player Names</h3>
      {[...Array(numPlayers)].map((_, index) => (
        <input
          className="player-input"
          key={index}
          type="text"
          placeholder={`Player ${index + 1} Name`}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default UserPrompt;
