function TodoList({ todos }) {
  return (
    <div>
      <h2>My Tasks</h2>

      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default TodoList;