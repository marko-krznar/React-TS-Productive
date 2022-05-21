import { useState } from "react";

interface Props {
  handleNewTask: (args: taskT) => void;
}

type taskT = {
  note: string;
  time: number;
};

const AddNewEntry: React.FC<Props> = ({ handleNewTask }) => {
  const [task, setTask] = useState<taskT>({
    note: "",
    time: 0,
  });

  return (
    <div>
      <p>Add new note</p>
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
      <button onClick={() => handleNewTask(task)}>Add</button>
    </div>
  );
};

export default AddNewEntry;
