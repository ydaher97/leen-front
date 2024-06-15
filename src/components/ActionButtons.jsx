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
    <Box
      display="flex"
      justifyContent="space-around"
      mt={2}
      sx={{ direction: "rtl" }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Receipts")}
        disabled={!selectedCustomer}
      >
        קבלות
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Order")}
        disabled={!selectedCustomer}
      >
        הזמנה
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Document")}
        disabled={!selectedCustomer}
      >
        מסמך
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Invoice")}
        disabled={!selectedCustomer}
      >
        חשבונית
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick("Delivery")}
        disabled={!selectedCustomer}
      >
        משלוח
      </Button>
    </Box>
  );
};

export default ActionButtons;
