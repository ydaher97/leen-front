import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { selectedCustomer } = useCustomer();

  const handleButtonClick = (action) => {
    switch (action) {
      case "Receipts":
        navigate("/receipts");
        break;
      case "Order":
        navigate("/order");
        break;
      case "Document":
        navigate("/document");
        break;
      case "Invoice":
        navigate("/invoice");
        break;
      case "Delivery":
        navigate("/delivery");
        break;
      default:
        break;
    }
  };

  return (
    <Box display="flex" justifyContent="space-around" mt={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Receipts")}
        disabled={!selectedCustomer}
      >
        Receipts
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Order")}
        disabled={!selectedCustomer}
      >
        Order
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Document")}
        disabled={!selectedCustomer}
      >
        Document
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Invoice")}
        disabled={!selectedCustomer}
      >
        Invoice
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Delivery")}
        disabled={!selectedCustomer}
      >
        Delivery
      </Button>
    </Box>
  );
};

export default ActionButtons;
