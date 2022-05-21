import React, { useEffect, useState } from "react";
import { apiGET } from "../../api";
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
    fetch(`https://api.productive.io/api/v2/time_entries/${timeEntryId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "X-Auth-Token": "98357a64-d0d6-45c5-ae66-d030016ccd58",
        "X-Organization-Id": "20541",
      },
    })
      .then((response) => response.json())
      .then((json) => setUserTimeEntryList(json.data));
  };

  return (
    <div>
      {userTimeEntryList.map((timeEntry, i) => (
        <UserTimeEntryList
          key={i}
          timeEntry={timeEntry}
          handleDeleteTimeEntry={handleDeleteTimeEntry}
        />
      ))}
    </div>
  );
};

export default TimeEntry;
