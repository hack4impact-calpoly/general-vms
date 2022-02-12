import { Link } from 'react-router-dom';
import './Navbar.scss';

function NavBar() {
  return (
    <header className="main-header">
      <p className="main-text">
        <Link to="/"><img className="main-logo" src='../assets/images/logo192.png' alt="Org Logo" /></Link>
        <Link to="/">General VMS</Link>
      </p>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/">Volunteers</Link>
        <Link to="/">Shifts</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default NavBar;
