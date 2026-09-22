import {
  ShoppingBag,
  Package,
  Truck,
  MapPin,
  CircleCheck,
  AlertTriangle,
  Clock,
  CircleDashed,
  Sparkles,
} from "lucide-react";
import { formatDateTime } from "../utils/helpers";
import "./DeliveryTimeline.css";

const stepIcons = {
  ordered: ShoppingBag,
  processing: Package,
  shipped: Truck,
  "out-for-delivery": MapPin,
  delivered: CircleCheck,
};

function getStepState(step, orderStatus) {
  if (step.completed && step.issue) return "issue";
  if (step.completed) return "completed";
  if (step.delayed) return "delayed";
  if (step.active) return "active";
  return "pending";
}

function getProgressPercentage(order) {
  if (order.status === "not-received") return 100;
  if (order.status === "delayed") return 75;
  if (order.status === "no-tracking") return 25;
  return 50;
}

export default function DeliveryTimeline({ order }) {
  const percentage = getProgressPercentage(order);

  return (
    <div className="timeline-card animate-fade-in-up animate-delay-2">
      <div className="timeline-header-row">
        <div>
          <h3 className="section-title">Delivery Progress</h3>
          <span className="timeline-meta-subtitle">
            {order.status === "delayed"
              ? "Step 4 of 5 • Delayed en route"
              : order.status === "not-received"
              ? "Step 5 of 5 • Marked Delivered"
              : "Step 2 of 5 • Processing"}
          </span>
        </div>
        <div className="progress-percentage-chip">
          <span>{percentage}%</span>
        </div>
      </div>

      {/* Modern Gradient Track Progress Bar */}
      <div className="timeline-progress-bar-track">
        <div
          className={`timeline-progress-bar-fill ${
            order.status === "delayed"
              ? "fill-delayed"
              : order.status === "not-received"
              ? "fill-issue"
              : "fill-active"
          }`}
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-shimmer" />
        </div>
      </div>

      {/* Stepper Timeline List */}
      <div className="timeline" role="list" aria-label="Delivery timeline">
        {order.timeline.map((step, index) => {
          const state = getStepState(step, order.status);
          const Icon = stepIcons[step.step] || Package;
          const isLast = index === order.timeline.length - 1;

          return (
            <div
              key={step.step}
              className={`timeline-step timeline-step-${state}`}
              role="listitem"
              aria-current={state === "active" || state === "delayed" ? "step" : undefined}
            >
              {/* Connector line */}
              {!isLast && (
                <div
                  className={`timeline-connector ${
                    state === "completed" ? "connector-completed" : ""
                  } ${state === "delayed" || state === "issue" ? "connector-issue" : ""}`}
                />
              )}

              {/* Icon */}
              <div className={`timeline-icon icon-${state}`}>
                {state === "delayed" && <div className="icon-pulse-glow pulse-delayed" />}
                {state === "active" && <div className="icon-pulse-glow pulse-active" />}
                {state === "issue" && <div className="icon-pulse-glow pulse-issue" />}

                {state === "delayed" ? (
                  <AlertTriangle size={17} strokeWidth={2.5} />
                ) : state === "active" ? (
                  <Clock size={17} strokeWidth={2.5} />
                ) : state === "pending" ? (
                  <CircleDashed size={16} strokeWidth={2} />
                ) : state === "issue" ? (
                  <AlertTriangle size={17} strokeWidth={2.5} />
                ) : (
                  <Icon size={17} strokeWidth={2.5} />
                )}
              </div>

              {/* Content */}
              <div className="timeline-content">
                <div className="timeline-label-row">
                  <div className="label-with-badge">
                    <span className="timeline-label">{step.label}</span>
                    {state === "delayed" && (
                      <span className="step-tag tag-delayed">Delayed</span>
                    )}
                    {state === "issue" && (
                      <span className="step-tag tag-issue">Delivered / Missing</span>
                    )}
                    {state === "active" && (
                      <span className="step-tag tag-active">In Progress</span>
                    )}
                  </div>
                  {step.timestamp && (
                    <span className="timeline-time">
                      {formatDateTime(step.timestamp)}
                    </span>
                  )}
                </div>

                {step.description && (
                  <p className="timeline-description">{step.description}</p>
                )}

                {state === "active" && order.status === "no-tracking" && (
                  <div className="timeline-processing-indicator">
                    <span className="processing-dot" />
                    <span className="processing-dot" />
                    <span className="processing-dot" />
                    <span className="processing-text">Preparing order in fulfillment warehouse</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
