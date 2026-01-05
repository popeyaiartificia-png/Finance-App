# FinanceApp - Personal Banking Web Application

A comprehensive personal finance banking application built with React, Tailwind CSS, and modern glassmorphism UI design.

![FinanceApp Preview](https://via.placeholder.com/800x400/0f172a/10b981?text=FinanceApp+Preview)

## ✨ Features

### Authentication

- Login/Signup toggle with smooth transitions
- User and Admin role differentiation
- Persistent sessions using localStorage

### User Dashboard

- **Balance Overview**: Total Balance, Monthly Income, Monthly Expenses
- **Transaction History**: Searchable and filterable table
- **Spending Charts**: Visual breakdown by category (Recharts)
- **Quick Actions**: Add Transaction, Transfer Funds

### Admin Panel

- **User Management**: View all users, freeze/unfreeze accounts
- **Transaction Approval**: Approve or reject pending transfers
- **System Analytics**: Total liquidity, user count, transaction volume

### Design

- 🌙 Dark mode by default
- 💎 Glassmorphism UI with blur effects
- 💚 Emerald green (#10b981) accent color
- 📱 Fully responsive (mobile-first)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/finance-app.git
cd finance-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Credentials

| Role  | Email                   | Password  |
|-------|-------------------------|-----------|
| Admin | <admin@financeapp.com>    | admin123  |
| User  | <user@financeapp.com>     | user123   |

## 📦 Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router 7** - Navigation
- **Zustand** - State management
- **Recharts** - Charts
- **Lucide React** - Icons

## 🌐 Deploy to GitHub Pages

### Option 1: GitHub Actions (Automatic)

1. Push your code to GitHub
2. Go to **Settings** → **Pages**
3. Under "Build and deployment", select **GitHub Actions**
4. Create `.github/workflows/deploy.yml` (already included)
5. Push to `main` branch - deployment will trigger automatically

### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Preview locally
npm run preview

# Deploy to GitHub Pages (requires gh-pages package)
npm install -D gh-pages
npx gh-pages -d dist
```

### GitHub Actions Workflow

The included `.github/workflows/deploy.yml` handles:

- Installing dependencies
- Building the project
- Deploying to GitHub Pages

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin panel components
│   ├── auth/           # Authentication forms
│   ├── dashboard/      # Dashboard components
│   ├── layout/         # Layout, Sidebar
│   └── ui/             # Reusable UI components
├── pages/              # Route pages
├── store/              # Zustand stores
├── utils/              # Constants, localStorage helpers
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles + Tailwind
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📝 License

MIT License - feel free to use this project for learning or personal use.

---

Built with ❤️ using React and Tailwind CSS
