import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <>
      <div className="mt-4 text-center page-heading">
        <h2> Error 404 </h2>
      </div>

      <div className="mt-4 text-center">
        <span style={{ fontSize: "xxx-large" }}>
          <i class="bi bi-exclamation-triangle-fill"></i>
        </span>
        <br />
        <br />
        Oops!
        <br />
        You've wandered off the path. Let's get you back on track.
        <br />
        <br />
        <>
          <Link to="/">Home</Link>
          <br />
          <Link to="/favourites/shows">Favourite Shows</Link>
          <br />
          <Link to="/favourites/episodes">Favourite Episodes</Link>
          <br />
          <Link to="/about">About</Link>
        </>
      </div>
    </>
  );
};

export default PageNotFound;
