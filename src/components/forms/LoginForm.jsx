import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { userService, setCurrentUser } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email ?? "" == "") {
      setEmailError(true);
    }

    if (password ?? "" == "") {
      setPasswordError(true);
    }

    try {
      const user = await userService.logIn({ email, password });
      setCurrentUser(user);

      if (user.role === "user") {
        navigate("/bikes");
      }

      if (user.role === "manager") {
        navigate("/manager");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form autoComplete="on" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <TextField
          label="Email"
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />
        <TextField
          label="Password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          color="secondary"
          type="password"
          value={password}
          error={passwordError}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Login
        </Button>
        <small>
          Need an account? <Link to="/register">Register here</Link>
        </small>
        {error && (
          <Alert sx={{ mt: 3 }} severity="error">
            {error}
          </Alert>
        )}
        {userService.currentUser && (
          <Alert sx={{ mt: 3 }} severity="success">
            User logged in successfully
          </Alert>
        )}
      </form>
    </>
  );
};

export default LoginForm;
