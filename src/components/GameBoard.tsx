import React, { useState, useEffect } from 'react';
import './GameBoard.css';

interface GameBoardProps {
  players: string[];
  onRestart: () => void;
}

interface Card {
  id: number;
  image: string;
  matched: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ players, onRestart }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0));
  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    const images = [
      '🍎',
      '🍌',
      '🍇',
      '🍓',
      '🍉',
      '🍒',
      '🍍',
      '🥝',
      '🍎',
      '🍌',
      '🍇',
      '🍓',
      '🍉',
      '🍒',
      '🍍',
      '🥝',
    ];
    const shuffledCards = images
      .map((image, index) => ({ id: index, image, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].matched ||
      flippedCards.includes(index)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        const updatedCards = cards.map((card, i) =>
          i === firstIndex || i === secondIndex
            ? { ...card, matched: true }
            : card
        );
        setCards(updatedCards);
        const updatedScores = [...scores];
        updatedScores[currentPlayer] += 1;
        setScores(updatedScores);
      }
      setTimeout(() => {
        setFlippedCards([]);
        setCurrentPlayer((currentPlayer + 1) % players.length);
      }, 1000);
    }
  };

  return (
    <div className="game-board">
      <h2>Current Player: {players[currentPlayer]}</h2>
      <div className="scores">
        {players.map((player, index) => (
          <div key={index}>
            {player}: {scores[index]}
          </div>
        ))}
      </div>
      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${
              flippedCards.includes(index) || card.matched ? 'flipped' : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || card.matched ? card.image : '?'}
          </div>
        ))}
      </div>
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
};

export default GameBoard;
