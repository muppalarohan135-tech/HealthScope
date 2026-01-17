
import React from 'react';
import { MedicalStory } from '../types';

interface StoryCardProps {
  story: MedicalStory;
  onClick: (story: MedicalStory) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  return (
    <div 
      onClick={() => onClick(story)}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden soft-shadow transition-transform duration-300 hover:-translate-y-2 border border-stone-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={story.imageUrl} 
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[#8B735B] text-xs font-semibold rounded-full shadow-sm">
            {story.category}
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center text-xs text-[#A68B6D] mb-3 space-x-2">
          <span>{story.date}</span>
          <span>•</span>
          <span>{story.readTime}</span>
        </div>
        <h3 className="text-2xl font-bold text-[#3E2723] mb-3 leading-tight group-hover:text-[#8B735B] transition-colors">
          {story.title}
        </h3>
        <p className="text-[#6D5D54] line-clamp-2 text-sm leading-relaxed mb-4">
          {story.excerpt}
        </p>
        <div className="flex items-center space-x-2">
           <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200"></div>
           <span className="text-xs font-medium text-[#8B735B]">by {story.author}</span>
        </div>
      </div>
    </div>
  );
};
