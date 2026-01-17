
export enum Category {
  PREVENTION = 'Prevention',
  CHRONIC_CARE = 'Chronic Care',
  NUTRITION = 'Nutrition',
  MENTAL_HEALTH = 'Mental Health',
  TECH_IN_MED = 'MedTech',
  RESEARCH = 'Research'
}

export interface MedicalStory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export interface AppState {
  stories: MedicalStory[];
  isAdmin: boolean;
  selectedCategory: Category | 'All';
  isModalOpen: boolean;
  selectedStory: MedicalStory | null;
}
