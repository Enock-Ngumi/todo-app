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
    </div>
  );
}

export default TodoItem;