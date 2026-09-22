import { Routes, Route } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<OrderListPage />} />
      <Route path="/order/:orderId" element={<OrderTrackingPage />} />
    </Routes>
  );
}
