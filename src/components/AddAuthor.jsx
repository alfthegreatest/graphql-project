import { useState } from 'react';
import { useMutation } from '@apollo/client';
import DialogPopup from './interface/DialogPopup';
import { ADD_AUTHOR } from '../graphql/mutations';
import { GET_AUTHORS } from '../graphql/queries';


function AddAuthor({ className = '' }) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    

    const [addAuthor, { loading, error }] = useMutation(ADD_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }]
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                name,
                age
            }
            
            await addAuthor({ variables: data });
            
            setShowModal(false);
            resetFormData();
    } catch (err) {
            console.error('Error adding movie:', err);
            alert('Error: ' + err.message);
        }
    }

    function handleCancel() {
        setShowModal(false);
        resetFormData();
    }

    function handleOnCloseClick() {
        setShowModal(false);
    }

    function resetFormData() {
        setName('');
        setAge(0);
    }

    return (
        <>
            <button className={className} onClick={() => {setShowModal(true)}}>Add author</button>
            {showModal && (
                <DialogPopup
                    header={`Add author`}
                    content={
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="author-name">Name</label>
                            <input
                                id="author-name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="author-age">Age</label>
                            <input
                                type="number"
                                name="age"
                                min="0"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                            />
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
                                value="add author"
                                className="btn btn-primary ml-5"
                                disabled={loading}
                            />
                            {error && <p style={{color: 'red'}}>Error: {error.message}</p>}
                        </div>
                    </form>}
                    onCloseClick={handleOnCloseClick}
                />
            )}
        </>
    );
}

export default AddAuthor