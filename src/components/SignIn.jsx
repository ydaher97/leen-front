import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signIn } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://leen-back.onrender.com/api/signin",
        {
          name,
          password,
        }
      );
      signIn(response.data?.worker);
      setError(null);
      navigate("/dashboard");
    } catch (error) {
      setMessage(null);
      setError(error.response?.data?.message || "ההתחברות נכשלה");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 2, direction: "rtl" }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        התחברות
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="שם"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="סיסמא"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        התחבר
      </Button>
    </Box>
  );
};

export default SignIn;
