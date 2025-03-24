import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import Book from "../store/bookStore";

interface IBookCardProps {
  book: Book;
  onEdit: () => void;
  onDetails: () => void;
  onDelete: () => void;
}

const BookCard = ({ book, onEdit, onDetails, onDelete }: IBookCardProps) => {
  return (
    <Card
      onClick={onDetails}
      sx={{
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 3,
          cursor: "pointer",
        },
      }}
    >
      <CardContent>
        <Box display={"flex"} justifyContent={"center"}>
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
            alt={book.title}
          />
        </Box>
        <Typography variant="h5">{book.title}</Typography>
        <Typography>{book.authors.map((itm) => itm.name)}</Typography>
        <Box display={"flex"} gap={2}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            fullWidth
            variant="contained"
          >
            Edit
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            fullWidth
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
