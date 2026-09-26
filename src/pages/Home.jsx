import { useState } from "react";
import { search_shows } from "../api/Apis";
import LoadingSpinner from "../components/LoadingSpinner";
import FailedToFetchData from "../components/FailedToFetchData";
import ShowsList from "../components/ShowsList";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  const onSearch = async () => {
    if (searchQuery.trim() === "") return;
    setLoading(true);
    setRequestFailed(false);
    setResults([]);
    const [success, searchResults] = await search_shows(searchQuery);
    setLoading(false);
    if (success) {
      setResults(searchResults.map((res) => res.show));
      setDisplayInfo(false);
    } else setRequestFailed(true);
  };

  return (
    <>
      <div className="mt-4 text-center">
        <h2> Home </h2>
      </div>

      <div className="row mt-4 g-0">
        <div className="col">
          <input
            type="text"
            placeholder="Search TV Shows Here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            id="searchbox"
          />
        </div>
        <div className="col-sm-auto">
          <button className="btn btn-primary" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="mt-4">
          <LoadingSpinner />
        </div>
      )}

      {requestFailed && (
        <div className="mt-1">
          <FailedToFetchData />
        </div>
      )}

      {displayInfo && (
        <div className="mt-4 text-center">
          <strong>Search. Track. Rewatch.</strong>
          <br />
          Explore TV shows and episodes powered by TVMaze API.
          <br />
          Heart your favorites to build your custom collection of Favourite
          Shows and Favourite Episodes.
        </div>
      )}

      <div className="mt-4">
        <ShowsList shows={results} displayCount={!displayInfo} />
      </div>
    </>
  );
};

export default Home;
