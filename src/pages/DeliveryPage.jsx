import React from "react";
import ItemsList from "../components/ItemList";
import Cart from "../components/Cart";
import Navbar from "../components/Nav";
import { Container, Button, Box } from "@mui/material";

const DeliveryPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box width="100%" mt={2}>
          <h1>delivery</h1>
          <ItemsList />
          <Cart endpint={"delivery"} />
        </Box>
      </Container>
    </>
  );
};

export default DeliveryPage;
