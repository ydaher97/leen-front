import React, { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const useCustomer = () => {
  return useContext(CustomerContext);
};

export const CustomerProvider = ({ children }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  console.log(selectedCustomer);
  return (
    <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
