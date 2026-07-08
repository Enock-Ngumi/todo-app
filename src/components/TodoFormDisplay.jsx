<<<<<<< HEAD
function TodoList({ todos }) {
  return (
    <div>
      <h2>My Tasks</h2>

      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
=======
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  onDelete,
  onToggle,
  onEdit,
}) {
  // Display a message when there are no tasks
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h2>My Tasks</h2>
        <p>No tasks available.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>My Tasks ({todos.length})</h2>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
>>>>>>> 88b6382 (adding features)
      ))}
    </div>
  );
}

export default TodoList;