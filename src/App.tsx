import React from 'react';
import { Terminal } from './components/Terminal';
import { GameProvider } from './components/GameContext';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Terminal />
      </div>
    </GameProvider>
  );
};

export default App;