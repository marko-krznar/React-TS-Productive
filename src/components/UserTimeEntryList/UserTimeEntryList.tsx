import React from "react";
import "./style.scss";

import { format } from "date-fns";

interface Props {
  timeEntry: {
    attributes: {
      note: string;
      time: number;
      date: string;
    };
    id: string;
  };

  handleDeleteTimeEntry: (arg: string) => void;
}

const UserTimeEntry: React.FC<Props> = ({
  timeEntry,
  handleDeleteTimeEntry,
}) => {
  return (
    <div className="block block--entry-item d-flex align-items-center justify-content-between flex-wrap">
      <span className="note">{timeEntry.attributes.note}</span>
      <span className="time">{timeEntry.attributes.time} min</span>
      <span className="date">
        {format(
          new Date(
            parseInt(timeEntry.attributes.date.substring(0, 4)),
            parseInt(timeEntry.attributes.date.substring(5, 7)),
            parseInt(timeEntry.attributes.date.substring(8, 10))
          ),
          "dd-MM-yyyy"
        )}
      </span>
      <button
        onClick={() => handleDeleteTimeEntry(timeEntry.id)}
        className="d-flex align-items-center"
      >
        <span>Delete note</span>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

export default UserTimeEntry;
