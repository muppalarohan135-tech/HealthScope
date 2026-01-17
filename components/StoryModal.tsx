
import React from 'react';
import { MedicalStory } from '../types';

interface StoryModalProps {
  story: MedicalStory;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
  const renderContent = (content: string) => {
    const parts = content.split(/(\[\[(?:IMG|VID):.*?\]\])/g);
    
    return parts.map((part, index) => {
      const imgMatch = part.match(/\[\[IMG:(.*?)\]\]/);
      const vidMatch = part.match(/\[\[VID:(.*?)\]\]/);

      if (imgMatch) {
        return (
          <div key={index} className="my-10 rounded-3xl overflow-hidden soft-shadow border border-stone-100">
            <img src={imgMatch[1]} alt="Embedded medical detail" className="w-full h-auto object-cover" />
          </div>
        );
      } else if (vidMatch) {
        return (
          <div key={index} className="my-10 rounded-3xl overflow-hidden soft-shadow bg-black aspect-video flex items-center justify-center border border-stone-100">
            <video src={vidMatch[1]} controls className="w-full h-full" />
          </div>
        );
      } else {
        return part.split('\n').map((line, lineIdx) => (
          <p key={`${index}-${lineIdx}`} className={line.trim() ? "mb-6 text-[#3E2723] leading-loose" : ""}>
            {line}
          </p>
        ));
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-8 bg-[#3E2723]/50 backdrop-blur-md">
      <div className="bg-[#FDFBF7] w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] md:rounded-[3rem] overflow-hidden soft-shadow relative flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-full text-[#3E2723] transition-colors shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto scrollbar-hide flex-1">
          <div className="relative h-64 md:h-96 w-full">
            <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent"></div>
          </div>

          <div className="px-6 md:px-16 py-8 md:py-12 -mt-16 relative bg-[#FDFBF7]">
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-5 py-2 bg-stone-50 border border-stone-100 text-[#8B735B] text-sm font-bold rounded-full">
                {story.category}
              </span>
              <span className="text-[#A68B6D] text-sm">{story.date}</span>
              <span className="text-stone-300 text-sm">•</span>
              <span className="text-[#A68B6D] text-sm">{story.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#3E2723] mb-8 leading-tight">
              {story.title}
            </h1>

            <div className="flex items-center space-x-4 mb-10 pb-10 border-b border-stone-100">
              <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200"></div>
              <div>
                <p className="font-bold text-[#3E2723]">{story.author}</p>
                <p className="text-sm text-[#8B735B]">Medical Contributor</p>
              </div>
            </div>

            <div className="max-w-none">
              <p className="text-xl text-[#6D5D54] leading-relaxed font-light italic mb-10 border-l-4 border-[#8B735B] pl-6">
                {story.excerpt}
              </p>
              <div className="text-lg">
                {renderContent(story.content)}
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-stone-100 flex items-center justify-between">
              <p className="text-[#A68B6D] text-xs">© 2024 HEALTHSCOPE Medicine Portal</p>
              <div className="flex space-x-4 text-sm font-bold">
                <button className="text-[#8B735B] hover:text-[#3E2723] transition-colors">Share</button>
                <button className="text-[#8B735B] hover:text-[#3E2723] transition-colors">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
