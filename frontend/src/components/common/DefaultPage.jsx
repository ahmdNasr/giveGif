import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const DefaultPage = ({ title = "Page", icon, children }) => {
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
        <Link to="/home">Home</Link>
        <Link to="/give">Give GIF</Link>
        <Link to="/profile">Profile</Link>
      </Box>
      <Container>
        <Typography component="h1" variant="h5">
          {icon} {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
};

export default DefaultPage;
