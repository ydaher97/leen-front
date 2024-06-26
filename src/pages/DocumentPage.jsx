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
import ReceiptPdf from "../pdf/ReceiptPdf";
import Nav from "../components/Nav";
import { useCustomer } from "../context/CustomerContext";
import { useUser } from "../context/UserContext";

const DocumentsPage = () => {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { selectedCustomer } = useCustomer();
  const { user } = useUser();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const ordersResponse = await axios.get(
          `https://leen-back.onrender.com/api/orders/customer/${selectedCustomer._id}`
        );
        setOrders(ordersResponse.data.orders || []);

        const invoicesResponse = await axios.get(
          `https://leen-back.onrender.com/api/invoice/customer/${selectedCustomer._id}`
        );
        setInvoices(invoicesResponse.data.orders || []);

        const deliveriesResponse = await axios.get(
          `https://leen-back.onrender.com/api/delivery/customer/${selectedCustomer._id}`
        );
        setDeliveries(deliveriesResponse.data.orders || []);

        const receiptsResponse = await axios.get(
          `https://leen-back.onrender.com/api/receipt/${selectedCustomer._id}`
        );
        setReceipts(receiptsResponse.data || []);
        console.log(receiptsResponse.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setOrders([]);
        setInvoices([]);
        setDeliveries([]);
        setReceipts([]);
      }
    };

    if (selectedCustomer?._id) {
      fetchDocuments();
    }
  }, [selectedCustomer._id]);

  const handleViewDocument = (document, type) => {
    setSelectedDocument(document);
    setDocumentType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <Nav />
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="right">
          מסמכים
        </Typography>

        {/* Orders Table */}
        <Typography variant="h5" component="h3" gutterBottom align="right">
          הזמנות
        </Typography>
        {orders.length === 0 ? (
          <Typography variant="body1" align="right">
            אין הזמנות זמינות.
          </Typography>
        ) : (
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
                    <TableCell align="right">{selectedCustomer.name}</TableCell>
                    <TableCell align="right">
                      {new Date(order.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDocument(order, "order")}
                      >
                        צפה
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Invoices Table */}
        <Typography variant="h5" component="h3" gutterBottom align="right">
          חשבוניות
        </Typography>
        {invoices.length === 0 ? (
          <Typography variant="body1" align="right">
            אין חשבוניות זמינות.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">מספר חשבונית</TableCell>
                  <TableCell align="right">לקוח</TableCell>
                  <TableCell align="right">תאריך</TableCell>
                  <TableCell align="right">צפה</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice._id}>
                    <TableCell align="right">{invoice._id}</TableCell>
                    <TableCell align="right">{selectedCustomer.name}</TableCell>
                    <TableCell align="right">
                      {new Date(invoice.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDocument(invoice, "invoice")}
                      >
                        צפה
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Deliveries Table */}
        <Typography variant="h5" component="h3" gutterBottom align="right">
          תעודות משלוח
        </Typography>
        {deliveries.length === 0 ? (
          <Typography variant="body1" align="right">
            אין תעודות משלוח זמינות.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">מספר משלוח</TableCell>
                  <TableCell align="right">לקוח</TableCell>
                  <TableCell align="right">תאריך</TableCell>
                  <TableCell align="right">צפה</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery._id}>
                    <TableCell align="right">{delivery._id}</TableCell>
                    <TableCell align="right">{selectedCustomer.name}</TableCell>
                    <TableCell align="right">
                      {new Date(delivery.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDocument(delivery, "delivery")}
                      >
                        צפה
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Receipts Table */}
        <Typography variant="h5" component="h3" gutterBottom align="right">
          קבלות
        </Typography>
        {receipts.length === 0 ? (
          <Typography variant="body1" align="right">
            אין קבלות זמינות.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">מספר קבלה</TableCell>
                  <TableCell align="right">לקוח</TableCell>
                  <TableCell align="right">תאריך</TableCell>
                  <TableCell align="right">סוג תשלום</TableCell>
                  <TableCell align="right">סכום</TableCell>
                  <TableCell align="right">בנק</TableCell>
                  <TableCell align="right">צפה</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipts.map((receipt) => (
                  <TableRow key={receipt._id}>
                    <TableCell align="right">{receipt._id}</TableCell>
                    <TableCell align="right">{selectedCustomer.name}</TableCell>
                    <TableCell align="right">
                      {new Date(receipt.date).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{receipt.paymentType}</TableCell>
                    <TableCell align="right">{receipt.amount}</TableCell>
                    <TableCell align="right">{receipt.bank}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDocument(receipt, "receipt")}
                      >
                        צפה
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal */}
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle align="right">פרטי מסמך</DialogTitle>
          <DialogContent>
            {selectedDocument && (
              <PDFViewer width="100%" height="500">
                {documentType === "order" ? (
                  <PDFDocument
                    order={selectedDocument}
                    customer={selectedCustomer.name}
                    worker={user.name}
                  />
                ) : (
                  <ReceiptPdf
                    receipt={selectedDocument}
                    customer={selectedCustomer.name}
                    worker={user.name}
                  />
                )}
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
