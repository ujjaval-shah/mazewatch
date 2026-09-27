import EpisodeCard from "./EpisodeCard";

const EpisodesList = ({ episodes, nameLargeFonts, displayShowDetails }) => {
  return (
    <>
      {episodes.map((episodeData) => (
        <EpisodeCard
          key={episodeData.id}
          episodeData={episodeData}
          nameLargeFonts={nameLargeFonts}
          displayShowDetails={displayShowDetails}
        />
      ))}
    </>
  );
};

export default EpisodesList;
