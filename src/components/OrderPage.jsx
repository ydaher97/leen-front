import ItemsList from "./ItemList";
import Cart from "./Cart";
import Navbar from "./Nav";
import { Container, Box } from "@mui/material";

const OrderPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box width="100%" mt={2}>
          <ItemsList />
          <Cart endpint={"orders"} />
        </Box>
      </Container>
    </>
  );
};

export default OrderPage;
