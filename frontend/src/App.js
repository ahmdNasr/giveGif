import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import LoginPage from './components/pages/Login/LoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/pages/Register/RegisterPage';

function App() {
  const [token, setToken] = useState();

  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
