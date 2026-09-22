import {
  ShoppingBag,
  Package,
  Truck,
  MapPin,
  CircleCheck,
  AlertTriangle,
  Clock,
  CircleDashed,
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

export default function DeliveryTimeline({ order }) {
  return (
    <div className="timeline-card animate-fade-in-up animate-delay-2">
      <h3 className="section-title">Delivery Progress</h3>
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
                {state === "delayed" ? (
                  <AlertTriangle size={16} strokeWidth={2.5} />
                ) : state === "active" ? (
                  <Clock size={16} strokeWidth={2.5} />
                ) : state === "pending" ? (
                  <CircleDashed size={16} strokeWidth={2} />
                ) : state === "issue" ? (
                  <AlertTriangle size={16} strokeWidth={2.5} />
                ) : (
                  <Icon size={16} strokeWidth={2.5} />
                )}
              </div>

              {/* Content */}
              <div className="timeline-content">
                <div className="timeline-label-row">
                  <span className="timeline-label">{step.label}</span>
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
