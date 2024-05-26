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
} from "@mui/material";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items");
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error loading items: {error.message}</Alert>;
  }

  return (
    <Grid container spacing={2} padding={3}>
      {items?.map((item) => (
        <Grid item key={item._id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{item.name}</Typography>
              <Typography variant="body2">
                <strong>Price:</strong> ${item.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsList;
