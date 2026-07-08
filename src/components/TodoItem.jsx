<<<<<<< HEAD
function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const priorityColors = {
    low: "#8bc34a",
    medium: "#ffc107",
    high: "#f44336",
  };

  const isOverdue =
    todo.dueDate &&
    !todo.isCompleted &&
    new Date(todo.dueDate) < new Date();

  return (
    <div className={`todo-item ${isOverdue ? "overdue" : ""}`}>

      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo)}
      />

      <span
        className={todo.isCompleted ? "completed" : ""}
      >
        {todo.title}
      </span>

      {todo.priority && (
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[todo.priority] }}
        >
          {todo.priority}
        </span>
      )}

      {todo.dueDate && (
        <span className="due-date">
          {isOverdue ? " Overdue: " : "Due: "}
          {new Date(todo.dueDate).toLocaleDateString()}
        </span>
      )}

      <button
        onClick={() => {
          console.log(todo);
          onEdit(todo);
        }}
      >
        Edit
      </button>

      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
=======
import "./TodoItem.css";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const {
    id,
    title,
    isCompleted,
    dueDate,
    priority,
    createdBy,
    createdDate,
  } = todo;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id);
    }
  };

  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString()
    : "No due date";

  const formattedCreatedDate = createdDate
    ? new Date(createdDate).toLocaleString()
    : "N/A";

  return (
    <div className={`todo-item ${isCompleted ? "completed" : ""}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(todo)}
        />

        <div className="todo-details">
          <h4>{title}</h4>

          <p>
            <strong>Due Date:</strong> {formattedDueDate}
          </p>

          <p>
            <strong>Created By:</strong> {createdBy || "Unknown"}
          </p>

          <p>
            <strong>Created On:</strong> {formattedCreatedDate}
          </p>
        </div>
      </div>

      <div className="todo-right">
        <span className={`priority ${priority?.toLowerCase()}`}>
          {priority}
        </span>

        <button
          className="edit-btn"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
>>>>>>> 88b6382 (adding features)
    </div>
  );
}

export default TodoItem;