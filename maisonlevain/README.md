# Maison Levain — Artisanal Bakery & Storefront

An artisanal French bakery storefront and online ordering system crafted with React 19, TypeScript, Vite, and Tailwind CSS. Built for performance, responsiveness across mobile, tablet, and desktop, and zero-configuration 1-click deployment to GitHub Pages.

---

## ✨ Features

- **Heritage Bakery Catalog:** Browse slow-fermented sourdough loaves, laminated viennoiseries, brioches, and seasonal specialty hearth bakes with nutritional details, ingredients, and allergen badges.
- **Interactive Custom Box Builder:** Select 4, 6, or 8-piece artisanal bakery gift boxes with real-time capacity meters, dynamic visual tray previews, and item counter controls.
- **Daily Oven Bake Schedule:** Real-time bake schedule detailing morning batches, afternoon drops, and specialty hearth releases.
- **Club Maison Loyalty Program:** Tiered patron membership (Apprenti, Compagnon, Maître) offering discounts, priority oven reservations, and exclusive tastings.
- **Sommelier Pairing Guide:** Curated pairing suggestions uniting heritage breads and pastries with artisanal cheeses, preserves, teas, and natural wines.
- **Order Lookup & Status Tracker:** Quick receipt-based order tracking system for pickups and delivery orders.
- **Seamless Local Persistence:** Safe, sandboxed cart and box state synchronization resilient against browser crashes and iframe restrictions.
- **Fluid Micro-Animations:** Motion animations with viewport-triggered reveals, spring transitions, and interactive gesture feedback.

---

## 🛠 Tech Stack

- **UI Framework:** React 19 (Functional Components, Hooks)
- **Language:** TypeScript 5.8
- **Build Tooling:** Vite 6
- **Styling:** Tailwind CSS 4
- **Animation:** Motion (`motion/react`)
- **Icons:** Lucide React
- **Deployment:** GitHub Pages via GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

Ensure [Node.js](https://nodejs.org/) (version 20 or higher) and `npm` are installed on your machine.

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/maison-levain-bakery.git
   cd maison-levain-bakery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To compile the application into optimized static assets:

```bash
npm run build
```

The output files will be generated in the `dist/` directory. You can preview the production bundle locally:

```bash
npm run preview
```

---

## 🌐 1-Click GitHub Pages Deployment

This repository includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### Deployment Steps:
1. Push this repository to GitHub (branch `main` or `master`).
2. In your GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every push to `main` or `master` (or manual trigger via `workflow_dispatch`) will automatically test, compile, and publish the live storefront with zero manual intervention.
4. The SPA fallback handler (`public/404.html`) automatically handles route reloads and subpath hosting without 404 errors.

---

## 📄 License

Private & proprietary — created for Maison Levain. All rights reserved.
