import React from "react";
import "./style.scss";

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
    <div className="block block--entry-item d-flex align-items-center justify-content-between">
      <span className="note">{timeEntry.attributes.note}</span>
      <span className="time">{timeEntry.attributes.time} min</span>
      <span className="date">{timeEntry.attributes.date}</span>
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
