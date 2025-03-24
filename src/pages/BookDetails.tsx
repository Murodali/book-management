import { useEffect, useState } from "react";
import Book, { useBookStore } from "../store/bookStore";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { books, addFeedback, fetchBooks, isLoading } = useBookStore();
  const [book, setBook] = useState<Book | null>(null);

  const [name, setName] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    if (id) {
      const foundBook = books.find((b) => b.cover_id === parseInt(id));
      if (foundBook) {
        setBook(foundBook);
      }
    }
  }, [id, books]);

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmitFeedback = () => {
    if (book && name && feedback) {
      addFeedback(book.cover_id, { name, feedback });
      setName("");
      setFeedback("");
      alert("Feedback added successfully!");
    } else {
      alert("Please provide both name and feedback.");
    }
  };

  useEffect(() => {
    if (books.length == 0) {
      fetchBooks();
    }
  }, [books]);

  return (
    <Box sx={{ padding: "20px" }}>
      <Button onClick={handleBack} sx={{ marginTop: "20px" }}>
        Back to List
      </Button>
      {isLoading ? (
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display={"flex"}
          gap={4}
          alignItems={"flex-start"}
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <img
            src={`https://covers.openlibrary.org/b/id/${book?.cover_id}-L.jpg`}
            alt={book?.title}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {book?.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Author: {book?.authors[0].name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Description: {book?.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Pages: {book?.pages}
            </Typography>

            {book?.feedback && book.feedback.length > 0 && (
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Feedback:
                </Typography>
                {book.feedback.map((feedbackItem, index) => (
                  <Box key={index} sx={{ marginBottom: 2 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {feedbackItem.name}:
                    </Typography>
                    <Typography variant="body2">
                      {feedbackItem.feedback}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6" gutterBottom>
                Provide Feedback:
              </Typography>

              <TextField
                label="Your Name"
                variant="outlined"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
              />

              <TextareaAutosize
                minRows={4}
                placeholder="Your Feedback"
                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={handleSubmitFeedback}
              >
                Submit Feedback
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BookDetails;
