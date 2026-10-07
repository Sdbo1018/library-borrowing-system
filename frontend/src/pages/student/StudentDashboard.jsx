import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookApi } from '../../services/bookApi';
import '../styles.css';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // FIX: start as loading (no "No books" flash)
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');

  // Load initial data
  useEffect(() => {
    loadBooks();
    loadStudentInfo();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    const result = await bookApi.getAllBooks();
    if (result.success) {
      setBooks(result.books);
      setFilteredBooks(result.books);
    } else {
      setError('Failed to load books');
    }
    setLoading(false);
  };

  const loadStudentInfo = () => {
    const name = localStorage.getItem('studentName');
    setStudentName(name || 'Student');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(''); // FIX: clear old errors

    if (!searchQuery.trim()) {
      setFilteredBooks(books);
      return;
    }

    // FIX: API contract requires at least 2 characters
    if (searchQuery.trim().length < 2) {
      setError('Please type at least 2 characters to search');
      return;
    }

    setLoading(true);
    const result = await bookApi.searchBooks(searchQuery.trim());
    if (result.success) {
      setFilteredBooks(result.books);
    } else {
      setError('Search failed');
      setFilteredBooks([]);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    setError('');
    setFilteredBooks(books);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentName');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>📚 Student Dashboard</h1>
        <div className="user-info">
          <p>Welcome, <strong>{studentName}</strong></p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Search Section */}
      <div className="search-container">
        <h2>🔍 Search Books</h2>
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by title or author (e.g., Harry Potter)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button type="button" onClick={handleClear} disabled={loading}>
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Books Section */}
      <div className="books-section">
        <h2>📖 Available Books ({filteredBooks.length})</h2>

        {loading && <div className="loading">Loading books...</div>}

        {/* BOOKS_LIST_PLACEHOLDER */}
      </div>

      {/* QUICK_LINKS_PLACEHOLDER */}
    </div>
  );
}