import { gql, useQuery, useLazyQuery } from "@apollo/client";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      year
    }
  }
`;

const GET_MOVIE = gql`
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


function App() {
  const [getMovie, { loading: movieLoading, data: movieData }] = useLazyQuery(GET_MOVIE);
  const { loading, error, data } = useQuery(GET_MOVIES);
  const handleGetMore = (id) => getMovie({ variables: { id } });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="app">

      <MovieList className="col1" movies={data.movies} onGetMore={handleGetMore} />
      <MovieDetails className="col2" movie={ movieData?.movie } />
    </div>
  )
}

export default App;