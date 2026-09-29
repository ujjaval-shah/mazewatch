import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useShowContext } from "../contexts/ShowContext";
import { get_episode, get_episode_guestcast } from "../api/Apis";
import LoadingSpinner from "../components/LoadingSpinner";
import FailedToFetchData from "../components/FailedToFetchData";
import defaultEpisodeImg from "../assets/default-episode-image.png";
import DOMPurify from "dompurify";
import CastTab from "../components/CastTab";

const Episode = () => {
  const { isALikedEpisode, likeAnEpisode, unlikeAnEpisode } = useShowContext();
  const { id } = useParams();
  const [episodeData, setEpisodeData] = useState(null);
  const [guestCastData, setGuestCastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setRequestFailed(false);
      const [success1, fetchedEpisodeData] = await get_episode(id);
      const [success2, fetchedGuestCastData] = await get_episode_guestcast(id);
      setLoading(false);
      if (success1 && success2) {
        setEpisodeData(fetchedEpisodeData);
        setGuestCastData(fetchedGuestCastData);
      } else setRequestFailed(true);
    };

    fetchData();
  }, [id]);

  const isLiked = episodeData ? isALikedEpisode(episodeData.id) : false;
  const onLikeUnlike = () => {
    if (isLiked) unlikeAnEpisode(episodeData.id);
    else likeAnEpisode(episodeData);
  };

  let name = "";
  if (episodeData) {
    name = `Episode ${episodeData.number}`;
    if (episodeData.type === "significant_special")
      name = "Significant Special";
    else if (episodeData.type === "insignificant_special")
      name = "Insignificant Special";
    if (!/^episode \d+$/i.test(episodeData.name))
      name = `${name}: ${episodeData.name}`;
  }

  let formattedDate = "";
  if (episodeData && episodeData.airdate) {
    const date = new Date(episodeData.airdate);
    formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const showId = episodeData
    ? episodeData._links.show.href.split("/").at(-1)
    : "";
  const showName = episodeData ? episodeData._links.show.name : "";

  return (
    <>
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

      {episodeData && (
        <>
          <div className="mt-4 text-center page-heading">
            <h2>
              {name}{" "}
              <i
                title={isLiked ? "Remove from Favourites" : "Add to Favourites"}
                className={isLiked ? "bi bi-heart-fill" : "bi bi-heart"}
                onClick={onLikeUnlike}
              />
            </h2>
          </div>

          <div className="mt-4">
            <div className="row">
              <div className="col-auto">
                {episodeData.image ? (
                  <img
                    src={episodeData.image.medium}
                    className="episode-img"
                    alt={`${episodeData.name} poster`}
                  />
                ) : (
                  <img
                    src={defaultEpisodeImg}
                    className="episode-img"
                    alt={`${episodeData.name} poster`}
                  />
                )}
              </div>

              <div className="col">
                <strong> Show: </strong>{" "}
                <Link to={`/show/${showId}`} className="text-reset">
                  {showName}
                </Link>
                <br />
                <strong> Season: </strong> {`Season ${episodeData.season}`}
                <br />
                <strong> Rating: </strong>{" "}
                {episodeData.rating.average
                  ? episodeData.rating.average
                  : "(Not enough votes)"}
                <br />
                <strong> Airdate: </strong> {formattedDate}
                <br />
                <strong> Runtime: </strong>{" "}
                {episodeData.runtime ? `${episodeData.runtime} minutes` : ""}
                <br />
                <strong> Summary: </strong>
                {episodeData.summary ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(episodeData.summary),
                    }}
                  />
                ) : (
                  "(Summary not available)"
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ul className="nav nav-underline justify-content-center">
              <li className="nav-item">
                <a className="nav-link active" href="javascript:void(0)">
                  Guest Cast
                </a>
              </li>
            </ul>
          </div>

          <CastTab data={guestCastData} />
        </>
      )}
    </>
  );
};

export default Episode;
