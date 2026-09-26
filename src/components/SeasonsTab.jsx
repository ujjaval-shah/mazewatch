import { useState } from "react";
import Season from "./Season";

const SeasonsTab = ({ data }) => {
  const [activeSeason, setActiveSeason] = useState(data[0]);

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-auto">
          <ul class="list-group">
            {data.map((item) => (
              <li
                className={
                  item.number === activeSeason.number
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => setActiveSeason(item)}
              >
                Season {item.number}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <Season seasonId={activeSeason.id} />
        </div>
      </div>
    </div>
  );
};

export default SeasonsTab;
