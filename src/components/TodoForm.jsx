import { useState } from "react";

function TodoForm({ addTodo }) {
<<<<<<< HEAD
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = async () => {
    if (!task.trim()) return;

    await addTodo(task, dueDate, priority);

    setTask("");
    setDueDate("");
    setPriority("medium");
=======
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await addTodo(title, dueDate || null, priority);

    setTitle("");
    setDueDate("");
    setPriority("Medium");
>>>>>>> 88b6382 (adding features)
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        placeholder="Enter a task..."
<<<<<<< HEAD
        value={task}
        onChange={(e) => setTask(e.target.value)}
=======
        value={title}
        onChange={(e) => setTitle(e.target.value)}
>>>>>>> 88b6382 (adding features)
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
<<<<<<< HEAD
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
=======
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
>>>>>>> 88b6382 (adding features)
      </select>

      <button onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default TodoForm;