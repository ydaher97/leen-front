import React, { useEffect } from "react";
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
import { useCustomer } from "../context/CustomerContext";
import { useUser } from "../context/UserContext";

const OrderDetails = ({ order }) => {
  const { selectedCustomer, setSelectedCustomer } = useCustomer();
  const { user, setUser } = useUser();

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
          Customer: {selectedCustomer?.name || "Loading..."}
        </Typography>
        <Typography variant="h6">
          Date: {new Date(order.date).toLocaleString()}
        </Typography>
        <Typography variant="h6">
          Worker: {user?.name || "Loading..."}
        </Typography>
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
