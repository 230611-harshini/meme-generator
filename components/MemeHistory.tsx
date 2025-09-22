
import React from 'react';
import { GeneratedMeme } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface MemeHistoryProps {
  memes: GeneratedMeme[];
}

const MemeHistory: React.FC<MemeHistoryProps> = ({ memes }) => {
  if (memes.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-800 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Your Meme History is Empty</h2>
        <p className="text-gray-400">
          Go to the Generator to create your first meme!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Your Generated Memes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {memes.map(meme => (
          <div key={meme.id} className="group relative overflow-hidden rounded-lg shadow-lg">
            <img src={meme.dataUrl} alt="Generated meme" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
              <a
                href={meme.dataUrl}
                download={`meme-${meme.id}.png`}
                className="opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700"
                aria-label="Download meme"
              >
                <DownloadIcon />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeHistory;
