export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateTime(dateString) {
  if (!dateString) return "";
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getStatusColor(status) {
  switch (status) {
    case "delayed":
      return "warning";
    case "not-received":
      return "error";
    case "no-tracking":
      return "info";
    case "delivered":
      return "success";
    default:
      return "primary";
  }
}
