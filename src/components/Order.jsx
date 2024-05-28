import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";

const OrderDetails = ({ order }) => {
  const [customerName, setCustomerName] = useState("");
  const [workerName, setWorkerName] = useState("");

  useEffect(() => {
    const fetchCustomerAndWorkerDetails = async () => {
      try {
        const [customerResponse, workerResponse] = await Promise.all([
          axios.get(
            `https://leen-back.onrender.com/api/users/${order.customerId}`
          ),
          axios.get(
            `https://leen-back.onrender.com/api/workers/${order.workerId}`
          ),
        ]);
        setCustomerName(customerResponse.data.name);
        setWorkerName(workerResponse.data.name);
        console.log(workerResponse.data.name);
      } catch (error) {
        console.error("Failed to fetch customer or worker details:", error);
      }
    };

    fetchCustomerAndWorkerDetails();
  }, [order.customerId, order.workerId]);

  const calculateTotal = (items) => {
    return items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Order Details
      </Typography>
      <Box mt={2}>
        <Typography variant="h6">
          Order Id: {order._id}
        </Typography>
        <Typography variant="h6">Customer: {customerName}</Typography>
        <Typography variant="h6">
          Date: {new Date(order.date).toLocaleString()}
        </Typography>
        <Typography variant="h6">Worker: {workerName}</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">
                  ${calculateTotal(order.items)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderDetails;
