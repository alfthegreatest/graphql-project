import { ADD_AUTHOR } from '../../graphql/mutations';
import { GET_AUTHORS } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuthorUIStore } from '../../stores/authorUI.store';

// validation
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(20, 'Name has to be shorter than 20 symbols'),
  age: z.coerce.number().int().min(1, 'Age must be > 0'),
});


export default function AddAuthorForm() {
    const hideAddAuthorForm = useAuthorUIStore(s => s.hideAddAuthorForm);
    const [addAuthor, { loading, error }] = useMutation(ADD_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }]
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            await addAuthor({ variables: data });
            hideAddAuthorForm();
            reset();
        } catch (err) {
            console.error('Error adding author:', err);
        }
    }

    function cancelHandle() {
        hideAddAuthorForm();
        reset();
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="author-name">Name</label>
                <input type="text" {...register('name')} />
                {errors.name && <p className="field-error">{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="author-age">Age</label>
                <input type="number" {...register('age')} />
                {errors.age && <p className="field-error">{errors.age.message}</p>}
            </div>
            <div className="form-buttons">
                <input
                    type="button"
                    value="cancel"
                    className="btn btn-cancel"
                    onClick={cancelHandle}
                />
                <input
                    type="submit"
                    value="add author"
                    className="btn btn-primary ml-5"
                    disabled={loading}
                />
                {error && <p className="error">Error: {error.message}</p>}
            </div>
        </form>
    )
}