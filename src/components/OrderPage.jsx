import ItemsList from "./ItemList";
import Cart from "./Cart";
import Navbar from "./Nav";
import { Container, Box, Typography } from "@mui/material";

const OrderPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box width="100%" mt={2}>
          <Typography variant="h4" component="h2" gutterBottom align="right">
            הזמנות
          </Typography>
          <ItemsList />
          <Cart endpint={"orders"} />
        </Box>
      </Container>
    </>
  );
};

export default OrderPage;
