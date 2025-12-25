import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query {
    movies {
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
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div style={{padding: "20px"}}>
      {movieLoading && <p>Загрузка деталей...</p>}
      {movieData && (
        <div style={{padding: "15px", backgroundColor: "#3c3f3dff", marginBottom: "20px"}}>
          <h3>Movie details:</h3>
          <p>Title: {movieData.movie.title}</p>
          <p>Author: {movieData.movie.author.name}</p>
        </div>
      )}


      <h1>List of movies</h1>
      {data.movies.map(movie => (
        <div key={movie.id} style={{marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
          <h2 style={{marginBottom:"5px"}}>{movie.title} ({movie.year})
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault();
                getMovie({ variables: { id: movie.id } });
              }}
              style={{marginLeft: "10px", color: "#0066cc", textDecoration: "none", fontSize: "14px"}}
            >
              [Edit]
            </a>
          </h2>
          <p style={{margin:"0"}}>Rating: {movie.rating}</p>
          <p style={{margin:"0"}}>Author: {movie.author?.name ?? 'No author'}</p>
        </div>
      ))} 
    </div>
  )
}

export default App;