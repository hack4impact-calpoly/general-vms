import { Link } from 'react-router-dom';
import './Navbar.scss';

function NavBar() {
  return (
    <header className="main-header">
      <p className="main-text"><Link to="/home">General VMS</Link></p>
      <nav className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/home">Volunteers</Link>
        <Link to="/home">Shifts</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default NavBar;
