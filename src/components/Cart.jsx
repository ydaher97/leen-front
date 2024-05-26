import { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import axios from "axios";
import OrderDetails from "./Order";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [order, setOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [workerId, setWorkerId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [workers, setWorkers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/workers");
        setWorkers(response.data);
      } catch (error) {
        console.error("Failed to fetch workers:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchWorkers();
    fetchCustomers();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        customerId,
        items: cart.map((item) => ({
          itemId: item._id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        date: new Date(),
        workerId,
      };

      const response = await axios.post(
        "http://localhost:8080/api/orders",
        orderData
      );
      setOrder(response.data.orderDetails);
      setCart([]);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  if (order) {
    return <OrderDetails order={order} />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">No items in cart.</Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <div key={item._id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Price: ${item.price}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Quantity: {item.quantity}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
      {cart.length > 0 && (
        <Box my={2}>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Place Order
          </Button>
        </Box>
      )}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the Worker and Customer to place the order.
          </DialogContentText>
          <FormControl fullWidth margin="normal">
            <InputLabel>Worker</InputLabel>
            <Select
              value={workerId}
              onChange={(e) => setWorkerId(e.target.value)}
              label="Worker"
            >
              {workers.map((worker) => (
                <MenuItem key={worker._id} value={worker._id}>
                  {worker.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Customer</InputLabel>
            <Select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              label="Customer"
            >
              {customers.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePlaceOrder} color="primary">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
