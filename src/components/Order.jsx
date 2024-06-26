import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCustomer } from "../context/CustomerContext";
import { useUser } from "../context/UserContext";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "../pdf/OrderPdf";
import { calculateTotal, calculateBeforeTax } from "../utils/calculations";

const OrderDetails = ({ order }) => {
  const { selectedCustomer } = useCustomer();
  const { user } = useUser();
  const [openPdfViewer, setOpenPdfViewer] = useState(false);

  const handleOpenPdfViewer = () => {
    setOpenPdfViewer(true);
  };

  const handleClosePdfViewer = () => {
    setOpenPdfViewer(false);
  };

  const total = calculateTotal(order.items);
  const beforeTax = calculateBeforeTax(total);

  return (
    <Container sx={{ direction: "rtl" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        פרטי ההזמנה
      </Typography>
      <Typography variant="h6">מספר הזמנה: {order._id}</Typography>
      <Box mt={2}>
        <Typography variant="h6">
          לקוח: {selectedCustomer?.name || "טוען..."}
        </Typography>
        <Typography variant="h6">
          תאריך: {new Date(order.date).toLocaleString()}
        </Typography>
        <Typography variant="h6">עובד: {user?.name || "טוען..."}</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם</TableCell>
              <TableCell align="right">כמות</TableCell>
              <TableCell align="right">מחיר</TableCell>
              <TableCell align="right">סה"כ לפני מס</TableCell>
              <TableCell align="right">סה"כ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">₪{item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  ₪{((item.price * item.quantity) / 1.175).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  ₪{(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <Typography variant="h6">סה"כ לפני מס</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">₪{beforeTax}</Typography>
              </TableCell>
              <TableCell rowSpan={3} />
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h6">סה"כ</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">₪{total}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenPdfViewer}
        >
          צפה ב-PDF
        </Button>
        <PDFDownloadLink
          document={
            <PDFDocument
              order={order}
              customer={selectedCustomer?.name}
              worker={user?.name}
            />
          }
          fileName={`order_${order._id}.pdf`}
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
      </Box>
      <Dialog
        open={openPdfViewer}
        onClose={handleClosePdfViewer}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>צפייה ב-PDF</DialogTitle>
        <DialogContent>
          <PDFViewer width="100%" height="600">
            <PDFDocument
              order={order}
              customer={selectedCustomer?.name}
              worker={user?.name}
            />
          </PDFViewer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePdfViewer} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderDetails;
