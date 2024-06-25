import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useCustomer } from "../context/CustomerContext";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Trash, Pencil } from "lucide-react";
import Navbar from "../components/Nav";

const ReceiptsPage = () => {
  const { user } = useUser();
  const { selectedCustomer } = useCustomer();
  const [receipts, setReceipts] = useState([]);
  const [newReceipt, setNewReceipt] = useState({
    paymentType: "",
    amount: "",
    date: "",
    certification: "",
    bank: "",
    branch: "",
    account: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReceipt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddReceipt = () => {
    if (newReceipt.paymentType && newReceipt.amount) {
      setReceipts((prevReceipts) => [...prevReceipts, newReceipt]);
      setNewReceipt({
        paymentType: "",
        amount: "",
        date: "",
        certification: "",
        bank: "",
        branch: "",
        account: "",
      });
      setDialogOpen(false);
    } else {
      setErrorMessage("Payment Type and Amount are required.");
    }
  };

  const handleEditReceipt = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewReceipt(receipts[index]);
    setDialogOpen(true);
  };

  const handleSaveEditReceipt = () => {
    const updatedReceipts = receipts.map((receipt, index) =>
      index === editIndex ? newReceipt : receipt
    );
    setReceipts(updatedReceipts);
    setNewReceipt({
      paymentType: "",
      amount: "",
      date: "",
      certification: "",
      bank: "",
      branch: "",
      account: "",
    });
    setDialogOpen(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteReceipt = (index) => {
    setReceipts((prevReceipts) => prevReceipts.filter((_, i) => i !== index));
  };

  const handleSaveReceipts = async () => {
    try {
      const { _id: workerId } = user;
      const { _id: customerId } = selectedCustomer;
      await axios.post("https://leen-back.onrender.com/api/receipt/bulk", {
        receipts,
        workerId,
        customerId,
      });
      setSuccessMessage("Receipts saved successfully");
      setErrorMessage("");
      setReceipts([]);
    } catch (error) {
      setErrorMessage("Failed to save receipts");
      setSuccessMessage("");
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewReceipt({
      paymentType: "",
      amount: "",
      date: "",
      certification: "",
      bank: "",
      branch: "",
      account: "",
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box p={2} dir="rtl">
          <h1>עמוד קבלות</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            הוסף קבלה
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>סוג התשלום</TableCell>
                  <TableCell>סכום</TableCell>
                  <TableCell>תאריך</TableCell>
                  <TableCell>אישור</TableCell>
                  <TableCell>בנק</TableCell>
                  <TableCell>סניף</TableCell>
                  <TableCell>חשבון</TableCell>
                  <TableCell>עריכה</TableCell>
                  <TableCell>מחיקה</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipts.map((receipt, index) => (
                  <TableRow key={index}>
                    <TableCell>{receipt.paymentType}</TableCell>
                    <TableCell>{receipt.amount}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.certification}</TableCell>
                    <TableCell>{receipt.bank}</TableCell>
                    <TableCell>{receipt.branch}</TableCell>
                    <TableCell>{receipt.account}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditReceipt(index)}
                      >
                        <Pencil />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteReceipt(index)}
                      >
                        <Trash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveReceipts}
          >
            שמור
          </Button>
        </Box>
        {successMessage && (
          <Snackbar open={!!successMessage} autoHideDuration={6000}>
            <Alert severity="success">{successMessage}</Alert>
          </Snackbar>
        )}
        {errorMessage && (
          <Snackbar open={!!errorMessage} autoHideDuration={6000}>
            <Alert severity="error">{errorMessage}</Alert>
          </Snackbar>
        )}

        {/* Add Receipt Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>הוסף קבלה</DialogTitle>
          <DialogContent>
            <FormControl
              variant="outlined"
              size="small"
              sx={{ mr: 1, mt: 2, minWidth: 120 }}
              dir="rtl"
              locale="he-IL"
              required
            >
              <InputLabel id="payment-type-label">סוג התשלום</InputLabel>
              <Select
                labelId="payment-type-label"
                id="payment-type"
                name="paymentType"
                value={newReceipt.paymentType}
                onChange={handleChange}
                label="סוג התשלום"
              >
                <MenuItem value="">בחר סוג תשלום</MenuItem>
                <MenuItem value="cash">מזומן</MenuItem>
                <MenuItem value="card">כרטיס</MenuItem>
                <MenuItem value="transfer">העברה בנקאית</MenuItem>
                <MenuItem value="check">צ'ק</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="amount"
              label="סכום"
              value={newReceipt.amount}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mt: 2 }}
              dir="rtl"
              locale="he-IL"
              required
              fullWidth
            />
            <TextField
              name="date"
              label="תאריך"
              type="date"
              value={newReceipt.date}
              onChange={handleChange}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ mr: 1, mt: 2 }}
              dir="rtl"
              locale="he-IL"
              fullWidth
              required
            />
            <TextField
              name="certification"
              label="אישור"
              value={newReceipt.certification}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mt: 2 }}
              dir="rtl"
              locale="he-IL"
              fullWidth
            />
            <TextField
              name="bank"
              label="בנק"
              value={newReceipt.bank}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mt: 2 }}
              dir="rtl"
              locale="he-IL"
              fullWidth
            />
            <TextField
              name="branch"
              label="סניף"
              value={newReceipt.branch}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mt: 2 }}
              dir="rtl"
              locale="he-IL"
              fullWidth
            />
            <TextField
              name="account"
              label="חשבון"
              value={newReceipt.account}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1, mt: 2 }}
              dir="rtl"
              locale="he-IL"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              ביטול
            </Button>
            {isEditing ? (
              <Button onClick={handleSaveEditReceipt} color="primary">
                שמור שינויים
              </Button>
            ) : (
              <Button onClick={handleAddReceipt} color="primary">
                הוסף
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default ReceiptsPage;
