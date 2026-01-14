import type { Timestamp } from 'firebase/firestore';

export interface MenuItem {
  id: string; // Will be the document ID from Firestore
  title: string;
  path: string;
  icon?: string;
  parentId?: string | null;
  order: number;
}

export interface Menu {
  id: string; // Will be the document ID from Firestore
  name: string;
  description: string;
  location?: 'topnav' | 'bottomnav' | 'sidebar';
  icon?: string;
  items?: MenuItem[]; // This will now be a subcollection
  createdAt?: Timestamp;
}
