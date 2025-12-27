import { useState } from "react";
import MovieItem from "./MovieItem";
import DialogPopup from "./interface/DialogPopup";
import { useMutation } from "@apollo/client";
import { GET_MOVIES } from '../graphql/queries';
import { DELETE_MOVIE } from "../graphql/mutations";

function MovieList({ movies, onGetMore, onDeleteMovie }) {
  const [movieToDelete, setMovieToDelete] = useState();

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  });

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
  };

  async function handleDeleteMovie() {
    await deleteMovie({ variables: { id: movieToDelete.id } });
    onDeleteMovie();
    setMovieToDelete();
  };

  const handleCancel = () => {
    setMovieToDelete();
  }

  const handleOnCloseClick = () => {
    setMovieToDelete();
  }

  if(!movies) return null;


  return(
    <div>
      <h1>List of movies</h1>
      {movies.map(movie => (
        <MovieItem
          key={movie.id}
          movie={movie}
          onGetMore={onGetMore}
          onDeleteClick={handleDeleteClick}
        />
      ))}

      {movieToDelete && (
        <DialogPopup
          header={`Delete movie "${movieToDelete.title}"?`}
          content={
            <>
              <input
                type="button" 
                value="confirm"
                className="btn btn-cancel"
                onClick={handleDeleteMovie}
              />
              <input
                type="button" 
                value="cancel"
                className="btn btn-gray"
                onClick={handleCancel}
              />
            </>
          }
          onCloseClick={handleOnCloseClick}
        />
      )}
    </div>
  )
}

export default MovieList;