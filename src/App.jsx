import React, { useState } from "react";
import { Container, Button, Box } from "@mui/material";
import CreateCustomerForm from "./components/CreateCustomerForm";
import ItemsList from "./components/ItemList";
import { CartProvider } from "../src/context/cartContext";
import Cart from "./components/Cart";
import CreateWorkerForm from "./components/createWorkerForm";
import CreateItemForm from "./components/createItemForm";
import CustomersList from "./components/CustomerList";
import WorkersList from "./components/WorkerList";

function App() {
  const [show, setShow] = useState(false);

  const handleOnclick = () => {
    setShow(!show);
  };

  return (
    <CartProvider>
      <Container width="100%" maxWidth={false} disableGutters>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <Button variant="contained" color="primary" onClick={handleOnclick}>
            {show ? "View Items & Cart" : "Create"}
          </Button>
          {show ? (
            <Box width="100%" mt={2}>
              <CreateCustomerForm />
              <CreateWorkerForm />
              <CreateItemForm />
              <CustomersList />
              <WorkersList />
            </Box>
          ) : (
            <Box width="100%" mt={2}>
              <ItemsList />
              <Cart />
            </Box>
          )}
        </Box>
      </Container>
    </CartProvider>
  );
}

export default App;
