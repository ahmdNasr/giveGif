import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../../api/api";

const LoginForm = ({ setToken }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()
    const handleSubmit = (event) => {
      event.preventDefault();

      fetch(apiBaseUrl + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
      })
      .then(res => res.json())
      .then(result => {        
        console.log(result)

        if(result.message) {
            return setErrorMessage(result.message)
        }

        setToken(result.accessToken)
        navigate("/")
      })
      
    };
  
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            {errorMessage && <Box sx={{ padding: 1, backgroundColor: "crimson", borderRadius: 1 }}>
                <Typography component="p" variant="body1" color="white">
                    {errorMessage}
                </Typography>
            </Box>}
        </Box>
    );
}
 
export default LoginForm;