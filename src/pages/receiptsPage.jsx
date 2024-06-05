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
} from "@mui/material";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReceipt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddReceipt = () => {
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
  };
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveReceipts = async () => {
    try {
      const { _id: workerId } = user;
      const { _id: customerId } = selectedCustomer;
      await axios.post("https://leen-back.onrender.com/api//receipt/bulk", {
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

  return (
    <>
      <Navbar />
      <Container>
        <Box p={2} dir="rtl">
          <h1>עמוד קבלות</h1>
          <Box mb={2}>
            <FormControl
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
              dir="rtl"
              locale="he-IL"
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
              sx={{ mr: 1 }}
              dir="rtl"
              locale="he-IL"
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
              sx={{ mr: 1 }}
              dir="rtl"
              locale="he-IL"
            />
            <TextField
              name="certification"
              label="אישור"
              value={newReceipt.certification}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
              dir="rtl"
              locale="he-IL"
            />
            <TextField
              name="bank"
              label="בנק"
              value={newReceipt.bank}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
              dir="rtl"
              locale="he-IL"
            />
            <TextField
              name="branch"
              label="סניף"
              value={newReceipt.branch}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
              dir="rtl"
              locale="he-IL"
            />
            <TextField
              name="account"
              label="חשבון"
              value={newReceipt.account}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
              dir="rtl"
              locale="he-IL"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddReceipt}
            >
              הוסף קבלה
            </Button>
          </Box>
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
        {/* Error message */}
        {errorMessage && (
          <Snackbar open={!!errorMessage} autoHideDuration={6000}>
            <Alert severity="error">{errorMessage}</Alert>
          </Snackbar>
        )}
      </Container>
    </>
  );
};

export default ReceiptsPage;
