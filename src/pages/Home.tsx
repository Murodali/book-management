import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBookModal";
import Book, { useBookStore } from "../store/bookStore";
import EditBookModal from "../components/EditBookModal";

const Home = () => {
  const navigate = useNavigate();

  const [openAdd, setOpenAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book>({
    key: "",
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
  const { fetchBooks, books, deleteBook, isLoading } = useBookStore();
  const [openEdit, setOpenEdit] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value as string);
  };

  const getFilteredAndSortedBooks = () => {
    let filteredBooks = books?.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some((author) =>
          author.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (sortBy === "title") {
      filteredBooks?.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "author") {
      filteredBooks?.sort((a, b) =>
        a.authors[0].name.localeCompare(b.authors[0].name)
      );
    }

    return filteredBooks;
  };

  const filteredAndSortedBooks = getFilteredAndSortedBooks();

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    if (books.length == 0) {
      fetchBooks();
    }
  }, [fetchBooks, books]);

  return (
    <Box display="flex" flexDirection="column" gap={4} marginTop={4}>
      {isLoading ? (
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress />{" "}
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              width="100%"
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
              }}
            >
              <TextField
                label="Search Books"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                InputProps={{
                  style: { minWidth: 300 },
                }}
                sx={{
                  width: { xs: "100%", sm: "80%", lg: "70%", md: "100%" },
                }}
              />

              <FormControl
                fullWidth
                size="medium"
                sx={{
                  width: { xs: "100%", sm: "20%", lg: "20%", md: "10%" },
                }}
              >
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="author">Author</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              onClick={() => setOpenAdd(true)}
              sx={{ width: { xs: "100%", sm: "20%" } }}
            >
              Add Book
            </Button>
          </Box>

          <Grid container spacing={2}>
            {filteredAndSortedBooks?.length > 0 ? (
              filteredAndSortedBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.cover_id}>
                  <BookCard
                    book={book}
                    onEdit={() => handleEdit(book)}
                    onDetails={() => navigate(`/book/${book.cover_id}`)}
                    onDelete={() => deleteBook(book.cover_id)}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <p>No books found</p>
              </Grid>
            )}
          </Grid>
        </>
      )}

      <AddBookModal open={openAdd} handleClose={() => setOpenAdd(false)} />
      <EditBookModal
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        selectedBook={selectedBook}
      />
    </Box>
  );
};

export default Home;
