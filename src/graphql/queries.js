import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      year
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      title
      year
      rating
      author {
        name
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
      age
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
      author(id: $id) {
        id
        name
        age
        movies {
          id
          title
          year
        }
      }
    }
`;