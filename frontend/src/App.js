import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import LoginPage from "./components/pages/Login/LoginPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/pages/Register/RegisterPage";
import HomePage from "./components/pages/Home/HomePage";
import AuthRequired from "./components/common/AuthRequired";
import { createTheme, ThemeProvider } from "@mui/material";
import UserProfilePage from "./components/pages/Profile/UserProfilePage";

function App() {
    const [token, setToken] = useState();

    let theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                light: "hsl(42, 33%, 94%)", //white
                main: "hsl(156, 96%, 37%)", // green
                dark: "hsl(187, 90%, 16%)", // darkGreen
                accent: "hsl(45, 98%, 57%)", // yellow
            },
            custom: {
                light: "hsl(0, 0%, 100%)",
                main: "hsl(0, 0%, 100%)",
                dark: "hsl(0, 0%, 100%)",
            },
        },

        typography: {
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
        },
    });
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Navigate to={token ? "/home" : "/login"} />
                            }
                        />
                        <Route
                            path="/login"
                            element={<LoginPage setToken={setToken} />}
                        />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/home"
                            element={
                                <AuthRequired token={token}>
                                    <HomePage token={token} />
                                </AuthRequired>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <AuthRequired token={token}>
                                    <UserProfilePage token={token} />
                                </AuthRequired>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

// const ProtectedRoute = (props) => {
//   if(!props.token) {
//     return <Navigate to="/login" />;
//   }
//   return <><Route {...props} /></>
// }

export default App;
