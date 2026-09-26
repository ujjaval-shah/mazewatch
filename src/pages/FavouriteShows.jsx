import ShowsList from "../components/ShowsList";
import { useShowContext } from "../contexts/ShowContext";

const FavouriteShows = () => {
  const { likedShows } = useShowContext();

  return (
    <>
      <div className="mt-4 text-center">
        <h2> Favourite Shows </h2>
      </div>

      <div className="mt-4">
        <ShowsList shows={likedShows} displayCount={false} />
      </div>
    </>
  );
};

export default FavouriteShows;
