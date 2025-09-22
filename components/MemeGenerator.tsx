
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { MemeTemplate, GeneratedMeme, User, MemeCategory } from '../types';
import { MEME_TEMPLATES, DAILY_THEMES } from '../constants';
import MemeCanvas from './MemeCanvas';

interface MemeGeneratorProps {
  onMemeGenerated: (meme: GeneratedMeme) => void;
  currentUser: User | null;
}

const MemeGenerator: React.FC<MemeGeneratorProps> = ({ onMemeGenerated, currentUser }) => {
  const [templates] = useState<MemeTemplate[]>(MEME_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate>(templates[0]);
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');
  const [activeFilter, setActiveFilter] = useState<MemeCategory | 'Daily'>(MemeCategory.POPULAR);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dayOfWeek = new Date().getDay();
  const dailyTheme = DAILY_THEMES[dayOfWeek];

  const filteredTemplates = useMemo(() => {
    if (activeFilter === 'Daily') {
      return templates.filter(t => t.category === dailyTheme.category);
    }
    return templates.filter(t => t.category === activeFilter);
  }, [activeFilter, templates, dailyTheme.category]);
  
  const handleGenerate = useCallback(() => {
    if (!canvasRef.current || !currentUser) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const newMeme: GeneratedMeme = {
      id: `${Date.now()}-${selectedTemplate.id}`,
      template: selectedTemplate,
      topText,
      bottomText,
      dataUrl,
      createdAt: Date.now()
    };
    onMemeGenerated(newMeme);
    alert('Meme saved to your history!');
  }, [currentUser, onMemeGenerated, selectedTemplate, topText, bottomText]);

  const allCategories = Object.values(MemeCategory);

  const filterButtonClasses = (filter: MemeCategory | 'Daily') => 
    `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${
      activeFilter === filter ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Create Your Meme</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <input type="text" value={topText} onChange={e => setTopText(e.target.value)} placeholder="Top text" className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"/>
            <input type="text" value={bottomText} onChange={e => setBottomText(e.target.value)} placeholder="Bottom text" className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"/>
          </div>
          <button
              onClick={handleGenerate}
              disabled={!currentUser}
              className="w-full md:w-auto self-center bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition-colors text-lg"
            >
              {currentUser ? 'Save to History' : 'Login to Save'}
          </button>
        </div>
        <div className="mt-6 aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
          <MemeCanvas
            ref={canvasRef}
            template={selectedTemplate}
            topText={topText}
            bottomText={bottomText}
          />
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h3 className="text-xl font-bold mb-4">Choose a Template</h3>
        <div className="flex flex-wrap gap-2 mb-4">
           <button onClick={() => setActiveFilter(MemeCategory.POPULAR)} className={filterButtonClasses(MemeCategory.POPULAR)}>{MemeCategory.POPULAR}</button>
           <button onClick={() => setActiveFilter('Daily')} className={filterButtonClasses('Daily')}>Daily: {dailyTheme.name}</button>
           {allCategories.filter(c => c !== MemeCategory.POPULAR).map(cat => (
             <button key={cat} onClick={() => setActiveFilter(cat)} className={filterButtonClasses(cat)}>{cat}</button>
           ))}
        </div>
        <div className="h-[60vh] overflow-y-auto pr-2 grid grid-cols-2 gap-3">
          {filteredTemplates.map(template => (
            <img
              key={template.id}
              src={template.url}
              alt={template.name}
              onClick={() => setSelectedTemplate(template)}
              className={`w-full h-auto object-cover rounded-md cursor-pointer transition-all duration-200 ${
                selectedTemplate.id === template.id ? 'ring-4 ring-indigo-500' : 'hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
