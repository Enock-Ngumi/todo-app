<<<<<<< HEAD
import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import API from "./api/todoApi";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await API.get("/todo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setErrorMessage("Couldn't load your tasks. Please refresh.");
    }
  };

  // --- ADD (optimistic) ---
  const addTodo = async (title, dueDate, priority) => {
    const tempId = `temp-${Date.now()}`;

    const optimisticTodo = {
      id: tempId,
      title,
      isCompleted: false,
      dueDate: dueDate || null,
      priority: priority || "medium",
    };

    // 1. Show it instantly
    setTodos((prev) => [...prev, optimisticTodo]);

    try {
      const todo = {
        title,
        isCompleted: false,
        dueDate: dueDate || null,
        priority: priority || "medium",
      };

      const response = await API.post("/todo", todo);

      // 2. Swap the fake temp todo for the real one (with the real DB id)
      setTodos((prev) =>
        prev.map((t) => (t.id === tempId ? response.data : t))
      );
    } catch (error) {
      console.error("Error adding todo:", error);
      setErrorMessage("Failed to add task. Please try again.");

      // 3. Roll back — remove the fake todo since it never actually saved
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
    }
  };

  // --- EDIT (optimistic) ---
  const editTodo = async (updatedTodo) => {
    const previousTodos = todos;

    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
    setEditingTodo(null);

    try {
      await API.put(`/todo/${updatedTodo.id}`, updatedTodo);
    } catch (error) {
      console.error("Error editing todo:", error);
      setErrorMessage("Failed to save changes. Please try again.");
      setTodos(previousTodos); // roll back
    }
  };

  // --- DELETE (optimistic) ---
  const deleteTodo = async (id) => {
    const previousTodos = todos;

    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await API.delete(`/todo/${id}`);
    } catch (error) {
      console.error("Error deleting todo:", error);
      setErrorMessage("Failed to delete task. Please try again.");
      setTodos(previousTodos); // roll back
    }
  };

  // --- TOGGLE (optimistic) ---
  const toggleTodo = async (todo) => {
    const previousTodos = todos;
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? updatedTodo : t))
    );

    try {
      await API.put(`/todo/${todo.id}`, updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      setErrorMessage("Failed to update task. Please try again.");
      setTodos(previousTodos); // roll back
    }
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const filteredTodos = todos
    .filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "active"
            ? !todo.isCompleted
            : todo.isCompleted;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  const remainingTasks = todos.filter(
    (todo) => !todo.isCompleted
  ).length;

  return (
    <div className="container">
      <Header />

      {errorMessage && (
        <div className="error-banner">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>✕</button>
        </div>
      )}

      <TodoForm addTodo={addTodo} />

      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort */}
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Default order</option>
        <option value="priority">Sort by Priority</option>
        <option value="dueDate">Sort by Due Date</option>
      </select>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      {/* Edit Todo */}
      {editingTodo && (
        <div className="edit-box">
          <input
            type="text"
            value={editingTodo.title}
            onChange={(e) =>
              setEditingTodo({
                ...editingTodo,
                title: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={editingTodo.dueDate || ""}
            onChange={(e) =>
              setEditingTodo({
                ...editingTodo,
                dueDate: e.target.value,
              })
            }
          />

          <select
            value={editingTodo.priority || "medium"}
            onChange={(e) =>
              setEditingTodo({
                ...editingTodo,
                priority: e.target.value,
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button onClick={() => editTodo(editingTodo)}>
            Save
          </button>

          <button onClick={() => setEditingTodo(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* Todo List */}
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={setEditingTodo}
      />

      <h3 className="tasks-left">
        Tasks Remaining: {remainingTasks}
      </h3>
    </div>
=======
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} />}
      />

      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/register"
        element={token ? <Navigate to="/dashboard" /> : <Register />}
      />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
>>>>>>> 88b6382 (adding features)
  );
}

export default App;