import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get_show, get_show_cast, get_show_seasons } from "../api/Apis";
import LoadingSpinner from "../components/LoadingSpinner";
import FailedToFetchData from "../components/FailedToFetchData";
import defaultShowImg from "../assets/default-show-image.png";
import DOMPurify from "dompurify";
import CastTab from "../components/CastTab";
import SeasonsTab from "../components/SeasonsTab";
import { useShowContext } from "../contexts/ShowContext";

const Show = () => {
  const { isALikedShow, likeAShow, unlikeAShow } = useShowContext();
  const { id } = useParams();
  const [showData, setShowData] = useState(null);
  const [castData, setCastData] = useState([]);
  const [seasonsData, setSeasonsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const [activeTab, setActiveTab] = useState("cast");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setRequestFailed(false);
      const [success1, fetchedShowData] = await get_show(id);
      const [success2, fetchedCastData] = await get_show_cast(id);
      const [success3, fetchedSeasonsData] = await get_show_seasons(id);
      setLoading(false);
      if (success1 && success2 && success3) {
        setShowData(fetchedShowData);
        setCastData(fetchedCastData);
        setSeasonsData(fetchedSeasonsData);
      } else setRequestFailed(true);
    };

    fetchData();
  }, [id]);

  const isLiked = showData ? isALikedShow(showData.id) : false;
  const onLikeUnlike = () => {
    if (isLiked) unlikeAShow(showData.id);
    else likeAShow(showData);
  };

  const start = showData?.premiered?.slice(0, 4) ?? "";
  const end = showData
    ? showData.status === "Ended"
      ? (showData.ended?.slice(0, 4) ?? "")
      : "Now"
    : "";

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

      {showData && (
        <>
          <div className="mt-4 text-center page-heading">
            <h2>
              {showData.name}{" "}
              <i
                title={isLiked ? "Remove from Favourites" : "Add to Favourites"}
                className={isLiked ? "bi bi-heart-fill" : "bi bi-heart"}
                onClick={onLikeUnlike}
              />{" "}
            </h2>
          </div>

          <div className="mt-4">
            <div className="row">
              <div className="col-auto">
                {showData.image ? (
                  <img
                    src={showData.image.medium}
                    className="show-img"
                    alt={`${showData.name} poster`}
                  />
                ) : (
                  <img
                    src={defaultShowImg}
                    className="show-img"
                    alt={`${showData.name} poster`}
                  />
                )}
              </div>

              <div className="col">
                {showData.network && (
                  <>
                    <strong> Network: </strong>{" "}
                    {`${showData.network.name} (${start}-${end})`}
                    <br />
                  </>
                )}
                {showData.webChannel && (
                  <>
                    <strong> Web Channel: </strong>{" "}
                    {`${showData.webChannel.name} (${start}-${end})`}
                    <br />
                  </>
                )}
                <strong> Rating: </strong>{" "}
                {showData.rating.average
                  ? showData.rating.average
                  : "(Not enough votes)"}
                <br />
                <strong> Genre: </strong> {showData.genres.join(", ")}
                <br />
                {showData.averageRuntime && (
                  <>
                    <strong> Average Runtime: </strong>{" "}
                    {`${showData.averageRuntime} minutes`}
                    <br />
                  </>
                )}
                <strong> Status: </strong> {showData.status}
                <br />
                <strong> Language: </strong> {showData.language}
                <br />
                <strong> Show Type: </strong> {showData.type}
                <br />
                <strong> Summary: </strong>
                {showData.summary ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(showData.summary),
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
              <li className="nav-item" onClick={() => setActiveTab("cast")}>
                <a
                  className={
                    activeTab === "cast" ? "nav-link active" : "nav-link"
                  }
                  href="javascript:void(0)"
                >
                  Cast
                </a>
              </li>
              <li className="nav-item" onClick={() => setActiveTab("seasons")}>
                <a
                  className={
                    activeTab === "seasons" ? "nav-link active" : "nav-link"
                  }
                  href="javascript:void(0)"
                >
                  Seasons
                </a>
              </li>
            </ul>
          </div>

          {activeTab === "cast" && <CastTab data={castData} />}

          {activeTab === "seasons" && <SeasonsTab data={seasonsData} />}
        </>
      )}
    </>
  );
};

export default Show;
