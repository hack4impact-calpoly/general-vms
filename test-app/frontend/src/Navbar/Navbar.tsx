import { Link } from 'react-router-dom';
import h4ilogo from '../assets/images/logo192.png';
import './Navbar.scss';

function NavBar() {
  return (
    <header className="main-header">
      <div className="logo-nav">
        <Link to="/">
          <img className="main-logo" src={h4ilogo} alt="Org Logo" />
          <span>General VMS</span>
        </Link>
      </div>
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
