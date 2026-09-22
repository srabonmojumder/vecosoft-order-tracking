import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder, orders } from "../data/orders";
import Navbar from "../components/Navbar";
import ScenarioSwitcher from "../components/ScenarioSwitcher";
import Toast from "../components/Toast";
import OrderHeader from "../components/OrderHeader";
import StatusBanner from "../components/StatusBanner";
import DeliveryMap from "../components/DeliveryMap";
import DeliveryTimeline from "../components/DeliveryTimeline";
import OrderSummary from "../components/OrderSummary";
import DeliveryInfo from "../components/DeliveryInfo";
import SupportSection from "../components/SupportSection";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ReportIssueModal from "../components/ReportIssueModal";
import SupportChatModal from "../components/SupportChatModal";
import "./OrderTrackingPage.css";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals & Interactive Overlays
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const fetchOrder = (id = orderId) => {
    setLoading(true);
    setError(null);
    getOrder(id)
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
    fetchOrder(orderId);
  }, [orderId]);

  const handleSelectScenario = (newId) => {
    navigate(`/order/${newId}`);
  };

  const handleToggleLoading = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  };

  const handleToggleError = () => {
    setLoading(false);
    setError("Simulated network timeout (Evaluator test)");
  };

  const handleSubmitClaim = (claimId, resolution) => {
    showToast(`Claim #${claimId} submitted successfully!`, "success");
    // Update local order state to show claim filed
    setOrder((prev) => ({
      ...prev,
      statusLabel: "Claim Pending",
      timeline: prev.timeline.map((step) =>
        step.step === "delivered"
          ? {
              ...step,
              description: `Claim ${claimId} opened (${resolution}). Resolution in progress.`,
            }
          : step
      ),
    }));
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Interactive Scenario Switcher toolbar */}
      <ScenarioSwitcher
        currentId={orderId}
        currentStatus={order?.status}
        isLoading={loading}
        isError={!!error}
        onSelectScenario={handleSelectScenario}
        onToggleLoading={handleToggleLoading}
        onToggleError={handleToggleError}
      />

      <Navbar title="Track Order" />

      <main className="tracking-page">
        {loading && <LoadingState />}

        {error && (
          <ErrorState
            onRetry={() => {
              setError(null);
              fetchOrder(orderId);
            }}
          />
        )}

        {!loading && !error && order && (
          <div className="tracking-content-flow animate-fade">
            {/* Header info badge */}
            <OrderHeader order={order} />

            {/* Status notification banner */}
            <StatusBanner
              order={order}
              onOpenReport={() => setIsReportOpen(true)}
              onOpenChat={() => setIsChatOpen(true)}
              onNotifyMe={() =>
                showToast("SMS & Email alerts activated for this shipment!", "info")
              }
            />

            {/* Live Visual Map & Courier radar */}
            <DeliveryMap
              order={order}
              onOpenReport={() => setIsReportOpen(true)}
            />

            {/* Animated Delivery Stepper Timeline */}
            <DeliveryTimeline order={order} />

            {/* Courier & Shipping Details */}
            <DeliveryInfo
              order={order}
              onToast={showToast}
            />

            {/* Itemized Order & Price Breakdown */}
            <OrderSummary
              order={order}
              onToast={showToast}
            />

            {/* Multi-channel Customer Help & Claims desk */}
            <SupportSection
              order={order}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenReport={() => setIsReportOpen(true)}
              onCallSupport={() =>
                showToast("Connecting to priority line: 1-800-555-VECO...", "info")
              }
              onEmailSupport={() =>
                showToast("Drafting inquiry to support@vecosoft.com...", "info")
              }
            />
          </div>
        )}
      </main>

      {/* Interactive Report Issue Modal */}
      <ReportIssueModal
        order={order}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmitClaim={handleSubmitClaim}
      />

      {/* Interactive Live Chat Concierge Modal */}
      <SupportChatModal
        order={order}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
