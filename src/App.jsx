import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState({
    note: "",
    time: 0,
  });

  useEffect(() => {
    fetch(
      "https://api.productive.io/api/v2/time_entries?person_id=271501&after&before",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-Auth-Token": "98357a64-d0d6-45c5-ae66-d030016ccd58",
          "X-Organization-Id": "20541",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    fetch("https://api.productive.io/api/v2/time_entries", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/vnd.api+json",
        "X-Auth-Token": "98357a64-d0d6-45c5-ae66-d030016ccd58",
        "X-Organization-Id": "20541",
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json.data));
    setTask({
      note: "",
      time: "",
    });
  };

  const handleDeleteTask = (todo) => {
    fetch(`https://api.productive.io/api/v2/time_entries/${todo.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "X-Auth-Token": "98357a64-d0d6-45c5-ae66-d030016ccd58",
        "X-Organization-Id": "20541",
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json.data));
  };

  return (
    <>
      <h1>Productive</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What did you do"
          value={task.note}
          onChange={(e) =>
            setTask((prev) => ({
              ...prev,
              note: e.target.value,
            }))
          }
        />
        <input
          type="number"
          placeholder="Insert time"
          value={task.time}
          onChange={(e) =>
            setTask((prev) => ({
              ...prev,
              time: e.target.value,
            }))
          }
        />
        <button type="submit">Add</button>
      </form>
      <h2>Tasks</h2>
      {Array.isArray(data) &&
        data?.map((todo) => {
          return (
            <p key={todo.id}>
              {todo.attributes.note}{" "}
              <button onClick={() => handleDeleteTask(todo)}>x</button>
            </p>
          );
        })}
    </>
  );
}

export default App;
