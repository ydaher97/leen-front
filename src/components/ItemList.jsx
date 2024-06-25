import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/cartContext";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";
import { Plus } from "lucide-react";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://leen-back.onrender.com/api/items"
        );
        console.log(response.data);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = parseInt(quantities[item._id], 10) || 1; // Default to 1 if no quantity is set
    addToCart(item, quantity);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">שגיאה בטעינת הפריטים: {error.message}</Alert>
    );
  }

  return (
    <div>
      <TextField
        label="חפש פריטים"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Grid container spacing={2} padding={3} direction="rtl">
        {filteredItems.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="body2">
                  <strong>מחיר:</strong> ₪{item.price.toFixed(2)}
                </Typography>
                <TextField
                  type="number"
                  label="כמות"
                  value={quantities[item._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                  inputProps={{ min: 1 }}
                  fullWidth
                  margin="normal"
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleAddToCart(item)}
                >
                  הוסף לסל
                  <Plus />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemsList;
