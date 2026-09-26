import axios from "axios";

const base_url = "https://api.tvmaze.com/";

export const search_shows = async (searchQuery) => {
  return await axios
    .get(`${base_url}search/shows`, { params: { q: searchQuery } })
    .then((response) => [true, response.data])
    .catch((err) => [false, console.log(err)]);
};
