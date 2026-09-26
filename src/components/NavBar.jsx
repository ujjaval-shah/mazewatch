import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary" data-bs-theme="dark">
      <div className="container-800">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/favourites/shows" end>
              Favourite Shows
            </NavLink>
            <NavLink className="nav-link" to="/favourites/episodes" end>
              Favourite Episodes
            </NavLink>
            <NavLink className="nav-link" to="/about" end>
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
