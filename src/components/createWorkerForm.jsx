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

const CreateWorkerForm = () => {
  const [name, setName] = useState("");
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
        "https://leen-back.onrender.com/api/workers",
        {
          name,
        }
      );
      setMessage(response.data.message);
      setName("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create customer");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Create worker
      </Button>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 400, mx: "auto", mt: 2 }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Create New worker
            </Typography>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateWorkerForm;
