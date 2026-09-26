import axios from "axios";

const base_url = "https://api.tvmaze.com/";

export const search_shows = async (searchQuery) => {
  return await axios
    .get(`${base_url}search/shows`, { params: { q: searchQuery } })
    .then((response) => [true, response.data])
    .catch((err) => [false, console.log(err)]);
};

export const get_show = async (show_id) => {
  return await axios
    .get(`${base_url}shows/${show_id}`)
    .then((response) => [true, response.data])
    .catch((err) => [false, console.log(err)]);
};

export const get_show_cast = async (show_id) => {
  return await axios
    .get(`${base_url}shows/${show_id}/cast`)
    .then((response) => [true, response.data])
    .catch((err) => [false, console.log(err)]);
};

export const get_show_seasons = async (show_id) => {
  return await axios
    .get(`${base_url}shows/${show_id}/seasons`)
    .then((response) => [true, response.data])
    .catch((err) => [false, console.log(err)]);
};

export const get_season_episodes = async (season_id) => {
  return await axios
    .get(`${base_url}seasons/${season_id}/episodes`)
    .then((response) => [true, response.data])
    .catch((err) => [false, console.log(err)]);
};
