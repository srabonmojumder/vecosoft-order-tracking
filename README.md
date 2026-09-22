# Mobile Order Tracking Redesign — Vecosoft Assessment

A modern, mobile-first Order Tracking application engineered for e-commerce, built with React, Vite, and modern CSS. Fully addresses **Task 1 — Order Tracking Screen**.

## 📱 Live Demo Scenarios & Situations

The application supports all three situations required by the assessment:

1. **Delayed Order** (`/order/order-delayed`):
   - Estimated delivery time passed due to severe weather delay
   - Prominent amber alert banner with delay explanation & revised ETA
   - Animated GPS courier route map with live radar pulse
   - Delivery stepper with glowing amber pulse on the delayed milestone

2. **Delivered but Not Received** (`/order/order-not-received`):
   - Order marked delivered, customer missing package
   - Drop-off location map with interactive delivery proof photo viewer
   - Multi-step interactive claim modal with 3 resolution paths:
     - Free expedited replacement
     - Full refund
     - Courier investigation
   - Instant claim ticket ID generation (`CLM-XXXXXX`)

3. **Tracking Not Available Yet** (`/order/order-no-tracking`):
   - Order placed & confirmed, tracking pending carrier pickup
   - Fulfillment warehouse packing animation
   - "Get SMS Alerts" interactive subscription toggle
   - Avoids an empty or broken-looking screen

---

## ⚡ Interactive Toolbar

When viewing any tracking page, an **Interactive Assessment Toolbar** is docked at the top to allow 1-click toggling between:
- 🕒 Delayed Order
- ❌ Delivered / Not Received
- 📦 Tracking Pending
- ⏳ Loading State (shimmer skeleton preview)
- ⚠️ Error State (network error fallback with retry)

---

## 🛠️ Features & Highlights

- **Visual Delivery Stepper**: Continuous animated progress track (0–100%), glowing milestone rings, timestamps, and step badges.
- **Live Courier Radar Map**: Dynamic SVG transit route and drop-off simulation.
- **Interactive AI Concierge**: Live chat drawer with automated instant answers and quick prompt chips.
- **Expandable Order Summary**: Product breakdown with variants, quantities, price details, and PDF receipt download.
- **Copy Tracking Code**: One-tap clipboard copy with floating toast alert.
- **Mobile-First**: Optimized for 360–430px mobile widths, centered desktop preview framing with glassmorphism.

---

## 🚀 Setup & Local Run Instructions

```bash
# 1. Clone the repository
git clone https://github.com/srabonmojumder/vecosoft-order-tracking.git
cd vecosoft-order-tracking

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# App will run at http://localhost:5173

# 4. Build for production
npm run build
```

---

## 💻 Tech Stack

- **React 19**
- **Vite 6**
- **React Router v7**
- **Lucide React** (icons)
- **Vanilla CSS** with CSS custom properties, glassmorphism, and keyframe animations
- **Inter** (Google Fonts)
