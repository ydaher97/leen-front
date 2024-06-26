import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem as MenuListItem,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import { useCustomer } from "../context/CustomerContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useUser();
  const { selectedCustomer, setSelectedCustomer } = useCustomer();
  const [modalOpen, setModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://leen-back.onrender.com/api/users"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/signin");

    handleUserMenuClose();
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleCustomerSelect = (event, value) => {
    setSelectedCustomer(value);
  };

  const handleConfirmSelection = () => {
    handleCloseModal();
  };

  return (
    <>
      <AppBar position="static" dir="rtl" color="secondary">
        <Toolbar>
          <Button color="inherit" onClick={handleDashboardClick}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              לוח בקרה
            </Typography>
          </Button>
          <Button color="inherit" onClick={handleUserMenuClick}>
            {user.name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
          >
            <MenuListItem onClick={handleLogout}>התנתקות</MenuListItem>
          </Menu>
          {selectedCustomer?.name && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              לקוח : {selectedCustomer.name}
            </Typography>
          )}
          <Button color="inherit" onClick={handleOpenModal}>
            בחר לקוח
          </Button>
          {user?.isAdmin && (
            <Button color="inherit" onClick={() => navigate("/admin")}>
              מנהל
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>בחר לקוח</DialogTitle>
        <DialogContent>
          <DialogContentText>אנא בחר לקוח כדי להמשיך.</DialogContentText>
          <Autocomplete
            options={customers}
            getOptionLabel={(customer) => customer.name}
            renderInput={(params) => (
              <TextField {...params} label="חיפוש לקוח" variant="outlined" />
            )}
            onChange={handleCustomerSelect}
            value={selectedCustomer}
            getOptionSelected={(option, value) => option._id === value._id}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            ביטול
          </Button>
          <Button onClick={handleConfirmSelection} color="primary">
            אשר
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
