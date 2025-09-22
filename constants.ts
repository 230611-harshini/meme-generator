
import { MemeTemplate, MemeCategory } from './types';

export const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '181913649', name: 'Drake Hotline Bling', url: 'https://i.imgflip.com/30b1gx.jpg', box_count: 2, category: MemeCategory.POPULAR },
  { id: '112126428', name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg', box_count: 2, category: MemeCategory.EVERYDAY_LIFE },
  { id: '438680', name: 'Batman Slapping Robin', url: 'https://i.imgflip.com/9ehk.jpg', box_count: 2, category: MemeCategory.POPULAR },
  { id: '87743020', name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg', box_count: 2, category: MemeCategory.WORK_OFFICE },
  { id: '124822590', name: 'Left Exit 12 Off Ramp', url: 'https://i.imgflip.com/22bdq6.jpg', box_count: 2, category: MemeCategory.EVERYDAY_LIFE },
  { id: '217743513', name: 'UNO Draw 25 Cards', url: 'https://i.imgflip.com/3lmzyx.jpg', box_count: 2, category: MemeCategory.SCHOOL_COLLEGE },
  { id: '102156234', name: 'Mocking Spongebob', url: 'https://i.imgflip.com/1otk96.jpg', box_count: 2, category: MemeCategory.EVERYDAY_LIFE },
  { id: '247375501', name: 'Buff Doge vs. Cheems', url: 'https://i.imgflip.com/43a45p.jpg', box_count: 2, category: MemeCategory.TECHNOLOGY },
  { id: '93895088', name: 'Expanding Brain', url: 'https://i.imgflip.com/1jwhww.jpg', box_count: 4, category: MemeCategory.TECHNOLOGY },
  { id: '61579', name: 'One Does Not Simply', url: 'https://i.imgflip.com/1bij.jpg', box_count: 2, category: MemeCategory.POPULAR },
  { id: '1035805', name: 'Boardroom Meeting Suggestion', url: 'https://i.imgflip.com/m78d.jpg', box_count: 2, category: MemeCategory.WORK_OFFICE },
  { id: '91538330', name: 'They Don\'t Know', url: 'https://i.imgflip.com/1x6fgo.jpg', box_count: 2, category: MemeCategory.EVERYDAY_LIFE},
  { id: '131087935', name: 'Running Away Balloon', url: 'https://i.imgflip.com/261o3j.jpg', box_count: 2, category: MemeCategory.SCHOOL_COLLEGE},
  { id: '101470', name: 'Disaster Girl', url: 'https://i.imgflip.com/23ls.jpg', box_count: 2, category: MemeCategory.POPULAR}
];

export const DAILY_THEMES: { [key: number]: { name: string; category: MemeCategory } } = {
  1: { name: 'Monday Blues', category: MemeCategory.WORK_OFFICE },
  2: { name: 'Tech Tuesday', category: MemeCategory.TECHNOLOGY },
  3: { name: 'Wisdom Wednesday', category: MemeCategory.EVERYDAY_LIFE },
  4: { name: 'Throwback Thursday', category: MemeCategory.POPULAR },
  5: { name: 'Friday Vibes', category: MemeCategory.WORK_OFFICE },
  6: { name: 'Scholarly Saturday', category: MemeCategory.SCHOOL_COLLEGE },
  0: { name: 'Sunday Scaries', category: MemeCategory.EVERYDAY_LIFE },
};

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ja', name: '日本語' },
  { code: 'other', name: 'Other' },
];
