import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import Book, { useBookStore } from "../store/bookStore";

interface IEditBookModalProps {
  open: boolean;
  handleClose: () => void;
  selectedBook: Book;
}

const EditBookModal = ({
  open,
  handleClose,
  selectedBook,
}: IEditBookModalProps) => {
  const { updateBook } = useBookStore();
  const [book, setBook] = useState<Book>(selectedBook);

  useEffect(() => {
    if (open) {
      setBook(selectedBook);
    }
  }, [open, selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "author") {
      setBook({
        ...book,
        authors: [
          { ...book.authors[0], name: value },
          ...book.authors.slice(1),
        ],
      });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (
      book.title &&
      book.authors[0]?.name &&
      book.description !== undefined &&
      book.pages !== undefined
    ) {
      updateBook(book);
      handleClose();
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={book?.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={book?.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              name="author"
              value={book?.authors[0]?.name || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pages"
              name="pages"
              type="number"
              value={book?.pages}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookModal;
