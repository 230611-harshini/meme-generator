
export interface User {
  username: string;
}

export enum View {
  GENERATOR = 'generator',
  HISTORY = 'history',
}

export enum MemeCategory {
    SCHOOL_COLLEGE = 'School/College',
    WORK_OFFICE = 'Work/Office',
    TECHNOLOGY = 'Technology',
    EVERYDAY_LIFE = 'Everyday Life',
    POPULAR = 'Popular',
}

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  box_count: number;
  category: MemeCategory;
}

export interface GeneratedMeme {
  id: string;
  template: MemeTemplate;
  topText: string;
  bottomText: string;
  dataUrl: string;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
