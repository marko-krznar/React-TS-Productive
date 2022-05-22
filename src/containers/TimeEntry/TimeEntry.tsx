import React, { useEffect, useState } from "react";
import { apiDELETE, apiGET, apiPOST } from "../../api";
import AddNewEntry from "../../components/AddNewEntry/AddNewEntry";
import UserTimeEntryList from "../../components/UserTimeEntryList/UserTimeEntryList";

const TimeEntry: React.FC = () => {
  const [personId, setPersonId] = useState<number>();
  const [userTimeEntryList, setUserTimeEntryList] = useState<[]>([]);

  useEffect(() => {
    apiGET("https://api.productive.io/api/v2/organization_memberships").then(
      (res) => setPersonId(res.data[0].relationships.person.data.id)
    );
  }, []);

  useEffect(() => {
    apiGET(
      `https://api.productive.io/api/v2/time_entries?person_id=${personId}&after&before`
    ).then((res) => setUserTimeEntryList(res.data));
  }, [personId]);

  const handleDeleteTimeEntry = (timeEntryId: string) => {
    apiDELETE(`https://api.productive.io/api/v2/time_entries/${timeEntryId}`);
  };

  type taskT = {
    note: string;
    time: number;
  };

  const handleNewTask = (task: taskT) => {
    let newTask = {
      data: {
        type: "time_entries",
        attributes: {
          note: task.note,
          date: "2022-06-20",
          time: task.time,
        },
        relationships: {
          person: {
            data: {
              type: "people",
              id: "271501",
            },
          },
          service: {
            data: {
              type: "services",
              id: "1687704",
            },
          },
        },
      },
    };
    apiPOST(`https://api.productive.io/api/v2/time_entries`, newTask);
  };

  return (
    <>
      <AddNewEntry handleNewTask={handleNewTask} />
      {userTimeEntryList.map((timeEntry, i) => (
        <UserTimeEntryList
          key={i}
          timeEntry={timeEntry}
          handleDeleteTimeEntry={handleDeleteTimeEntry}
        />
      ))}
    </>
  );
};

export default TimeEntry;
