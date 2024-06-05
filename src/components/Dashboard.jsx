import { Container } from "@mui/material";
import Navbar from "./Nav";
import ActionButtons from "./ActionButtons";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <ActionButtons />
      </Container>
    </>
  );
};

export default Dashboard;
