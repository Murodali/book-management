import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import Book, { useBookStore } from "../store/bookStore";

interface IAddBookModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddBookModal = ({ open, handleClose }: IAddBookModalProps) => {
  const { addBook } = useBookStore();

  const [book, setBook] = useState<Book>({
    key: new Date().getTime().toString(),
    title: "",
    description: "",
    authors: [{ key: "", name: "" }],
    availability: {
      status: "",
      available_to_browse: false,
      available_to_borrow: false,
      available_to_waitlist: false,
    },
    cover_edition_key: "",
    cover_id: Math.floor(Math.random() * 1000),
    first_publish_year: 0,
    has_fulltext: false,
    ia: "",
    ia_collection: [],
    lending_edition: "",
    lending_identifier: "",
    printdisabled: false,
    public_scan: false,
    subject: [],
    feedback: [],
    pages: 0,
    edition_count: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    addBook(book);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Author"
          name="author"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Pages"
          name="pages"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookModal;
