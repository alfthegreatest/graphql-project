import DialogPopup from '../interface/DialogPopup';
import AddAuthorForm from './AddAuthorForm';
import { useAuthorUIStore } from "../../stores/authorUI.store";


export default function AddAuthor() {
    const addAuthorForm = useAuthorUIStore(s => s.addAuthorForm);
    const showAddAuthorForm = useAuthorUIStore(s => s.showAddAuthorForm);
    const hideAddAuthorForm = useAuthorUIStore(s => s.hideAddAuthorForm);

    
    return (
        <>
            <button onClick={() => showAddAuthorForm() }>Add author</button>
            {addAuthorForm && (
                <DialogPopup
                    header={`Add author`}
                    content={<AddAuthorForm />}
                    onCloseClick={() => hideAddAuthorForm()}
                />
            )}
        </>
    );
}