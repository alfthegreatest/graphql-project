import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMoviePopup from "./components/AddMoviePopup";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_MOVIE, GET_MOVIES } from './graphql/queries';

function App() {
  const [getMovie, { data: movieData }] = useLazyQuery(GET_MOVIE);
  const { loading, error, data } = useQuery(GET_MOVIES);
  const handleGetMore = (id) => getMovie({ variables: { id } });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="app">
      <div>
        <AddMoviePopup />
        <MovieList movies={data.movies} onGetMore={handleGetMore} />
      </div>
      <MovieDetails movie={ movieData?.movie } />
    </div>
  )
}

export default App;