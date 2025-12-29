import { useMovieUIStore } from '../stores/movieUI.store';
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";
import AddMovie from "../components/AddMovie";

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
            <AddMovie />

            <MovieList
                movies={data.movies} 
            />

            {selectedMovieId && movieDetails && (
                <MovieDetails movie={ movieDetails?.movie } />
            )}
       </div>
    );
}