import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
      <nav>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/authors">Authors</NavLink>
      </nav>
    );
}