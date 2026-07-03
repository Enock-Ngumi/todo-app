import { useState } from "react";

function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = async () => {
    if (!task.trim()) return;

    await addTodo(task, dueDate, priority);

    setTask("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default TodoForm;