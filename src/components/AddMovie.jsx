import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, GET_MOVIES } from '../graphql/queries';
import { ADD_MOVIE } from "../graphql/mutations";
import DialogPopup from './interface/DialogPopup';


function AddMovie() {
    const currentYear = new Date().getFullYear();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState(currentYear);
    const [authorId, setAuthorId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const { loading: authorsLoading, data: authorsData } = useQuery(GET_AUTHORS);

    const [addMovie, { loading, error }] = useMutation(ADD_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }]
    });

    function resetFormData() {
        setTitle('');
        setYear(currentYear);
        setAuthorId(0);
    }

    function handleOnCloseClick() {
        setShowModal(false);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const data = {
                title,
                filmed: true,
                year: parseInt(year),
                rating: 1,
                authorId: String(authorId)
            };


            await addMovie({ variables: data });

            setShowModal(false);
            resetFormData();
        } catch (err) {
            console.error('Error adding movie:', err);
            alert('Error: ' + err.message);
        }
    };

    function handleCancel() {
        resetFormData(); 
        setShowModal(false)
    }

   
    return(
        <>
            <button onClick={() => {setShowModal(true)}}>Add movie</button>
            {showModal && (
                <DialogPopup
                    header={`Add author`}
                    content={
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="movie-title">Title</label>
                            <input 
                                id="movie-title" 
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="movie-year">Year</label>
                            <input
                                id="movie-year"
                                type="number" 
                                min="1900" 
                                max={new Date().getFullYear()}
                                step="1"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />    
                        </div>
                        <div>
                            <label htmlFor="movie-author">Author</label>
                            <select id="movie-author" onChange={(e) => setAuthorId(e.target.value)}>
                                <option value="0">not chosen</option> 
                                {authorsLoading 
                                    ? (<option disabled>Loading...</option>)
                                    : (
                                    authorsData?.authors.map(author => (
                                        <option key={author.id} value={author.id}>
                                            {author.name}
                                        </option>
                                    ))
                                )} 
                            </select>
                        </div>
                        <div className="form-buttons">
                            <input 
                                type="button" 
                                value="cancel"
                                className="btn btn-cancel"
                                onClick={handleCancel}
                            />
                            <input
                                type="submit" 
                                value="add movie"
                                className="btn btn-primary ml-5"
                                disabled={loading}
                            />
                            {error && <p style={{color: 'red'}}>Error: {error.message}</p>}
                        </div>
                    </form>}
                    onCloseClick={handleOnCloseClick}
                />)
            }
        </>
    )
}

export default AddMovie;