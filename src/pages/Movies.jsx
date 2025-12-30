import { useMovieUIStore } from '../stores/movieUI.store';
import MovieList from "../components/movies/MovieList";
import MovieDetails from "../components/movies/MovieDetails";
import AddMovie from "../components/movies/AddMovie";

import { useQuery } from "@apollo/client";
import { GET_MOVIE, GET_MOVIES } from '../graphql/queries';


export default function Movies() {
    const { loading, error, data } = useQuery(GET_MOVIES);
    const selectedMovieId = useMovieUIStore(s => s.selectedMovieId);

    const { data: movieDetails } = useQuery(GET_MOVIE, {
        variables: { id: selectedMovieId },
        skip: !selectedMovieId,
    });
   
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


    return(
        <div id="movies">
            <AddMovie className="ml-10"/>

            <MovieList
                movies={data.movies} 
            />

            {selectedMovieId && movieDetails && (
                <MovieDetails movie={ movieDetails?.movie } />
            )}
       </div>
    );
}