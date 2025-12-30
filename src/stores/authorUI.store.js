import { create } from 'zustand';

export const useAuthorUIStore = create((set) => ({
    authorToDelete: null,
    selectedAuthorId: null,
    addAuthorForm: false,

    setAuthorToDelete: (author) => set({ authorToDelete: author }),
    clearAuthorToDelete: () => set({ authorToDelete: null }),

    setSelectedAuthorId: (id) => set({ selectedAuthorId: id }),
    clearSelectedAuthorId: () => set({ selectedAuthorId: null }),

    showAddAuthorForm: () => set({ addAuthorForm: true }),
    hideAddAuthorForm: () => set({ addAuthorForm: false }),

}));