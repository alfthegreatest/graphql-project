import { useQuery } from '@apollo/client';
import { GET_AUTHOR, GET_AUTHORS } from '../graphql/queries';
import { useAuthorUIStore } from '../stores/authorUI.store';
import AddAuthor from '../components/authors/AddAuthor';
import AuthorList from '../components/authors/AuthorList';
import AuthorDetails from '../components/authors/AuthorDetails';
import useIsMobile from '../hooks/useIsMobile';


export default function Authors() {
    const isMobile = useIsMobile();
    const {loading, error, data } = useQuery(GET_AUTHORS);
    const selectedAuthorId = useAuthorUIStore(s => s.selectedAuthorId);

    const { data: authorDetails } = useQuery(GET_AUTHOR, {
        variables: { id: selectedAuthorId },
        skip: !selectedAuthorId,
    });

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


    return(
        <>
            {isMobile && (
                <AddAuthor />
            )}
            <div id="authors">
                {!isMobile && (
                    <AddAuthor />
                )}


                <AuthorList
                    authors={data.authors} 
                />

                {selectedAuthorId && authorDetails && (
                    <AuthorDetails author={ authorDetails?.author } />
                )}
            </div>
        </>
    );
}