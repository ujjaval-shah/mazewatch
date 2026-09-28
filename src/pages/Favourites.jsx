import { Link } from "react-router";

const Favourites = () => {
  return (
    <>
      <div className="mt-4 text-center page-heading">
        <h2> Favourites </h2>
      </div>

      <div className="mt-4 text-center">
        <Link to="/favourites/shows">Favourite Shows</Link>
        <br />
        <Link to="/favourites/episodes">Favourite Episodes</Link>
      </div>
    </>
  );
};

export default Favourites;
