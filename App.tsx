
import React, { useState, useEffect, useMemo } from 'react';
import { Category, MedicalStory } from './types';
import { INITIAL_STORIES } from './constants';
import { StoryCard } from './components/StoryCard';
import { AdminPanel } from './components/AdminPanel';
import { StoryModal } from './components/StoryModal';

const App: React.FC = () => {
  const [stories, setStories] = useState<MedicalStory[]>(() => {
    const saved = localStorage.getItem('healthscope_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedStory, setSelectedStory] = useState<MedicalStory | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('healthscope_stories', JSON.stringify(stories));
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (selectedCategory === 'All') return stories;
    return stories.filter(s => s.category === selectedCategory);
  }, [stories, selectedCategory]);

  const addStory = (newStory: MedicalStory) => {
    setStories(prev => [newStory, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#8B735B]/20 text-[#3E2723]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-stone-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#8B735B] rounded-xl flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#3E2723]">
              HEALTH<span className="text-[#8B735B]">SCOPE</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#8B735B]">
            <a href="#" className="hover:text-[#3E2723] transition-colors">Home</a>
            <a href="#" className="hover:text-[#3E2723] transition-colors">Topics</a>
            <a href="#" className="hover:text-[#3E2723] transition-colors">Community</a>
            <a href="#" className="hover:text-[#3E2723] transition-colors">Resources</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${isAdmin ? 'bg-[#8B735B] text-white shadow-lg border-transparent' : 'bg-stone-50 text-[#8B735B] border-stone-100 hover:bg-stone-100'}`}
            >
              {isAdmin ? 'ADMIN MODE' : 'READER VIEW'}
            </button>
            {isAdmin && (
              <button 
                onClick={() => setIsAdminPanelOpen(true)}
                className="bg-[#3E2723] text-white p-2.5 rounded-xl hover:bg-black transition-all shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* Hero Section */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-stone-50 border border-stone-100 text-[#8B735B] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
            Medicine & Empathy
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-[#3E2723] mb-8 leading-[1.1]">
            Exploring the Human Story in <span className="italic serif text-[#8B735B]">Healing.</span>
          </h2>
          <p className="text-xl text-[#6D5D54] font-medium leading-relaxed">
            HealthScope brings you soft, accurate medical insights designed to educate, inspire, and foster a deeper understanding of the science of care.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-12 overflow-x-auto scrollbar-hide flex items-center space-x-3 py-2">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`whitespace-nowrap px-8 py-3 rounded-full text-sm font-bold transition-all shadow-sm
              ${selectedCategory === 'All' ? 'bg-[#8B735B] text-white' : 'bg-white text-[#8B735B] border border-stone-100 hover:bg-stone-50'}`}
          >
            All Insights
          </button>
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-8 py-3 rounded-full text-sm font-bold transition-all shadow-sm
                ${selectedCategory === cat ? 'bg-[#8B735B] text-white' : 'bg-white text-[#8B735B] border border-stone-100 hover:bg-stone-50'}`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredStories.length > 0 ? (
            filteredStories.map(story => (
              <StoryCard 
                key={story.id} 
                story={story} 
                onClick={setSelectedStory} 
              />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <div className="mb-6 text-[#A68B6D]/30">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#3E2723]">Your scope is currently empty.</h3>
              <p className="text-[#8B735B] mt-2 font-medium">Add stories in Admin Mode to begin spreading health insights.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[#8B735B] rounded-lg flex items-center justify-center text-white font-bold text-sm">H</div>
              <span className="text-xl font-bold text-[#3E2723]">HEALTHSCOPE</span>
            </div>
            <p className="text-[#6D5D54] max-w-sm leading-relaxed font-medium">
              Bridging the gap between clinical complexity and human understanding. We believe every medical insight is a story worth telling softly.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#3E2723] mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-semibold text-[#8B735B]">
              <li><a href="#" className="hover:text-[#3E2723]">About Us</a></li>
              <li><a href="#" className="hover:text-[#3E2723]">Editorial Policy</a></li>
              <li><a href="#" className="hover:text-[#3E2723]">Expert Panel</a></li>
              <li><a href="#" className="hover:text-[#3E2723]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#3E2723] mb-6">Stay Informed</h4>
            <div className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white px-5 py-3 rounded-full text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 text-[#3E2723]"
              />
              <button className="bg-[#8B735B] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#3E2723] transition-colors shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-[#A68B6D]">
          <p>© 2024 HEALTHSCOPE. All medical info provided is for educational purposes.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#3E2723]">Privacy Policy</a>
            <a href="#" className="hover:text-[#3E2723]">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      {isAdminPanelOpen && (
        <AdminPanel 
          onAddStory={addStory} 
          onClose={() => setIsAdminPanelOpen(false)} 
        />
      )}
      {selectedStory && (
        <StoryModal 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      )}
    </div>
  );
};

export default App;
