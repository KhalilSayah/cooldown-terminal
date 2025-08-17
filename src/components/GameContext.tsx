import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { db } from '../firebase';

type GameState = 'waiting' | 'active' | 'submitted' | 'gameover';

interface GameContextType {
  gameState: GameState;
  timeLeft: number;
  currentWord: string;
  inputWord: string;
  setInputWord: (word: string) => void;
  submitWord: () => void;
  isDefeat: boolean;
  connectedPlayers: number;
  submittedWords: string[];
  resetGame: (password: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const words = ['react', 'typescript', 'terminal', 'game', 'cooldown', 'synchronize'];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [timeLeft, setTimeLeft] = useState(100);
  const [currentWord, setCurrentWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [isDefeat, setIsDefeat] = useState(false);
  const [connectedPlayers, setConnectedPlayers] = useState(0);
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);

  useEffect(() => {
    const gameStateRef = ref(db, 'gameState');
    const timeLeftRef = ref(db, 'timeLeft');
    const currentWordRef = ref(db, 'currentWord');
    const playersRef = ref(db, 'players');
    const wordsRef = ref(db, 'submittedWords');

    const unsubscribeGameState = onValue(gameStateRef, (snapshot) => {
      setGameState(snapshot.val() || 'waiting');
    });

    const unsubscribeTimeLeft = onValue(timeLeftRef, (snapshot) => {
      setTimeLeft(snapshot.val() || 100);
    });

    const unsubscribeCurrentWord = onValue(currentWordRef, (snapshot) => {
      setCurrentWord(snapshot.val() || '');
    });

    const unsubscribePlayers = onValue(playersRef, (snapshot) => {
      setConnectedPlayers(snapshot.size || 0);
    });

    const unsubscribeWords = onValue(wordsRef, (snapshot) => {
      const words = snapshot.val();
      setSubmittedWords(words ? Object.values(words) : []);
    });

    // Add current player to the database
    const playerRef = push(playersRef);
    set(playerRef, true);

    return () => {
      unsubscribeGameState();
      unsubscribeTimeLeft();
      unsubscribeCurrentWord();
      unsubscribePlayers();
      unsubscribeWords();
      remove(playerRef);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeftRef = ref(db, 'timeLeft');
      const gameStateRef = ref(db, 'gameState');
      const currentWordRef = ref(db, 'currentWord');

      onValue(timeLeftRef, (snapshot) => {
        let time = snapshot.val() || 100;
        if (time <= 1) {
          if (gameState === 'waiting') {
            set(gameStateRef, 'active');
            const newWord = words[Math.floor(Math.random() * words.length)];
            set(currentWordRef, newWord);
            set(timeLeftRef, 10);
          } else if (gameState === 'active' || gameState === 'submitted') {
            if (submittedWords.length < connectedPlayers) {
              set(gameStateRef, 'gameover');
              setIsDefeat(true);
            } else {
              set(gameStateRef, 'waiting');
              set(timeLeftRef, 100);
              set(ref(db, 'submittedWords'), null);
            }
          }
        } else {
          set(timeLeftRef, time - 1);
        }
      }, { onlyOnce: true });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, submittedWords, connectedPlayers]);

  const submitWord = () => {
    if (inputWord.toLowerCase() === currentWord.toLowerCase()) {
      const wordsRef = ref(db, 'submittedWords');
      push(wordsRef, inputWord);
      setInputWord('');
      set(ref(db, 'gameState'), 'submitted');
    }
  };

  const resetGame = (password: string) => {
    if (password === '0CT0P0UC3') {
      set(ref(db, 'gameState'), 'waiting');
      set(ref(db, 'timeLeft'), 100);
      set(ref(db, 'submittedWords'), null);
      setIsDefeat(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        timeLeft,
        currentWord,
        inputWord,
        setInputWord,
        submitWord,
        isDefeat,
        connectedPlayers,
        submittedWords,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};