'use client';

import { create } from 'zustand';
import type { BoardApplication } from '@/lib/application';

interface ApplicationStoreState {
  lastSavedApplication: BoardApplication | null;
  lastSavedApplicationEventId: number;
  searchQuery: string;
  setLastSavedApplication: (application: BoardApplication) => void;
  setSearchQuery: (query: string) => void;
}

export const useApplicationStore = create<ApplicationStoreState>((set) => ({
  lastSavedApplication: null,
  lastSavedApplicationEventId: 0,
  searchQuery: '',
  setLastSavedApplication: (application) =>
    set((state) => ({
      lastSavedApplication: application,
      lastSavedApplicationEventId: state.lastSavedApplicationEventId + 1,
    })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
