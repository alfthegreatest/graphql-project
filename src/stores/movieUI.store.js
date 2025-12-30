import { create } from 'zustand';

export const useMovieUIStore = create((set) => ({
    movieToDelete: null,
    selectedMovieId: null,
    addMovieForm: false,

    setMovieToDelete: (movie) => set({ movieToDelete: movie }),
    clearMovieToDelete: () => set({ movieToDelete: null }),

    setSelectedMovieId: (id) => set({ selectedMovieId: id }),
    clearSelectedMovieId: () => set({ selectedMovieId: null }),

    showAddMovieForm: () => set({ addMovieForm: true }),
    hideAddMovieForm: () => set({ addMovieForm: false }),

}));