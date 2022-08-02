import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "lightgray",
          padding: 3,
          display: "grid",
          gap: 1,
        }}
      >
        <Link to="/home">Feed</Link>
        <Link to="/post">Add Post</Link>
        <Link to="/profile">Profile</Link>
      </Box>
      <Container>
        <Typography component="h1" variant="h5">
          Feed
        </Typography>
      </Container>
    </Box>
  );
};

export default HomePage;
