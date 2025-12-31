export default function AuthorDetails({ author }) {
  if (!author) return null;

  return (
    <div className="author-details">
      <h3>Author details:</h3>
      <p><span className="key">Name:</span> <span className="value">{author.name}</span></p>
      <p><span className="key">Age:</span> <span className="value">{author.age}</span></p>

      {!!author.movies.length && (
        <div className="author-movies"><span className="key">Movies:</span>
          <ul>
          {author.movies && author.movies.map((movie, index) => 
            (<li key="key={`${author.id}-${movie.id}`}">{movie.title} ({movie.year})</li>)
          )}
          </ul>
        </div>
      )}
    </div>
  )
}