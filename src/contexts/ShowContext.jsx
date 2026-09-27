import { createContext, useContext, useEffect, useState } from "react";

const ShowContext = createContext();

export const useShowContext = () => useContext(ShowContext);

export const ShowProvider = ({ children }) => {
  const [likedShows, setLikedShows] = useState(() => {
    const storedLikedShows = localStorage.getItem("likedShows");
    return storedLikedShows ? JSON.parse(storedLikedShows) : [];
  });
  const [likedEpisodes, setLikedEpisodes] = useState(() => {
    const storedLikedEpisodes = localStorage.getItem("likedEpisodes");
    return storedLikedEpisodes ? JSON.parse(storedLikedEpisodes) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedShows", JSON.stringify(likedShows));
  }, [likedShows]);

  useEffect(() => {
    localStorage.setItem("likedEpisodes", JSON.stringify(likedEpisodes));
  }, [likedEpisodes]);

  const isALikedShow = (show_id) => {
    return likedShows.some((show) => show.id === show_id);
  };

  const isALikedEpisode = (episode_id) => {
    return likedEpisodes.some((episode) => episode.id == episode_id);
  };

  const likeAShow = (show_data) => {
    if (!isALikedShow(show_data.id)) {
      setLikedShows((prev) => [show_data, ...prev]);
    }
  };

  const likeAnEpisode = (episode_data) => {
    if (!isALikedEpisode(episode_data.id)) {
      setLikedEpisodes((prev) => [episode_data, ...prev]);
    }
  };

  const unlikeAShow = (show_id) => {
    setLikedShows((prev) => prev.filter((show) => show.id !== show_id));
  };

  const unlikeAnEpisode = (episode_id) => {
    setLikedEpisodes((prev) =>
      prev.filter((episode) => episode.id !== episode_id),
    );
  };

  const value = {
    likedShows,
    isALikedShow,
    likeAShow,
    unlikeAShow,
    likedEpisodes,
    isALikedEpisode,
    likeAnEpisode,
    unlikeAnEpisode,
  };

  return <ShowContext value={value}>{children}</ShowContext>;
};
