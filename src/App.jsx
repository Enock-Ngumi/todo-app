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

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await API.get("/todo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (title) => {
    try {
      const todo = {
        title,
        isCompleted: false,
      };

      await API.post("/todo", todo);
      getTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const editTodo = async (updatedTodo) => {
    try {
      await API.put(`/todo/${updatedTodo.id}`, updatedTodo);
      setEditingTodo(null);
      getTodos();
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todo/${id}`);
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const updatedTodo = {
        ...todo,
        isCompleted: !todo.isCompleted,
      };

      await API.put(`/todo/${todo.id}`, updatedTodo);
      getTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
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
  });

  const remainingTasks = todos.filter(
    (todo) => !todo.isCompleted
  ).length;

  return (
    <div className="container">
      <Header />

      <TodoForm addTodo={addTodo} />

      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filters">
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("active")}>
          Active
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

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
  );
}

export default App;