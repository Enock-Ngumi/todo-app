function Header() {
  return (
    <header className="header">
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
}

export default Header;