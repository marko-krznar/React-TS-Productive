import React from "react";

interface Props {
  timeEntry: {
    attributes: {
      note: string;
      time: number;
      date: string;
    };
  };
}

const UserTimeEntry: React.FC<Props> = ({ timeEntry }) => {
  return (
    <div>
      <span>{timeEntry.attributes.note}</span>
      <span>{timeEntry.attributes.time} min</span>
      <span>{timeEntry.attributes.date}</span>
    </div>
  );
};

export default UserTimeEntry;
