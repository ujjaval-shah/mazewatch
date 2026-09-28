import ShowsList from "../components/ShowsList";
import { useShowContext } from "../contexts/ShowContext";

const FavouriteShows = () => {
  const { likedShows } = useShowContext();

  return (
    <>
      <div className="mt-4 text-center page-heading">
        <h2> Favourite Shows </h2>
      </div>

      <div className="mt-4">
        <ShowsList shows={likedShows} displayCount={false} />

        {likedShows.length === 0 && (
          <div className="text-center">
            The shows that you like will appear here.
          </div>
        )}
      </div>
    </>
  );
};

export default FavouriteShows;
