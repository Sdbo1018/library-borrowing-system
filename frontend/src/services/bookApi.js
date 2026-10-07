import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const bookApi = {
  // Get all books
  getAllBooks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        books: [],
        message: 'Failed to fetch books',
      };
    }
  },

  // Search books
  searchBooks: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/search`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        books: [],
        message: 'Search failed',
      };
    }
  },

  // Get single book
  getBook: async (bookId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        book: null,
        message: 'Failed to fetch book',
      };
    }
  },
};