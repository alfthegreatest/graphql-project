import { useState } from 'react';
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";
import AddMovie from "../components/AddMovie";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_MOVIE, GET_MOVIES } from '../graphql/queries';


export default function Movies() {
    const [getMovie, { data: movieData }] = useLazyQuery(GET_MOVIE);

    const { loading, error, data } = useQuery(GET_MOVIES);
    const [selectedMovieId, setSelectedMovieId] = useState(movieData);


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const handleGetMore = (id) => {
        getMovie({ variables: { id } })
        setSelectedMovieId(id);
    };

    function handleDelete() {
        setSelectedMovieId(null);
    }


    return(
        <div id="movies">
            <AddMovie />

            <MovieList
                movies={data.movies} 
                onGetMore={handleGetMore} 
                onDeleteMovie={handleDelete}  
            />

        {selectedMovieId && movieData?.movie && (
            <MovieDetails movie={ movieData?.movie } />
        )}


        </div>
    );
}