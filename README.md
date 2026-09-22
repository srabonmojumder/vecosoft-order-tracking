# Order Tracking Screen — Vecosoft Assessment

A modern, professional mobile Order Tracking screen for an e-commerce application, built with React + Vite.

## Features

- **3 Order States**: Delayed, Delivered but Not Received, Tracking Not Available
- **Visual Timeline**: Animated step-by-step delivery progress
- **Responsive Design**: Optimized for 360–430px mobile widths
- **Loading & Error States**: Skeleton loading + error with retry
- **Contact Support**: Call, Email, Live Chat options
- **Copy Tracking**: One-tap tracking number copy
- **Micro-Animations**: Fade-in, pulse, shimmer effects

## Tech Stack

- **React 19** + **Vite 6**
- **React Router v7** for navigation
- **Lucide React** for icons
- **Vanilla CSS** with CSS custom properties
- **Inter** (Google Fonts) for typography

## Setup & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar
│   ├── StatusBanner
│   ├── DeliveryTimeline
│   ├── OrderHeader
│   ├── OrderSummary
│   ├── DeliveryInfo
│   ├── SupportSection
│   ├── LoadingState
│   └── ErrorState
├── pages/           # Route pages
│   ├── OrderListPage
│   └── OrderTrackingPage
├── data/            # Mock data
│   └── orders.js
├── utils/           # Helpers
│   └── helpers.js
└── index.css        # Global design system
```

## Demo

The landing page shows three order cards — tap each to see a different tracking state:
1. **Delayed** — delivery past ETA with weather delay notice
2. **Not Received** — marked delivered but customer reports missing
3. **No Tracking** — order placed, awaiting tracking info
