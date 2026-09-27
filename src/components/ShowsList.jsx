import ShowCard from "./ShowCard";

const ShowsList = ({ shows, displayCount }) => {
  return (
    <>
      {displayCount && (
        <div className="count">{`${shows.length} result(s) found.`}</div>
      )}

      <div className="mt-4">
        {shows.map((show_data) => (
          <ShowCard key={show_data.id} data={show_data} />
        ))}
      </div>
    </>
  );
};

export default ShowsList;
