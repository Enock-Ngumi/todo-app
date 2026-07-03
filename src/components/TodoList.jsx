import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle, onEdit }) {
  if (todos.length === 0) {
    return <p>No tasks yet. Add your first task!</p>;
  }

  return (
    <div>
      <h2>My Tasks</h2>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;