// src/pages/DocumentsPage.js

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "../pdf/OrderPdf";
import Nav from "../components/Nav";

const DocumentsPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://leen-back.onrender.com/api/orders"
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Nav />
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="right">
          מסמכים
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">מספר הזמנה</TableCell>
                <TableCell align="right">לקוח</TableCell>
                <TableCell align="right">תאריך</TableCell>
                <TableCell align="right">צפה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell align="right">{order._id}</TableCell>
                  <TableCell align="right">{order.customer.name}</TableCell>
                  <TableCell align="right">
                    {new Date(order.date).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewOrder(order)}
                    >
                      צפה
                    </Button>
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
          <DialogTitle align="right">פרטי הזמנה</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <PDFViewer width="100%" height="500">
                <PDFDocument
                  order={selectedOrder}
                  customer={selectedOrder.customer.name}
                  worker={selectedOrder.worker.name}
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

export default DocumentsPage;
