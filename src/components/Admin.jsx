import React from "react";
import { Box } from "@mui/material";
import CreateCustomerForm from "./CreateCustomerForm";
import CreateWorkerForm from "./createWorkerForm";
import CreateItemForm from "./createItemForm";
import CustomersList from "./CustomerList";
import WorkersList from "./WorkerList";
import Navbar from "./Nav";

const Admin = () => {
  return (
    <>
      <Navbar />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        mt={2}
      >
        <Box width="100%" mt={2} sx={{ textAlign: "-webkit-center" }}>
          <Box width="50%">
            <CreateCustomerForm />
            <CreateWorkerForm />
            <CreateItemForm />
          </Box>
          <CustomersList />
          <WorkersList />
        </Box>
      </Box>
    </>
  );
};

export default Admin;
