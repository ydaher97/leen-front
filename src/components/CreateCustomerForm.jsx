import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Plus } from "lucide-react";

const CreateCustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        "https://leen-back.onrender.com/api/users",
        {
          name,
          email,
          password,
        }
      );
      setMessage(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "נכשל ביצירת לקוח");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        startIcon={<Plus />}
      >
        צור לקוח
      </Button>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>אישור</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 400, mx: "auto", mt: 2 }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              צור לקוח חדש
            </Typography>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="שם"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="אימייל"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="סיסמה"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>ביטול</Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
            אשר
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCustomerForm;
