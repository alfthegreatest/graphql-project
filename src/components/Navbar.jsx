import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
      <nav>
        <Link to="/movies">Movies</Link>
        <Link to="/authors" default>Authors</Link>
      </nav>
    );
}