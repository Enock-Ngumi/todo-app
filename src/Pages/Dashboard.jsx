import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/todoApi";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await API.get("/todo");
      setTodos(response.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        logout();
        navigate("/login");
      }
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await API.post("/todo", {
        title,
        dueDate: dueDate || null,
        priority,
        isCompleted: false,
      });

      setTitle("");
      setDueDate("");
      setPriority("medium");

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await API.put(`/todo/${todo.id}`, {
        title: todo.title,
        dueDate: todo.dueDate,
        priority: todo.priority,
        isCompleted: !todo.isCompleted,
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await API.delete(`/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = async (todo) => {
    const newTitle = prompt("Edit task title", todo.title);
    if (newTitle === null) return;

    const newDueDate = prompt(
      "Edit due date (YYYY-MM-DD)",
      todo.dueDate ? todo.dueDate.split("T")[0] : ""
    );
    if (newDueDate === null) return;

    const newPriority = prompt(
      "Priority (low, medium, high)",
      todo.priority
    );
    if (newPriority === null) return;

    try {
      await API.put(`/todo/${todo.id}`, {
        title: newTitle.trim(),
        dueDate: newDueDate || null,
        priority: newPriority.toLowerCase(),
        isCompleted: todo.isCompleted,
      });

      fetchTodos();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Todo Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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

        <button type="submit">Add Todo</button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div>
                <h3
                >
                  {todo.title}
                </h3>

                <p>Priority: {todo.priority}</p>

                {todo.dueDate && (
                  <p>
                    Due:{" "}
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="todo-actions">
                <button
                  type="button"
                  onClick={() => toggleComplete(todo)}
                >
                  {todo.isCompleted
                    ? "Mark Pending"
                    : "Mark Complete"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => editTodo(todo)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;