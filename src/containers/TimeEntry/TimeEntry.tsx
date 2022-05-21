import React, { useEffect, useState } from "react";
import { apiDELETE, apiGET } from "../../api";
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
    apiDELETE(
      `https://api.productive.io/api/v2/time_entries/${timeEntryId}`
    ).then((res) => setUserTimeEntryList(res.data));
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
