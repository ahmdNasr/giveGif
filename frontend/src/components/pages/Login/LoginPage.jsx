import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginForm from "./LoginForm";
import Copyright from "../../common/Copyright";
import { Link } from "react-router-dom";

export default function LoginPage(props) {
    return (
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <LoginForm
                    setToken={props.setToken}
                    errorMessage={props.errorMessage}
                    setErrorMessage={props.setErrorMessage}
                />

                <Grid container>
                    <Grid item xs>
                        <Link to="#">Forgot password?</Link>
                    </Grid>
                    <Grid item>
                        <Link to="/register">Create an Account</Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
