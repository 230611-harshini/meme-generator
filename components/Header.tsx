
import React from 'react';
import { User, View } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onNavClick: (view: View) => void;
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  onLoginClick,
  onLogoutClick,
  onNavClick,
  currentView,
}) => {
  const navLinkClasses = (view: View) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      currentView === view
        ? 'bg-indigo-500 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-white tracking-wider">
              MemeGen AI
            </h1>
            <nav className="flex space-x-4">
              <button
                onClick={() => onNavClick(View.GENERATOR)}
                className={navLinkClasses(View.GENERATOR)}
              >
                Generator
              </button>
              {currentUser && (
                <button
                  onClick={() => onNavClick(View.HISTORY)}
                  className={navLinkClasses(View.HISTORY)}
                >
                  History
                </button>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-gray-300">
                  Welcome, {currentUser.username}!
                </span>
                <button
                  onClick={onLogoutClick}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
