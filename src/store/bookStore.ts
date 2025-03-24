import { create } from "zustand";

interface BookAuthor {
  key: string;
  name: string;
}

interface BookAvailability {
  status: string;
  available_to_browse: boolean;
  available_to_borrow: boolean;
  available_to_waitlist: boolean;
}

interface Feedback {
  name: string;
  feedback: string;
}

export interface Book {
  key: string;
  title: string;
  edition_count: number;
  authors: BookAuthor[];
  availability: BookAvailability;
  cover_edition_key: string;
  cover_id: number;
  first_publish_year: number;
  has_fulltext: boolean;
  ia: string;
  ia_collection: string[];
  lending_edition: string;
  lending_identifier: string;
  printdisabled: boolean;
  public_scan: boolean;
  subject: string[];
  feedback: Feedback[];
  description: string;
  pages: number;
}

export default Book;

interface BookStore {
  books: Book[];
  isLoading: boolean; // Add the loading state here
  fetchBooks: () => void;
  addBook: (newBook: Book) => void;
  updateBook: (updatedBook: Book) => void;
  deleteBook: (bookKey: number) => void;
  addFeedback: (bookKey: number, feedback: Feedback) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  isLoading: false,

  fetchBooks: async () => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "https://openlibrary.org/subjects/science.json?limit=21"
      );
      const data = await response.json();

      const booksWithFeedback = data.works.map((book: any) => ({
        ...book,
        feedback: [],
      }));

      set({ books: booksWithFeedback, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch books:", error);
      set({ isLoading: false }); // Set loading state to false in case of error
    }
  },

  addBook: (newBook) => {
    set((state) => ({
      books: [{ ...newBook, feedback: [] }, ...state.books],
    }));
  },

  updateBook: (updatedBook) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.cover_id === updatedBook.cover_id
          ? { ...book, ...updatedBook }
          : book
      ),
    }));
  },

  deleteBook: (bookKey) => {
    set((state) => ({
      books: state.books.filter((book) => book.cover_id !== bookKey),
    }));
  },

  addFeedback: (bookKey: number, feedback: Feedback) => {
    set((state) => ({
      books: state.books.map((book) =>
        book.cover_id === bookKey
          ? { ...book, feedback: [...book.feedback, feedback] }
          : book
      ),
    }));
  },
}));
