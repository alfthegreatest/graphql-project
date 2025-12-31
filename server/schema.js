export const typeDefs = `#graphql
    type Movie {
        id: String!
        title: String!
        filmed: Boolean!
        year: Int!
        rating: Float,
        author: Author!
    }

    type Author {
        id: String!
        name: String!
        age: Int!
        movies: [Movie!]!
    }

    type Query {
        movies: [Movie!]!
        movie(id: ID!): Movie
        authors: [Author!]!
        author(id: ID!): Author
        moviesByYear(year: Int!): [Movie!]!
        topRatedMovies(minRating: Float!): [Movie!]!
    }

    type Mutation {
        addMovie(title: String!, filmed: Boolean!, year: Int!, rating: Float, authorId: String): Movie
        deleteMovie(id: String!): Boolean
        updateMovie(id: String!, title: String!, filmed: Boolean!, year: Int!, rating: Float, authorId: String): Movie
        addAuthor(name: String!, age: Int!): Author
        deleteAuthor(id: String!): Boolean
    }
`