function Header() {
  return (
    <header className="header">
<<<<<<< HEAD
      <h1> Task Manager</h1>

      <p>
        Organize your work. Track your progress.
      </p>
    </header>
  );

  <div className="search-box">
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
=======
      <h1> My Todo App</h1>
      <p>Stay organized, stay productive</p>
    </header>
  );
>>>>>>> 88b6382 (adding features)
}

export default Header;