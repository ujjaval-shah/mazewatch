import EpisodeCard from "./EpisodeCard";

const EpisodesList = ({ episodes, nameLargeFonts, displayShowDetails }) => {
  return (
    <>
      {episodes.map((episodeData) => (
        <EpisodeCard
          episodeData={episodeData}
          nameLargeFonts={nameLargeFonts}
          displayShowDetails={displayShowDetails}
        />
      ))}
    </>
  );
};

export default EpisodesList;
