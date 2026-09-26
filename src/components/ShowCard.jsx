import defaultShowImg from "../assets/default-show-image.png";
import DOMPurify from "dompurify";
import { useShowContext } from "../contexts/ShowContext";
import { Link } from "react-router";

const SubHeading = ({ data }) => {
  const network = data.network ? data.network.name : data.webChannel.name;
  const start = data.premiered.slice(0, 4);
  const end = data.status === "Ended" ? data.ended.slice(0, 4) : "Now";

  return <>{`(${network}, ${start}-${end})`}</>;
};

const ShowCard = ({ data }) => {
  const { isALikedShow, likeAShow, unlikeAShow } = useShowContext();
  const isLiked = isALikedShow(data.id);

  const onLikeUnlike = () => {
    if (isLiked) unlikeAShow(data.id);
    else likeAShow(data);
  };

  return (
    <div className="mb-3">
      <div class="card p-2 text-bg-light">
        <div className="row">
          <div className="col-auto">
            <Link to={`/show/${data.id}`}>
              {data.image ? (
                <img
                  src={data.image.medium}
                  class="show-card-img"
                  alt={`${data.name} poster`}
                />
              ) : (
                <img
                  src={defaultShowImg}
                  class="show-card-img"
                  alt={`${data.name} poster`}
                />
              )}
            </Link>
          </div>
          <div className="col">
            <span className="show-name">
              <Link
                to={`/show/${data.id}`}
                className="text-decoration-none text-reset"
              >
                <strong>{data.name}</strong>
              </Link>{" "}
              <i
                className={isLiked ? "bi bi-heart-fill" : "bi bi-heart"}
                onClick={onLikeUnlike}
              />
            </span>
            <br />
            <SubHeading data={data} />
            <br />
            <strong> Rating: </strong>{" "}
            {data.rating.average ? data.rating.average : "(Not enough votes)"}
            <br />
            <strong> Genre: </strong> {data.genres.join(", ")}
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.summary),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
