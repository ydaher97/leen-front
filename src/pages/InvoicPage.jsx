import ItemsList from "../components/ItemList";
import Cart from "../components/Cart";
import Navbar from "../components/Nav";
import { Container, Typography, Box } from "@mui/material";

const InvoicePage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box width="100%" mt={2}>
          <Typography variant="h4" component="h2" gutterBottom align="right">
            חשבוניות
          </Typography>
          <ItemsList />
          <Cart endpint={"invoice"} />
        </Box>
      </Container>
    </>
  );
};

export default InvoicePage;
