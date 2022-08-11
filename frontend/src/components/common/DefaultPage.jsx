import { Box, Typography, Container, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const DefaultPage = ({ title = "Page", icon, children, offTheLine }) => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Box
                sx={{
                    bgcolor: "primary.light",
                    padding: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 5,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    boxShadow: "0 0px  15px hsla(45, 0%, 57%, 0.5)",
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            fontSize: "3rem",
                            color: "primary.main",
                        }}
                    >
                        give
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            fontSize: "3rem",
                            color: "primary.accent",
                        }}
                    >
                        Gif
                    </Typography>
                </Box>
                {offTheLine && (
                    <Button variant="text" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                )}
                {!offTheLine && (
                    <div>
                        <Avatar
                            sx={{ bgcolor: "primary.dark" }}
                            aria-label="R"
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            R
                        </Avatar>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>
                                My account
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Box>
            <Container
                sx={{
                    bgcolor: "primary",
                    padding: 3,
                    display: "grid",
                    placeItems: "center",
                    gap: 1,
                    mb: 10,
                    mt: 15,
                }}
            >
                {children}
            </Container>
            <Box
                sx={{
                    bgcolor: "primary.light",
                    padding: 3,
                    display: "flex",
                    gap: 1,
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    boxShadow: "0 0px  15px hsla(45, 0%, 57%, 0.5)",
                }}
            >
                <BottomNavigation
                    sx={{
                        bgcolor: "primary.light",
                        margin: "0 auto",
                        width: "100%",
                        display: "flex",
                        gap: 1,
                    }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        onClick={() => navigate("/home")}
                        label="Home"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        onClick={() => navigate("/profile")}
                        label="Profile"
                        icon={<AccountCircleIcon />}
                    />
                </BottomNavigation>
            </Box>
        </Box>
    );
};

export default DefaultPage;
