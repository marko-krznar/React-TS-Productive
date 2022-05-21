import React from "react";

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
    <div>
      <span>{timeEntry.attributes.note}</span>
      <span>{timeEntry.attributes.time} min</span>
      <span>{timeEntry.attributes.date}</span>
      <button onClick={() => handleDeleteTimeEntry(timeEntry.id)}>x</button>
    </div>
  );
};

export default UserTimeEntry;
