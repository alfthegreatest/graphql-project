import { create } from 'zustand';

export const useAuthorUIStore = create((set) => ({
    authorToDelete: null,
    selectedAuthorId: null,

    setAuthorToDelete: (author) => set({ authorToDelete: author }),
    clearAuthorToDelete: () => set({ authorToDelete: null }),

    setSelectedAuthorId: (id) => set({ selectedAuthorId: id }),
    clearSelectedAuthorId: () => set({ selectedAuthorId: null }),
}));