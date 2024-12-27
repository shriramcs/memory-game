import React, { useState, useEffect } from 'react';
import './GameBoard.css';

interface GameBoardProps {
  players: string[];
  onRestart: () => void;
}

interface Card {
  id: number;
  image: string;
  color: string;
  matched: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ players, onRestart }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');

  useEffect(() => {
    const images = [
      '🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍍', '🥝',
      '🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍍', '🥝',
    ];
    const colors = [
      '#FF6347', '#FFD700', '#8A2BE2', '#FF69B4', '#32CD32', '#DC143C', '#FFA500', '#66CDAA',
      '#FF6347', '#FFD700', '#8A2BE2', '#FF69B4', '#32CD32', '#DC143C', '#FFA500', '#66CDAA',
    ];
    const shuffledCards = images
      .map((image, index) => ({ id: index, image, color: colors[index], matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    const matchOver = cards && cards.length && cards.every((card) => card.matched);
    console.log("useEffect on card change", cards, matchOver);
    if (matchOver) {
      setGameOver(true);
      announceWinner();
    }
  }, [cards]);

  // useEffect(() => {
  //   const savedScores = localStorage.getItem('scores');
  //   const savedCards = localStorage.getItem('cards');
  //   const savedCurrentPlayer = localStorage.getItem('currentPlayer');
  
  //   if (savedScores) {
  //     setScores(JSON.parse(savedScores));
  //   }
  //   if (savedCards) {
  //     setCards(JSON.parse(savedCards));
  //   }
  //   if (savedCurrentPlayer) {
  //     setCurrentPlayer(Number(savedCurrentPlayer));
  //   }
  // }, []);
  
  // useEffect(() => {
  //   localStorage.setItem('scores', JSON.stringify(scores));
  //   localStorage.setItem('cards', JSON.stringify(cards));
  //   localStorage.setItem('currentPlayer', currentPlayer.toString());
  // }, [scores, cards, currentPlayer]);
  

  const handleCardClick = (index: number) => {
    if (gameOver || flippedCards.length === 2 || cards[index].matched || flippedCards.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        const updatedCards = cards.map((card, i) =>
          i === firstIndex || i === secondIndex ? { ...card, matched: true } : card
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

  const announceWinner = () => {
    const maxScore = Math.max(...scores);
    const winners = players.filter((_, index) => scores[index] === maxScore);

    if (winners.length === 1) {
      setWinnerMessage(`Winner: ${winners[0]} with ${maxScore} points!`);
    } else {
      setWinnerMessage(`It's a tie between ${winners.join(' and ')} with ${maxScore} points each!`);
    }
  };

  return (
    <div className="game-board">
      gameOver: {gameOver}
      {gameOver && (
        <div className="banner">
          <h2>{winnerMessage}</h2>
          <div className="graffiti">🎉 Congratulations! 🎉</div>
          <button onClick={onRestart}>Restart Game</button>
        </div>
      )}
      <>
        <h2>Current Player: {players[currentPlayer]}</h2>
        <div className="scores">
          {players.map((player, index) => (
            <div key={index}>{player}: {scores[index]}</div>
          ))}
        </div>
        <div className="grid">
          {cards.map((card, index) => (
            <button
              key={card.id}
              className={`card ${flippedCards.includes(index) || card.matched ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{ backgroundColor: flippedCards.includes(index) || card.matched ? card.color : '#f0f0f0' }}
            >
              {flippedCards.includes(index) || card.matched ? card.image : '🎁'}
            </button>
          ))}
        </div>
      </>
    </div>
  );
};

export default GameBoard;
