# AI Prompt History — Vecosoft Assessment Submission

**Candidate**: Srabon Mozumder  
**Assessment**: Frontend Developer Practical Assessment  
**Project**: Task 1 — Mobile Order Tracking Screen Redesign  
**Tool Used**: Google Antigravity (Claude Opus 4.6 & Gemini 3.8 Flash)  

---

### Prompt 1: Initial Assessment Brief & Scope Analysis
```text
Please analyze the assessment brief for "Task 1 — Order Tracking Screen". 
The current application only shows: Processing, Shipped, Out for Delivery, Delivered.
Users report that the current status is difficult to understand. 

I need to redesign and implement a modern, professional mobile order tracking experience for an e-commerce platform that includes:
- Clear visual delivery progress/timeline with stepper milestones
- Prominent current order status and clear communication at a glance
- Estimated delivery date/time with revised delay adjustments
- Itemized order/product summary with price breakdown
- Multi-channel support access (Live Chat, Phone, Email)
- Skeleton loading, empty, and error states
- Responsive mobile layout targeting 360–430px viewports
- Clean spacing, modern typography, visual hierarchy, and cohesive design system
- Meaningful interactions: viewing order details, contacting support, reporting issues

The UI must gracefully handle and adapt to all three core situations:
1. Delayed Order — estimated delivery time has passed; communicate delay clearly with revised ETA and next steps.
2. Delivered but Not Received — marked delivered, but customer reports missing package; provide dispute/claim workflow.
3. Tracking Not Available Yet — order exists but tracking is pending; provide reassurance and avoid broken/empty screen.

Please outline a comprehensive architectural plan before proceeding.
```

---

### Prompt 2: Technical Implementation Plan Approval
```text
The proposed implementation plan using React 19, Vite 6, React Router, Lucide icons, and modern CSS custom properties with mobile-first layout (360–430px) is approved. Please proceed with scaffolding and building the component architecture.
```

---

### Prompt 3: Progressive Git Commit Structure
```text
Please structure the repository history into 15 atomic, logical git commits that reflect a natural, professional engineering progression (e.g., initial project setup, design tokens, mock data entities, stepper components, exception banners, and route orchestration). 

Ensure each commit represents a clean, single responsibility. Avoid generic conventional prefixes like "feat:", "fix:", or "add:", and write clear, professional, imperative developer commit messages.
```

---

### Prompt 4: UI/UX Modernization, Animation & Visual Polish
```text
Review the application against modern e-commerce mobile design standards. Elevate the visual aesthetics and interaction fidelity:
- Implement smooth CSS keyframe animations, glowing radar pulses on active/delayed milestones, and continuous progress track fills.
- Use frosted glassmorphism (backdrop-filter blur), subtle ambient state glows (amber for delays, crimson for delivery discrepancies, indigo for in-transit), and curated HSL palettes.
- Add an interactive delivery radar card featuring live courier transit route simulation, GPS driver marker, and delivery photo proof preview modal.
- Include collapsible order summary cards and an invoice/receipt download trigger.
```

---

### Prompt 5: Edge-Case Scenarios & Interactive Support Flows
```text
Ensure all three edge-case situations are fully interactive with complete user journeys:
1. For "Delivered but Not Received": Build an interactive 3-step Missing Package Claim modal allowing users to verify safe drop-off spots, select a preferred resolution (Free Expedited Replacement, Full Refund, or Courier Investigation), and receive an instant claim confirmation ticket ID (CLM-XXXXXX).
2. For "Delayed Order": Integrate a live concierge chat drawer with automated instant answers and quick inquiry chips regarding weather delays.
3. For "Tracking Not Available": Provide an active packing visualization and an interactive "Get SMS Alerts" toggle with floating toast confirmation.
4. Add an Interactive Scenario Switcher toolbar at the top of the mobile screen so evaluators can seamlessly toggle between all 3 order states, skeleton loading, and error recovery states with a single click.
```

---

### Prompt 6: Production Build & Responsive Audit
```text
Run a full production bundle build (vite build) to ensure zero syntax or build errors. Verify that all components scale seamlessly on mobile viewports between 360px and 430px with safe-area support, and update the repository README with comprehensive local setup and run instructions.
```
