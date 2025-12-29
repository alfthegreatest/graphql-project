import { useMovieUIStore } from "../stores/movieUI.store";


export default function AuthorItem({ author }) {
    const setAuthorToDelete = useMovieUIStore(s => s.setAuthorToDelete);
    const setSelectedAuthorId = useMovieUIStore(s => s.setSelectedAuthorId);

    if(!author) return null;

    
    return(
        <div className="author-item">
            <h2>
                <a 
                href="#" 
                className="delete-cross"
                onClick={(e) => { 
                    e.preventDefault();
                    setAuthorToDelete(author);
                }}
                >[x]</a>

                {author.name} ({author.age})
                <a 
                    href="#" 
                    className="more-link"
                    onClick={(e) => { 
                        e.preventDefault();
                        setSelectedAuthorId(author.id);
                    }}
                >[more]</a>
            </h2>
        </div>
    )
}