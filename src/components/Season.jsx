import { useEffect, useState } from "react";
import { get_season_episodes } from "../api/Apis";
import LoadingSpinner from "./LoadingSpinner";
import FailedToFetchData from "./FailedToFetchData";
import EpisodesList from "./EpisodesList";

const Season = ({ seasonId }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setEpisodes([]);
      setLoading(true);
      setRequestFailed(false);
      const [success, fetchedEpisodes] = await get_season_episodes(seasonId);
      setLoading(false);
      if (success) setEpisodes(fetchedEpisodes);
      else setRequestFailed(true);
    };

    fetchData();
  }, [seasonId]);

  return (
    <>
      {loading && <LoadingSpinner />}

      {requestFailed && <FailedToFetchData />}

      <EpisodesList
        episodes={episodes}
        nameLargeFonts={false}
        displayShowDetails={false}
      />
    </>
  );
};

export default Season;
