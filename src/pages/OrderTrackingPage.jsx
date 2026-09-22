import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../data/orders";
import Navbar from "../components/Navbar";
import StatusBanner from "../components/StatusBanner";
import OrderHeader from "../components/OrderHeader";
import DeliveryTimeline from "../components/DeliveryTimeline";
import OrderSummary from "../components/OrderSummary";
import DeliveryInfo from "../components/DeliveryInfo";
import SupportSection from "../components/SupportSection";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import "./OrderTrackingPage.css";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = () => {
    setLoading(true);
    setError(null);
    getOrder(orderId)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return (
    <div className="app-container">
      <Navbar title="Track Order" />
      <main className="tracking-page">
        {loading && <LoadingState />}
        {error && <ErrorState onRetry={fetchOrder} />}
        {!loading && !error && order && (
          <>
            <OrderHeader order={order} />
            <StatusBanner order={order} />
            <DeliveryTimeline order={order} />
            <DeliveryInfo order={order} />
            <OrderSummary order={order} />
            <SupportSection order={order} />
          </>
        )}
      </main>
    </div>
  );
}
