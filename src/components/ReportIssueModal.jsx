import { useState } from "react";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Package,
  RotateCcw,
  ShieldCheck,
  Send,
  HelpCircle,
  FileText,
} from "lucide-react";
import "./ReportIssueModal.css";

export default function ReportIssueModal({ order, isOpen, onClose, onSubmitClaim }) {
  const [step, setStep] = useState(1);
  const [checkedPlaces, setCheckedPlaces] = useState({
    porch: false,
    mailbox: false,
    neighbors: false,
    reception: false,
  });
  const [resolution, setResolution] = useState("replacement");
  const [comments, setComments] = useState("");
  const [claimId, setClaimId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePlaceToggle = (key) => {
    setCheckedPlaces((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProceedToResolution = () => {
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const generatedId = "CLM-" + Math.floor(100000 + Math.random() * 900000);
      setClaimId(generatedId);
      setSubmitting(false);
      setStep(3);
      if (onSubmitClaim) {
        onSubmitClaim(generatedId, resolution);
      }
    }, 900);
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div
        className="modal-card animate-modal-slide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h2 id="modal-title" className="modal-title">
                {step === 3 ? "Claim Submitted" : "Report Missing Package"}
              </h2>
              <span className="modal-subtitle">
                Order #{order?.orderNumber}
              </span>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={handleResetAndClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-step indicator */}
        <div className="stepper-dots">
          <div className={`step-dot ${step >= 1 ? "step-dot-active" : ""}`}>
            <span>1</span>
            <label>Location</label>
          </div>
          <div className="step-line" />
          <div className={`step-dot ${step >= 2 ? "step-dot-active" : ""}`}>
            <span>2</span>
            <label>Solution</label>
          </div>
          <div className="step-line" />
          <div className={`step-dot ${step === 3 ? "step-dot-active" : ""}`}>
            <span>3</span>
            <label>Confirm</label>
          </div>
        </div>

        <div className="modal-body">
          {/* STEP 1: VERIFY SAFE SPOTS */}
          {step === 1 && (
            <div className="modal-step-content animate-fade">
              <div className="step-callout">
                <HelpCircle size={20} className="callout-icon" />
                <p>
                  Couriers often leave packages in secure or covered areas nearby.
                  Please confirm where you have already checked:
                </p>
              </div>

              <div className="checklist-group">
                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={checkedPlaces.porch}
                    onChange={() => handlePlaceToggle("porch")}
                  />
                  <div className="checkbox-custom" />
                  <div className="checkbox-text">
                    <strong>Front porch & back patio</strong>
                    <span>Behind planters, pillars, or garage doors</span>
                  </div>
                </label>

                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={checkedPlaces.mailbox}
                    onChange={() => handlePlaceToggle("mailbox")}
                  />
                  <div className="checkbox-custom" />
                  <div className="checkbox-text">
                    <strong>Community mailbox or parcel locker</strong>
                    <span>Check for a key or locker code notification</span>
                  </div>
                </label>

                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={checkedPlaces.neighbors}
                    onChange={() => handlePlaceToggle("neighbors")}
                  />
                  <div className="checkbox-custom" />
                  <div className="checkbox-text">
                    <strong>Neighbors or adjacent apartments</strong>
                    <span>Often accepted on your behalf</span>
                  </div>
                </label>

                <label className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={checkedPlaces.reception}
                    onChange={() => handlePlaceToggle("reception")}
                  />
                  <div className="checkbox-custom" />
                  <div className="checkbox-text">
                    <strong>Building lobby or leasing office</strong>
                    <span>Checked with front desk or package room</span>
                  </div>
                </label>
              </div>

              <button
                type="button"
                className="modal-action-btn primary-btn"
                onClick={handleProceedToResolution}
              >
                <span>None of these — Choose Resolution</span>
              </button>
            </div>
          )}

          {/* STEP 2: CHOOSE RESOLUTION */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="modal-step-content animate-fade">
              <p className="resolution-instructions">
                Under the <strong>Vecosoft Delivery Guarantee</strong>, we protect your order. How would you like us to resolve this?
              </p>

              <div className="resolution-options">
                <label
                  className={`resolution-card ${
                    resolution === "replacement" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    value="replacement"
                    checked={resolution === "replacement"}
                    onChange={() => setResolution("replacement")}
                  />
                  <div className="resolution-icon res-replace">
                    <Package size={20} />
                  </div>
                  <div className="resolution-content">
                    <div className="res-title-row">
                      <strong>Send Replacement (Free)</strong>
                      <span className="res-badge">Fastest</span>
                    </div>
                    <span>
                      Expedited delivery shipped at zero additional cost to your address.
                    </span>
                  </div>
                </label>

                <label
                  className={`resolution-card ${
                    resolution === "refund" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    value="refund"
                    checked={resolution === "refund"}
                    onChange={() => setResolution("refund")}
                  />
                  <div className="resolution-icon res-refund">
                    <RotateCcw size={20} />
                  </div>
                  <div className="resolution-content">
                    <div className="res-title-row">
                      <strong>Issue Full Refund</strong>
                    </div>
                    <span>
                      Total ${order?.total?.toFixed(2)} refunded to original payment method (3-5 business days).
                    </span>
                  </div>
                </label>

                <label
                  className={`resolution-card ${
                    resolution === "investigation" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="resolution"
                    value="investigation"
                    checked={resolution === "investigation"}
                    onChange={() => setResolution("investigation")}
                  />
                  <div className="resolution-icon res-investigate">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="resolution-content">
                    <div className="res-title-row">
                      <strong>Open Courier Investigation</strong>
                    </div>
                    <span>
                      Contact {order?.carrier || "carrier"} with GPS delivery coordinates inspection.
                    </span>
                  </div>
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="additionalNotes" className="input-label">
                  Additional notes for carrier investigation (optional)
                </label>
                <textarea
                  id="additionalNotes"
                  className="modal-textarea"
                  rows={2}
                  placeholder="e.g. gate code was open, cameras show no vehicle stopped..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <div className="modal-btn-row">
                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="modal-action-btn primary-btn flex-1"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span>Submitting Claim...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Resolution Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 3 && (
            <div className="modal-step-content text-center animate-scale-up">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} className="success-check-icon" />
              </div>

              <h3 className="success-title">Your Claim has been Filed!</h3>
              <p className="success-desc">
                We apologize for the delivery issue. Your claim has been expedited with our fulfillment escalation desk.
              </p>

              <div className="claim-ticket-card">
                <div className="ticket-row">
                  <span className="ticket-label">Claim Reference ID</span>
                  <span className="ticket-val-id">{claimId}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Resolution Requested</span>
                  <span className="ticket-val-capitalize">
                    {resolution === "replacement"
                      ? "Free Expedited Replacement"
                      : resolution === "refund"
                      ? "Full Refund"
                      : "Courier GPS Investigation"}
                  </span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Estimated Response</span>
                  <span className="ticket-val">Within 4 business hours</span>
                </div>
              </div>

              <div className="success-actions">
                <button
                  type="button"
                  className="modal-action-btn primary-btn w-full"
                  onClick={handleResetAndClose}
                >
                  Return to Tracking View
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
