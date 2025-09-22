
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { LANGUAGES } from '../constants';
import { ChatIcon } from './icons/ChatIcon';
import { CloseIcon } from './icons/CloseIcon';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hi there! I'm your meme assistant. How can I help you create a hilarious meme today?" },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [customLanguage, setCustomLanguage] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const newUserMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
        const targetLanguage = language === 'other' ? customLanguage : language;
        const response = await getChatbotResponse(userInput, messages.slice(0, -1), targetLanguage);
        const newBotMessage: ChatMessage = { role: 'model', content: response };
        setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
        console.error('Gemini API error:', error);
        const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110"
        aria-label="Open chatbot"
      >
        <ChatIcon />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-800 rounded-xl shadow-2xl flex flex-col z-50">
      <header className="bg-gray-900 p-4 flex justify-between items-center rounded-t-xl">
        <h3 className="text-lg font-bold">Meme Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          <CloseIcon />
        </button>
      </header>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-gray-700 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <select value={language} onChange={e => setLanguage(e.target.value)} className="bg-gray-700 border-gray-600 rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none">
            {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
          </select>
          {language === 'other' && (
            <input type="text" value={customLanguage} onChange={e => setCustomLanguage(e.target.value)} placeholder="Enter language" className="flex-1 bg-gray-700 border-gray-600 rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask for meme ideas..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 disabled:bg-gray-500">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
