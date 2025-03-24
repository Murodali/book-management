import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
} from "@mui/material";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Header from "./components/Header";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
