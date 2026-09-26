import { NavLink } from "react-router";

const Favourites = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <h2> Favourites </h2>
      </div>
      <div className="mt-4 text-center">
        <NavLink to="/favourites/shows" end>
          Favourite Shows
        </NavLink>
        <br />
        <NavLink to="/favourites/episodes" end>
          Favourite Episodes
        </NavLink>
      </div>
    </>
  );
};

export default Favourites;
