'use client';

import { create } from 'zustand';
import type { BoardApplication } from '@/lib/application';

interface ApplicationStoreState {
  lastSavedApplication: BoardApplication | null;
  lastSavedApplicationEventId: number;
  setLastSavedApplication: (application: BoardApplication) => void;
}

export const useApplicationStore = create<ApplicationStoreState>((set) => ({
  lastSavedApplication: null,
  lastSavedApplicationEventId: 0,
  setLastSavedApplication: (application) =>
    set((state) => ({
      lastSavedApplication: application,
      lastSavedApplicationEventId: state.lastSavedApplicationEventId + 1,
    })),
}));
