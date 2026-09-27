import defaultPersonImg from "../assets/default-person-image.png";

const Cast = ({ castDataItem }) => {
  const { person, character, voice } = castDataItem;

  let imgSrc = character.image
    ? character.image.medium
    : person.image
      ? person.image.medium
      : "";

  return (
    <div className="col mb-3">
      <div className="row g-0">
        <div className="col-auto">
          {imgSrc ? (
            <img src={imgSrc} class="person-img" alt={person.name} />
          ) : (
            <img src={defaultPersonImg} class="person-img" alt={person.name} />
          )}
        </div>
        <div className="col ps-2">
          <strong>{person.name}</strong> {voice ? "voices" : "as"}{" "}
          {character.name}
        </div>
      </div>
    </div>
  );
};

const CastTab = ({ data }) => {
  return (
    <div className="mt-4">
      {data.length > 0 ? (
        <div class="row row-cols-2">
          {data.map((item) => (
            <Cast castDataItem={item} />
          ))}
        </div>
      ) : (
        <div className="text-center"> (Cast information not available) </div>
      )}
    </div>
  );
};

export default CastTab;
