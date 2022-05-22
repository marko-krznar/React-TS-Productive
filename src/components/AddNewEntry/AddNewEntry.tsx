import { useState } from "react";
import "./style.scss";

interface Props {
  handleNewTask: (args: taskT) => void;
}

type taskT = {
  note: string;
  time: string | number;
};

const AddNewEntry: React.FC<Props> = ({ handleNewTask }) => {
  const [task, setTask] = useState<taskT>({
    note: "",
    time: "",
  });
  const [active, setActive] = useState<boolean>(false);

  const handleToggleFormNewNote = () => {
    setActive(!active);
  };

  return (
    <div className="block block--add-new-entry d-flex align-items-center flex-wrap">
      <button
        onClick={handleToggleFormNewNote}
        className="d-flex align-items-center"
      >
        <span>Add new note</span>
        <span className="material-symbols-outlined">add</span>
      </button>
      <div className={active ? "is-active" : ""}>
        <input
          type="text"
          placeholder="What did you do"
          value={task.note}
          onChange={(e) =>
            setTask({
              ...task,
              note: e.target.value,
            })
          }
        />
        <input
          type="number"
          placeholder="Insert time"
          value={task.time}
          onChange={(e) =>
            setTask({
              ...task,
              time: parseInt(e.target.value),
            })
          }
        />
        <button
          onClick={() => {
            handleNewTask(task);
            setTask({ note: "", time: "" });
          }}
          className={
            task.note.trim().length < 3 || task.time < 1
              ? "btn is-disabled"
              : "btn"
          }
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddNewEntry;
