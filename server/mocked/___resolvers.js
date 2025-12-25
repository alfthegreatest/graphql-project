import { movies, authors } from "./data.js";

export const resolvers = {
    Query: {
        movies: () => movies,
        authors: () => authors,
        movie: (_, { id }) => movies.find((movie) => movie.id == id),
        author: (_, { id }) => authors.find((author) => author.id == id),
        moviesByYear: (_, { year }) => movies.filter(movie => movie.year === year),
        topRatedMovies: (_, { minRating }) => movies.filter(movie => movie.rating >= minRating)
    },
    Movie: {
        author: (parent) => authors.find((a) => a.id === parent.authorId)
    },
    Author: {
        movies: (parent) => movies.filter((movie) => movie.authorId === parent.id)
    },
    Mutation: {
        addMovie: (_, { title, filmed, year, rating, authorId}) => {
            const newMovie = {
                id: String(movies.length + 1),
                title, filmed, year, rating, authorId
            };
            movies.push(newMovie);
            return newMovie;
        },
        deleteMovie: (_, { id }) => {
            const index = movies.findIndex(m => m.id === id)
            if (index === -1) return false;
            movies.splice(index, 1);
            return true;
        },
        updateMovie: (_, { id, ...args }) => {
            const movie = movies.find(m => m.id === id);
            if (!movie) return null;
            Object.assign(movie, args);
            return movie;
        }
    }
}