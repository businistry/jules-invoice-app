# Automation & Invoice Processing Mobile App

A high-fidelity mobile-first React application for managing invoice extraction, batch processing, and GL coding.

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm (v11 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

## 🛠 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Navigation:** [React Router 7](https://reactrouter.com/)
- **Icons:** Material Icons & Material Symbols
- **Fonts:** [Manrope](https://fonts.google.com/specimen/Manrope)

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # Structural components (MobileContainer, BottomNav)
│   └── ui/           # Reusable UI primitives (Button, Badge, Toggle)
├── context/          # State management (AppContext, AppProvider)
├── pages/            # Screen components (Dashboard, BatchOverview, etc.)
├── types/            # TypeScript interface definitions
└── App.tsx           # Routing configuration
```

## 📱 Features

- **Dashboard:** Overview of pending approvals and recent batches with processing progress.
- **Batch Overview:** Detailed list of invoices within a batch with status-based filtering.
- **Invoice Review:** Scanned document viewer with virtual GL coding stamps and confidence indicators.
- **Automation Settings:** Fine-tune engine sensitivity and document output parameters.

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory. You can preview the production build locally:

```bash
npm run preview
```

## 🧪 Quality Control

- **Linting:** `npm run lint`
- **Type Checking:** `tsc -b`
