import DialogPopup from '../interface/DialogPopup';
import AddMovieForm from './AddMovieForm';
import { useMovieUIStore } from "../../stores/movieUI.store";


function AddMovie() {
    const addMovieForm = useMovieUIStore(s => s.addMovieForm);
    const showAddMovieForm = useMovieUIStore(s => s.showAddMovieForm);
    const hideAddMovieForm = useMovieUIStore(s => s.hideAddMovieForm);
   
    return(
        <>
            <button onClick={() => showAddMovieForm()}>Add movie</button>
            {addMovieForm && (
                <DialogPopup
                    header={`Add movie`}
                    content={<AddMovieForm />}
                    onCloseClick={() => hideAddMovieForm()}
                />)
            }
        </>
    )
}

export default AddMovie;