import React, { useState } from 'react';
import './UserPrompt.css';


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
      <div className="logo">
        <div className="logo-card logo-card1"></div>
        <div className="logo-card logo-card2"></div>
      </div>
      <h2 className='header-name'>Match the pairs </h2>
      <div>
        <h3>Enter Number of Players</h3>
        <input
          type="number"
          min="1"
          max="4"
          value={numPlayers}
          onChange={(e) => setNumPlayers(Number(e.target.value))}
        />
      </div>
      
      <section>
        <h3><label htmlFor="playerCount">Enter Player Names</label></h3>
        {[...Array(numPlayers)].map((_, index) => (
          <input
            key={index}
            type="text"
            id="playerCount"
            placeholder={`Player ${index + 1} Name`}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
        <button onClick={handleStart}>Start Game</button>
      </section>
    </div>
  );
};

export default UserPrompt;
