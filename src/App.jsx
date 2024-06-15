import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";

import { useUser } from "./context/UserContext";

import SignIn from "./components/SignIn";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import OrderPage from "./components/OrderPage";
import ReceiptsPage from "./pages/receiptsPage";
import DocumentsPage from "./pages/DocumentPage";
import InvoicePage from "./pages/InvoicePage";

function App() {
  const { user } = useUser();

  return (
    <Router>
      <Container width="100%" p={0} maxWidth={false} disableGutters>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          {user && <Route path="/admin" element={<Admin />} />}
          {user && <Route path="/dashboard" element={<Dashboard />} />}
          {user && <Route path="/order" element={<OrderPage />} />}
          <Route path="/receipts" element={<ReceiptsPage />} />
          <Route path="/document" element={<DocumentsPage />} />
          <Route path="/invoice" element={<InvoicePage />} />

          {!user && (
            <Route path="*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
