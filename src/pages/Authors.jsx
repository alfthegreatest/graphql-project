import { useQuery } from '@apollo/client';
import { GET_AUTHOR, GET_AUTHORS } from '../graphql/queries';
import { useMovieUIStore } from '../stores/movieUI.store';
import AddAuthor from '../components/authors/AddAuthor';
import AuthorList from '../components/authors/AuthorList';
import AuthorDetails from '../components/authors/AuthorDetails';


export default function Authors() {
    const {loading, error, data } = useQuery(GET_AUTHORS);
    const selectedAuthorId = useMovieUIStore(s => s.selectedAuthorId);

    const { data: authorDetails } = useQuery(GET_AUTHOR, {
        variables: { id: selectedAuthorId },
        skip: !selectedAuthorId,
    });

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


    return(
        <div id="authors">
            <AddAuthor className="ml-10" />

            <AuthorList
                authors={data.authors} 
            />

            {selectedAuthorId && authorDetails && (
                <AuthorDetails author={ authorDetails?.author } />
            )}
        </div>
    );
}