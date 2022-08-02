import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { apiBaseUrl } from "../../../api/api";

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

    const handleSubmit = (event) => {
      event.preventDefault();

      if(!email || !username || !password) {
        setErrorMessage("Please fill in all fields.")
        return
      }

      if(password !== confirmPassword) {
        setErrorMessage("Password confirmation doesn't match.")
        return
      }

    fetch(apiBaseUrl + "/users/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username,
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

      setErrorMessage("")
      setSuccessMessage("Your account was created, please login.")
      setEmail("")
      setUsername("")
      setPassword("")
      setConfirmPassword("")
    })
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        id="confirm-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>

      <FeedbackMessage type="error" message={errorMessage} />
      <FeedbackMessage type="success" message={successMessage} />
    </Box>
  );
}

const FeedbackMessage = ({ type = "error", message }) => {
  if(message) {
    return (
      <Box sx={{ padding: 1, backgroundColor: type === "error" ? "crimson" : "green", borderRadius: 1 }}>
        <Typography component="p" variant="body1" color="white">
            {message}
        </Typography>
      </Box>
    )
  } else {
    return <></>
  } 
}
 
export default LoginForm;