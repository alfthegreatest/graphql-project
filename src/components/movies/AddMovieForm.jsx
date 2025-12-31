import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, GET_MOVIES } from '../../graphql/queries';
import { ADD_MOVIE } from "../../graphql/mutations";
import { useMovieUIStore } from '../../stores/movieUI.store';

// validation
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const currYear = new Date().getFullYear();
const schema = z.object({
  title: z.string().min(1, 'Name is required').max(30, 'Name has to be shorter than 30 symbols'),
  year: z.coerce.number().min(1901, 'Year must be > 1900').max(currYear, `Year must be <= ${currYear}`),
  authorId: z.string().refine(val => val !== "0", { message: "Please select an author" }),
});


export default function AddMovieForm() {
    const hideAddMovieForm = useMovieUIStore(s => s.hideAddMovieForm);
    const { loading: authorsLoading, data: authorsData } = useQuery(GET_AUTHORS);
    const [addMovie, { loading, error }] = useMutation(ADD_MOVIE, {
        refetchQueries: [{ query: GET_MOVIES }]
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });
    
    const onSubmit = async (data) => {
        data.filmed = true;
        data.rating = 0;

        try {
            await addMovie({ variables: data });
            hideAddMovieForm();
            reset();
        } catch (err) {
            console.error('Error adding movie:', err);
        }
    };

    function handleCancel() {
        hideAddMovieForm();
        reset();
    }


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="movie-title">Title</label>
                <input type="text" {...register('title')} />
                {errors.title && <p className="field-error">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="movie-year">Year</label>
                <input type="number" {...register('year')} />
                {errors.year && <p className="field-error">{errors.year.message}</p>}
            </div>
            
            <div>
                <label htmlFor="movie-author">Author</label>
                <select id="movie-author" {...register("authorId")}>
                    <option value="0">not chosen</option> 
                    {authorsLoading 
                    ? (<option disabled>Loading...</option>)
                    : (
                        authorsData?.authors.map(author => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                        ))
                    )
                    } 
                </select>
                {errors.authorId && (
                    <span className="field-error">{errors.authorId.message}</span>
                )}
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
                {error && <div className="error">Error: {error.message}</div>}
            </div>
        </form>
    )
}