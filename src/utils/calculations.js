export const calculateTotal = (items) => {
  return items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
};

export const calculateBeforeTax = (amount) => {
  return (amount / 1.175).toFixed(2);
};
