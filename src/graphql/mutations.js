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