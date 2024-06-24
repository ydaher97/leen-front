import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/InvoicePDF";
import Nav from "../components/Nav";
import { useUser } from "../context/UserContext";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    date: "",
    items: [{ description: "", quantity: 1, price: 0 }],
  });
  const { user } = useUser();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "https://leen-back.onrender.com/api/invoices"
        );
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://leen-back.onrender.com/api/customers"
        );
        setCustomers(response.data.customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchInvoices();
    fetchCustomers();
  }, []);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleOpenNewInvoiceModal = () => {
    setNewInvoiceModalOpen(true);
  };

  const handleCloseNewInvoiceModal = () => {
    setNewInvoiceModalOpen(false);
  };

  const handleNewInvoiceChange = (index, field, value) => {
    const items = [...newInvoice.items];
    items[index][field] = value;
    setNewInvoice({ ...newInvoice, items });
  };

  const handleAddNewInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  const handleRemoveNewInvoiceItem = (index) => {
    const items = [...newInvoice.items];
    items.splice(index, 1);
    setNewInvoice({ ...newInvoice, items });
  };

  const handleNewInvoiceSubmit = async () => {
    try {
      const response = await axios.post(
        "https://leen-back.onrender.com/api/invoices",
        { ...newInvoice, worker: user._id }
      );
      setInvoices([...invoices, response.data.invoice]);
      handleCloseNewInvoiceModal();
    } catch (error) {
      console.error("Failed to create invoice:", error);
    }
  };

  return (
    <>
      <Nav />
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="right">
          חשבוניות
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenNewInvoiceModal}
        >
          הוסף חשבונית
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">מספר חשבונית</TableCell>
                <TableCell align="right">לקוח</TableCell>
                <TableCell align="right">תאריך</TableCell>
                <TableCell align="right">צפה</TableCell>
                <TableCell align="right">הורד</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell align="right">{invoice._id}</TableCell>
                  <TableCell align="right">{invoice.customer.name}</TableCell>
                  <TableCell align="right">
                    {new Date(invoice.date).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewInvoice(invoice)}
                    >
                      צפה
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <PDFDownloadLink
                      document={
                        <InvoicePDF
                          invoice={invoice}
                          customer={invoice.customer.name}
                          worker={invoice.worker.name}
                        />
                      }
                      fileName={`invoice_${invoice._id}.pdf`}
                    >
                      {({ loading }) =>
                        loading ? (
                          <Button variant="contained" disabled>
                            טוען PDF...
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary">
                            הורד PDF
                          </Button>
                        )
                      }
                    </PDFDownloadLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle align="right">פרטי חשבונית</DialogTitle>
          <DialogContent>
            {selectedInvoice && (
              <PDFViewer width="100%" height="500">
                <InvoicePDF
                  invoice={selectedInvoice}
                  customer={selectedInvoice.customer.name}
                  worker={selectedInvoice.worker.name}
                />
              </PDFViewer>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              סגור
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={newInvoiceModalOpen}
          onClose={handleCloseNewInvoiceModal}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle align="right">הוסף חשבונית חדשה</DialogTitle>
          <DialogContent>
            <TextField
              select
              label="לקוח"
              value={newInvoice.customer}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, customer: e.target.value })
              }
              fullWidth
              margin="normal"
            >
              {customers.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="תאריך"
              type="datetime-local"
              value={newInvoice.date}
              onChange={(e) =>
                setNewInvoice({ ...newInvoice, date: e.target.value })
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {newInvoice.items.map((item, index) => (
              <Box key={index} display="flex" alignItems="center">
                <TextField
                  label="תיאור"
                  value={item.description}
                  onChange={(e) =>
                    handleNewInvoiceChange(index, "description", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="כמות"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleNewInvoiceChange(index, "quantity", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <TextField
                  label="מחיר"
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleNewInvoiceChange(index, "price", e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveNewInvoiceItem(index)}
                >
                  הסר
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewInvoiceItem}
            >
              הוסף פריט
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewInvoiceModal} color="primary">
              בטל
            </Button>
            <Button onClick={handleNewInvoiceSubmit} color="primary">
              שמור
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default InvoicePage;
