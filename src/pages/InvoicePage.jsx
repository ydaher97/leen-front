// src/pages/InvoicePage.js

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
} from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "../pdf/InvoicePDF";
import Nav from "../components/Nav";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

    fetchInvoices();
  }, []);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <>
      <Nav />
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="right">
          חשבוניות
        </Typography>
        <TableContainer component={Paper}>
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
      </Container>
    </>
  );
};

export default InvoicePage;
