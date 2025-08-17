import React, { useState } from 'react';
import { useGame } from './GameContext';
import { Icon } from '@iconify/react';
import { Button, Input } from '@heroui/react';

export const Terminal: React.FC = () => {
  const { 
    gameState, 
    timeLeft, 
    currentWord, 
    inputWord, 
    setInputWord, 
    submitWord,
    isDefeat,
    connectedPlayers,
    submittedWords,
    resetGame
  } = useGame();

  const [resetPassword, setResetPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitWord();
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    resetGame(resetPassword);
    setResetPassword('');
  };

  return (
    <div className="bg-black text-green-500 p-4 rounded-md shadow-lg w-full max-w-2xl font-mono">
      <div className="flex items-center mb-4">
        <Icon icon="lucide:terminal" className="mr-2" />
        <h1 className="text-xl">Terminal Word Game</h1>
      </div>
      {!isDefeat ? (
        <>
          <div className="mb-4">
            {gameState === 'waiting' && (
              <p>Waiting for next round... {timeLeft}s</p>
            )}
            {gameState === 'active' && (
              <>
                <p>Type the word: {currentWord}</p>
                <p>Time left: {timeLeft}s</p>
              </>
            )}
            {gameState === 'submitted' && (
              <p>Great job! Waiting for others... {timeLeft}s</p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mb-4 flex">
            <Input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              className="bg-black text-green-500 border border-green-500 p-2 w-full mr-2"
              placeholder="Type the word here..."
              disabled={gameState !== 'active'}
            />
            <Button
              color="success"
              type="submit"
              disabled={gameState !== 'active'}
              className="bg-green-700 text-black font-bold py-2 px-4 rounded"
            >
              Send
            </Button>
          </form>
          <div>
            <p>Connected players: {connectedPlayers}</p>
            <p>Words submitted: {submittedWords.length}/{connectedPlayers}</p>
          </div>
        </>
      ) : (
        <div>
          <p className="text-red-500 mb-4">GAME OVER! Enter the password to reset.</p>
          <form onSubmit={handleReset} className="flex">
            <Input
              type="password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              className="bg-black text-green-500 border border-green-500 p-2 w-full mr-2"
              placeholder="Enter reset password"
            />
            <Button
              color="primary"
              type="submit"
              className="bg-blue-700 text-black font-bold py-2 px-4 rounded"
            >
              Reset
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};