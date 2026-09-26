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

  const likeAShow = (show_data) => {
    if (!isALikedShow(show_data.id)) {
      setLikedShows((prev) => [show_data, ...prev]);
    }
  };

  const unlikeAShow = (show_id) => {
    setLikedShows((prev) => prev.filter((show) => show.id !== show_id));
  };

  const value = {
    likedShows,
    isALikedShow,
    likeAShow,
    unlikeAShow,
  };

  return <ShowContext value={value}>{children}</ShowContext>;
};
