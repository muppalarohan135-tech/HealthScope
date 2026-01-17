
import React, { useState, useRef } from 'react';
import { Category, MedicalStory } from '../types';

interface AdminPanelProps {
  onAddStory: (story: MedicalStory) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddStory, onClose }) => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Manual field states
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<Category>(Category.PREVENTION);
  const [imageUrl, setImageUrl] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'rwq234') {
      setIsUnlocked(true);
    } else {
      alert('Incorrect password');
    }
  };

  const insertMedia = (type: 'IMG' | 'VID') => {
    const url = prompt(`Enter ${type === 'IMG' ? 'Image' : 'Video'} URL:`);
    if (!url) return;
    
    const tag = `[[${type}:${url}]]`;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    setContent(before + tag + after);
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + tag.length;
    }, 0);
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please provide at least a title and content.");
      return;
    }

    const newStory: MedicalStory = {
      id: Date.now().toString(),
      title,
      excerpt: excerpt || title.substring(0, 100) + '...',
      content,
      category,
      author: author || 'HealthScope Contributor',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/800/600`,
      readTime: readTime || '5 min read'
    };

    onAddStory(newStory);
    onClose();
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E2723]/40 backdrop-blur-sm">
        <div className="bg-[#FDFBF7] w-full max-w-md rounded-[2rem] p-8 soft-shadow border border-stone-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#3E2723]">Admin Authentication</h2>
            <p className="text-[#8B735B] text-sm mt-2 font-medium">Please enter your credentials to access HEALTHSCOPE admin.</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white text-[#3E2723]"
              autoFocus
            />
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-full font-bold text-[#8B735B] bg-stone-50 hover:bg-stone-100 transition-all border border-stone-100"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-3 rounded-full font-bold text-white bg-[#8B735B] hover:bg-[#7a644f] transition-all shadow-md"
              >
                Unlock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E2723]/40 backdrop-blur-sm">
      <div className="bg-[#FDFBF7] w-full max-w-4xl rounded-[2rem] p-8 soft-shadow border border-stone-100 overflow-y-auto max-h-[95vh]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#3E2723]">Write Medical Story</h2>
            <p className="text-[#8B735B] text-sm font-semibold">Manual Editor Mode</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors text-[#8B735B]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 text-[#3E2723]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#8B735B] uppercase tracking-wider mb-2 ml-2">Article Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The Silent Rhythm: Understanding Heart Health..."
                  className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white text-[#3E2723]"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#8B735B] uppercase tracking-wider mb-2 ml-2">Short Excerpt</label>
                <textarea 
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A brief summary for the preview card..."
                  className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white text-[#3E2723] resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8B735B] uppercase tracking-wider mb-2 ml-2">Author Name</label>
                  <input 
                    type="text" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Dr. Smith..."
                    className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white text-[#3E2723]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8B735B] uppercase tracking-wider mb-2 ml-2">Read Time</label>
                  <input 
                    type="text" 
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min read..."
                    className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white text-[#3E2723]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8B735B] uppercase tracking-wider mb-2 ml-2">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white text-[#3E2723]"
                  >
                    {Object.values(Category).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8B735B] uppercase tracking-wider mb-2 ml-2">Cover Image URL</label>
                  <input 
                    type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-5 py-3 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white text-[#3E2723]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-2">
              <label className="block text-xs font-bold text-[#8B735B] uppercase tracking-wider">Full Article Body</label>
              <div className="flex space-x-2">
                <button 
                  onClick={() => insertMedia('IMG')}
                  className="px-3 py-1 bg-white hover:bg-stone-50 text-[#8B735B] rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors border border-stone-100"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Insert Image</span>
                </button>
                <button 
                  onClick={() => insertMedia('VID')}
                  className="px-3 py-1 bg-white hover:bg-stone-50 text-[#8B735B] rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors border border-stone-100"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Insert Video</span>
                </button>
              </div>
            </div>
            <textarea 
              ref={textareaRef}
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your article here. Use the buttons above to embed media anywhere in the text flow..."
              className="w-full px-5 py-4 rounded-3xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#8B735B]/20 bg-white resize-none text-[#3E2723] leading-relaxed placeholder:text-[#A68B6D]/50 shadow-inner"
            />
          </div>

          <button 
            onClick={handlePublish}
            className="w-full py-4 rounded-full font-bold text-white bg-[#8B735B] hover:bg-[#7a644f] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Publish Article to Scope</span>
          </button>
        </div>
      </div>
    </div>
  );
};
