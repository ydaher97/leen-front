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
} from "@mui/material";
import { useCustomer } from "../context/CustomerContext";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { selectedCustomer } = useCustomer();
  const { user } = useUser();
  const { cart, setCart, addToCart, removeFromCart } = useCart();
  const [order, setOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        customerId: selectedCustomer?._id,
        items: cart.map((item) => ({
          itemId: item._id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        date: new Date(),
        workerId: user?._id,
      };

      const response = await axios.post(
        "https://leen-back.onrender.com/api/orders",
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
                  <Button onClick={() => addToCart(item)} color="primary">
                    +
                  </Button>
                  <Button onClick={() => removeFromCart(item)} color="primary">
                    -
                  </Button>
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
          <DialogContentText>are you sure</DialogContentText>
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
