// Mock order data for three tracking scenarios

export const orders = {
  "order-delayed": {
    id: "order-delayed",
    orderNumber: "ORD-2024-78432",
    status: "delayed",
    statusLabel: "Delayed",
    placedAt: "2024-12-15T10:30:00Z",
    estimatedDelivery: "2024-12-20T18:00:00Z",
    revisedDelivery: "2024-12-23T20:00:00Z",
    actualDelivery: null,
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    shippingAddress: {
      name: "Srabon Mozumder",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Sony WH-1000XM5 Headphones",
        variant: "Black",
        quantity: 1,
        price: 348.0,
        image: "headphones",
      },
      {
        id: 2,
        name: "USB-C Charging Cable (2m)",
        variant: "White",
        quantity: 2,
        price: 12.99,
        image: "cable",
      },
    ],
    subtotal: 373.98,
    shipping: 5.99,
    tax: 33.25,
    total: 413.22,
    timeline: [
      {
        step: "ordered",
        label: "Order Placed",
        description: "Your order has been confirmed",
        timestamp: "2024-12-15T10:30:00Z",
        completed: true,
      },
      {
        step: "processing",
        label: "Processing",
        description: "Your order is being prepared",
        timestamp: "2024-12-15T14:00:00Z",
        completed: true,
      },
      {
        step: "shipped",
        label: "Shipped",
        description: "Package picked up by UPS",
        timestamp: "2024-12-16T09:15:00Z",
        completed: true,
      },
      {
        step: "out-for-delivery",
        label: "Out for Delivery",
        description: "Delivery delayed due to weather conditions",
        timestamp: null,
        completed: false,
        active: true,
        delayed: true,
      },
      {
        step: "delivered",
        label: "Delivered",
        description: "",
        timestamp: null,
        completed: false,
      },
    ],
    delayReason: "Severe weather conditions in your area are causing delivery delays. We apologize for the inconvenience.",
  },

  "order-not-received": {
    id: "order-not-received",
    orderNumber: "ORD-2024-65219",
    status: "not-received",
    statusLabel: "Delivered — Not Received",
    placedAt: "2024-12-10T08:00:00Z",
    estimatedDelivery: "2024-12-14T18:00:00Z",
    revisedDelivery: null,
    actualDelivery: "2024-12-14T15:32:00Z",
    trackingNumber: "9400111899223100456",
    carrier: "USPS",
    shippingAddress: {
      name: "Srabon Mozumder",
      street: "456 Oak Avenue",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Apple AirPods Pro (2nd Gen)",
        variant: "White",
        quantity: 1,
        price: 249.0,
        image: "airpods",
      },
    ],
    subtotal: 249.0,
    shipping: 0.0,
    tax: 22.16,
    total: 271.16,
    timeline: [
      {
        step: "ordered",
        label: "Order Placed",
        description: "Your order has been confirmed",
        timestamp: "2024-12-10T08:00:00Z",
        completed: true,
      },
      {
        step: "processing",
        label: "Processing",
        description: "Your order is being prepared",
        timestamp: "2024-12-10T12:30:00Z",
        completed: true,
      },
      {
        step: "shipped",
        label: "Shipped",
        description: "Package picked up by USPS",
        timestamp: "2024-12-11T10:00:00Z",
        completed: true,
      },
      {
        step: "out-for-delivery",
        label: "Out for Delivery",
        description: "Package is on the delivery vehicle",
        timestamp: "2024-12-14T07:45:00Z",
        completed: true,
      },
      {
        step: "delivered",
        label: "Delivered",
        description: "Left at front door",
        timestamp: "2024-12-14T15:32:00Z",
        completed: true,
        issue: true,
      },
    ],
    deliveryNote: "Left at front door",
  },

  "order-no-tracking": {
    id: "order-no-tracking",
    orderNumber: "ORD-2024-91087",
    status: "no-tracking",
    statusLabel: "Tracking Pending",
    placedAt: "2024-12-19T16:45:00Z",
    estimatedDelivery: "2024-12-24T18:00:00Z",
    revisedDelivery: null,
    actualDelivery: null,
    trackingNumber: null,
    carrier: null,
    shippingAddress: {
      name: "Srabon Mozumder",
      street: "789 Elm Boulevard, Suite 12",
      city: "Manhattan",
      state: "NY",
      zip: "10016",
      country: "United States",
    },
    items: [
      {
        id: 1,
        name: "Kindle Paperwhite (16GB)",
        variant: "Agave Green",
        quantity: 1,
        price: 149.99,
        image: "kindle",
      },
      {
        id: 2,
        name: "Kindle Fabric Cover",
        variant: "Black",
        quantity: 1,
        price: 39.99,
        image: "cover",
      },
      {
        id: 3,
        name: "Screen Protector (2-Pack)",
        variant: "Clear",
        quantity: 1,
        price: 8.99,
        image: "protector",
      },
    ],
    subtotal: 198.97,
    shipping: 0.0,
    tax: 17.71,
    total: 216.68,
    timeline: [
      {
        step: "ordered",
        label: "Order Placed",
        description: "Your order has been confirmed",
        timestamp: "2024-12-19T16:45:00Z",
        completed: true,
      },
      {
        step: "processing",
        label: "Processing",
        description: "Your order is being prepared",
        timestamp: null,
        completed: false,
        active: true,
      },
      {
        step: "shipped",
        label: "Shipped",
        description: "",
        timestamp: null,
        completed: false,
      },
      {
        step: "out-for-delivery",
        label: "Out for Delivery",
        description: "",
        timestamp: null,
        completed: false,
      },
      {
        step: "delivered",
        label: "Delivered",
        description: "",
        timestamp: null,
        completed: false,
      },
    ],
  },
};

export const getOrder = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = orders[id];
      if (order) {
        resolve(order);
      } else {
        reject(new Error("Order not found"));
      }
    }, 1200);
  });
};

export const getOrderList = () => {
  return Object.values(orders).map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    statusLabel: order.statusLabel,
    total: order.total,
    itemCount: order.items.length,
    firstItemName: order.items[0].name,
    placedAt: order.placedAt,
  }));
};
