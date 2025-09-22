
import React, { useState, useCallback } from 'react';
import { User, View, GeneratedMeme } from './types';
import Header from './components/Header';
import MemeGenerator from './components/MemeGenerator';
import MemeHistory from './components/MemeHistory';
import AuthModal from './components/AuthModal';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<View>(View.GENERATOR);
  const [memeHistory, setMemeHistory] = useState<GeneratedMeme[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (username: string) => {
    setCurrentUser({ username });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(View.GENERATOR);
  };
  
  const addMemeToHistory = useCallback((meme: GeneratedMeme) => {
    setMemeHistory(prev => [meme, ...prev.slice(0, 19)]); // Keep history to 20
  }, []);

  const renderView = () => {
    switch (view) {
      case View.HISTORY:
        return <MemeHistory memes={memeHistory} />;
      case View.GENERATOR:
      default:
        return <MemeGenerator onMemeGenerated={addMemeToHistory} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={handleLogout}
        onNavClick={setView}
        currentView={view}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Chatbot />
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
