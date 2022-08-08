import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const DefaultPage = ({ title = "Page", icon, children }) => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "lightgray",
          padding: 3,
          display: "flex",
          gap: 1,
        }}
      >
        <Link to="/home">Home</Link>
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
