import { useState } from 'react';
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMovie from "./components/AddMovie";
import AddAuthor from "./components/AddAuthor";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_MOVIE, GET_MOVIES } from './graphql/queries';

function App() {
  const [getMovie, { data: movieData }] = useLazyQuery(GET_MOVIE);
  const { loading, error, data } = useQuery(GET_MOVIES);
  const [selectedMovieId, setSelectedMovieId] = useState(movieData);

  const handleGetMore = (id) => {
    getMovie({ variables: { id } })
    setSelectedMovieId(id);
  };

  function handleDelete() {
    setSelectedMovieId(null);
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="app">
      <div>
        <AddMovie />
        <AddAuthor className="ml-10" />
        <MovieList
          movies={data.movies} 
          onGetMore={handleGetMore} 
          onDeleteMovie={handleDelete}  
        />
      </div>

      {selectedMovieId && movieData?.movie && (
        <MovieDetails movie={ movieData?.movie } />
      )}
    </div>
  )
}

export default App;