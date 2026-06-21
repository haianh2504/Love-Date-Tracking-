export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  description: string; // "First trip together"
  location: string;    // "Da Lat"
  date: string;        // "June 2025" or "2025-06-25"
  category: string;
}

export interface MemoryNote {
  id: string;
  title: string;
  date: string;
  content: string;
  isCustom?: boolean;
}

export interface FutureDream {
  id: string;
  title: string;
  category: 'travel' | 'family' | 'shared' | 'other';
  description: string;
  targetYear?: string;
  isCompleted?: boolean;
}

export interface CoupleProfile {
  partner1: string;
  partner2: string;
  weddingDate: string; // ISO format YYYY-MM-DD
  anniversaryTitle: string;
  anniversarySubtitle: string;
  quote: string;
  letterText?: string;
}
