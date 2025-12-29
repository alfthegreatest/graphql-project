import { gql } from "@apollo/client";

export const ADD_MOVIE = gql`
  mutation AddMovie(
    $title: String!, 
    $filmed: Boolean!, 
    $year: Int!, 
    $rating: Float!, 
    $authorId: String
  ) {
    addMovie(
      title: $title, 
      filmed: $filmed, 
      year: $year, 
      rating: $rating, 
      authorId: $authorId
    ) {
      id
      title
      year
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: String!) {
    deleteMovie(id: $id)
  }
`;

export const ADD_AUTHOR = gql`
  mutation addAuthor(
    $name: String!,
    $age: Int!
  ) {
    addAuthor(
      name: $name,
      age: $age
    ) {
      id
      name
      age        
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation deleteAuthor($id: String!) {
    deleteMovie(id: $id)
  }
`