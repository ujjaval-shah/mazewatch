import EpisodesList from "../components/EpisodesList";
import { useShowContext } from "../contexts/ShowContext";

const FavouriteEpisodes = () => {
  const { likedEpisodes } = useShowContext();

  return (
    <>
      <div className="mt-4 text-center page-heading">
        <h2> Favourite Episodes </h2>
      </div>

      <div className="mt-4">
        <EpisodesList
          episodes={likedEpisodes}
          nameLargeFonts={true}
          displayShowDetails={true}
        />

        {likedEpisodes.length === 0 && (
          <div className="text-center">
            The episodes that you like will appear here.
          </div>
        )}
      </div>
    </>
  );
};

export default FavouriteEpisodes;
