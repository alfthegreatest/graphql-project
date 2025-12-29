export default function AuthorDetails({ author }) {
  if (!author) return null;

  return (
    <div className="author-details">
      <h3>Author details:</h3>
      <p><span className="key">Name:</span> <span className="value">{author.name}</span></p>
      <p><span className="key">Age:</span> <span className="value">{author.age}</span></p>
    </div>
  )
}