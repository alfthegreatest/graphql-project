import { gql, useQuery } from "@apollo/client";

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

function App() {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div style={{padding: "20px"}}>
      <h1>List of movies</h1>   
      {data.movies.map(movie => (
        <div key={movie.id} style={{marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
          <h2 style={{marginBottom:"5px"}}>{movie.title} ({movie.year})</h2>
          <p style={{margin:"0"}}>Rating: {movie.rating}</p>
          <p style={{margin:"0"}}>Author: {movie.author?.name ?? 'No author'}</p>
        </div>
      ))} 
    </div>
  )
}

export default App;