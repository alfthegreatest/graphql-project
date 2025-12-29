import { create } from 'zustand';

export const useMovieUIStore = create((set) => ({
    movieToDelete: null,
    selectedMovieId: null,

    authorToDelete: null,
    selectedAuthorId: null,

    setMovieToDelete: (movie) => set({ movieToDelete: movie }),
    clearMovieToDelete: () => set({ movieToDelete: null }),

    setSelectedMovieId: (id) => set({ selectedMovieId: id }),
    clearSelectedMovieId: () => set({ selectedMovieId: null }),

    setAuthorToDelete: (author) => set({ authorToDelete: author }),
    clearAuthorToDelete: () => set({ authorToDelete: null }),

    setSelectedAuthorId: (id) => set({ selectedAuthorId: id }),
    clearSelectedAuthorId: () => set({ selectedAuthorId: null }),
}));