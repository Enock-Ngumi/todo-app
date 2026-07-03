function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <div className="todo-item">


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

      <button onClick={() => onEdit(todo)}>
        Edit
      </button>

      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;