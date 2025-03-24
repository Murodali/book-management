import { Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80px",
        backgroundColor: "#3f51b5",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        onClick={() => window.location.reload()}
        sx={{
          "&:hover": {
            transform: "scale(1.05)",
            cursor: "pointer",
          },
        }}
      >
        Books Management
      </Typography>
    </Box>
  );
};

export default Header;
