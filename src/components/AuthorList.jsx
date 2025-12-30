import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useMovieUIStore } from '../stores/movieUI.store';
import { DELETE_AUTHOR } from "../graphql/mutations";
import { GET_AUTHOR, GET_AUTHORS } from "../graphql/queries";
import AuthorItem from './AuthorItem';
import DialogPopup from './interface/DialogPopup';


export default function AuthorList({ authors }) {
    const authorToDelete = useMovieUIStore(s => s.authorToDelete);
    const clearAuthorToDelete = useMovieUIStore(s => s.clearAuthorToDelete);
    const setSelectedAuthorId = useMovieUIStore(s => s.setSelectedAuthorId);

    const [getAuthor, { data: authorData }] = useLazyQuery(GET_AUTHOR);

    const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
      refetchQueries: [{ query: GET_AUTHORS }]
    });

    async function handleDeleteAuthor() {
        const { data } = await getAuthor({ 
            variables: { id: authorToDelete.id } 
        });

        if (data?.author?.movies?.length > 0) {
            alert(`Cannot delete author "${authorToDelete.name}". They have ${data.author.movies.length} movie(s).`);
            clearAuthorToDelete();
            return;
        }

        await deleteAuthor({ variables: { id: authorToDelete.id } });
        setSelectedAuthorId();
        clearAuthorToDelete()
    }

    if(!authors) return null;


    return(
        <div>
            <h1>Authors</h1>
            {authors.map(author => (
                <AuthorItem 
                    author={author} 
                    key={author.id}
                />
            ))}

            {authorToDelete && (
                <DialogPopup
                    header={`Delete author "${authorToDelete.name}"?`}
                    content={
                    <>
                        <input
                            type="button" 
                            value="confirm"
                            className="btn btn-cancel"
                            onClick={handleDeleteAuthor}
                        />
                        <input
                            type="button" 
                            value="cancel"
                            className="btn btn-gray"
                            onClick={clearAuthorToDelete}
                        />
                    </>
                    }
                    onCloseClick={clearAuthorToDelete}
                />
            )}
        </div>
    );
}