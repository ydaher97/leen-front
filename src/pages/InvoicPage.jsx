import React from "react";
import ItemsList from "../components/ItemList";
import Cart from "../components/Cart";
import Navbar from "../components/Nav";
import { Container, Button, Box } from "@mui/material";

const InvoicePage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box width="100%" mt={2}>
          <h1>invoice</h1>
          <ItemsList />
          <Cart endpint={"invoice"} />
        </Box>
      </Container>
    </>
  );
};

export default InvoicePage;
