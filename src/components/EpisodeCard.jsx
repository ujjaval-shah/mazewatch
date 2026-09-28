import defaultEpisodeImg from "../assets/default-episode-image.png";
import DOMPurify from "dompurify";
import { useShowContext } from "../contexts/ShowContext";
import { Link } from "react-router";

const EpisodeCard = ({ episodeData, nameLargeFonts, displayShowDetails }) => {
  const { isALikedEpisode, likeAnEpisode, unlikeAnEpisode } = useShowContext();
  const isLiked = isALikedEpisode(episodeData.id);

  const onLikeUnlike = () => {
    if (isLiked) unlikeAnEpisode(episodeData.id);
    else likeAnEpisode(episodeData);
  };

  let name = `Episode ${episodeData.number}`;
  if (episodeData.type === "significant_special") name = "Significant Special";
  else if (episodeData.type === "insignificant_special")
    name = "Insignificant Special";
  if (!/^episode \d+$/i.test(episodeData.name))
    name = `${name}: ${episodeData.name}`;

  const showId = episodeData._links.show.href.split("/").at(-1);
  const showName = episodeData._links.show.name;

  return (
    <div className="card p-2 mb-3 text-bg-light">
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
          <span className={nameLargeFonts ? "episode-name" : ""}>
            <strong>{name}</strong>{" "}
            <i
              title={isLiked ? "Remove from Favourites" : "Add to Favourites"}
              className={isLiked ? "bi bi-heart-fill" : "bi bi-heart"}
              onClick={onLikeUnlike}
            />
          </span>
          <br />

          {displayShowDetails && (
            <>
              <strong>Show:</strong>{" "}
              <Link to={`/show/${showId}`} className="text-reset">
                {showName}
              </Link>
              {" | "}
              <strong>Season:</strong> {`Season ${episodeData.season}`}
              <br />
            </>
          )}

          {episodeData.rating.average && (
            <>
              <strong> Rating: </strong> {episodeData.rating.average}
              <br />
            </>
          )}

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(episodeData.summary),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
