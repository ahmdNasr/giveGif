import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterForm from "./RegisterForm";
import Copyright from "../../common/Copyright";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function RegisterPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a GiveGIF Account
          </Typography>

          <RegisterForm />

          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/login">{"Already have an account? Login"}</Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
