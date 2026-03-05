# 🚇 TransitFlow – Urban Transit Dashboard

A modern, web-based transit analytics dashboard built with Next.js and TypeScript.
The application visualizes urban transit data including ridership trends, route performance, congestion levels, and predictive insights through interactive charts and map visualizations.

🔗 **Live Demo**: [TransitFlow Live](https://transitdashboard-e933ueq3a-deepa-055s-projects.vercel.app)

## ✨ Features

- **🛡️ Secure Authentication**: A robust login and signup system with real-time validation and account protection.
- **🌓 Dynamic Theming**: Seamlessly switch between **Dark** and **Light** modes with a single click. Your preference is automatically persisted.
- **📍 Smart Navigation**: An interactive Sidebar and TopBar system for effortless access to all dashboard modules.
- **📊 Real-time Analytics**: Visual representation of ridership data, cost analysis, and system efficiency.
- **🔔 Interactive Notifications**: Stay updated with real-time transit alerts and system milestones through the integrated notification system.
- **🔒 Session Persistence**: "Remember Me" functionality allows for flexible session management—choose between persistent login or per-session security.
- **⚠️ Intelligent Feedback**: Custom alert modals for new users and clear error handling for a smooth user experience.
- **🗺️ Route Analysis**: Route-specific performance details, congestion level insights, and interactive map visualization.

## 🛠️ Technology Stack

- **Core**: [Next.js 14+](https://nextjs.org) (App Router), React 18, TypeScript
- **Icons**: [Lucide React](https://lucide.dev)
- **Styling**: Vanilla CSS with modern CSS Variables for multi-theme support
- **Visualization**: [Recharts](https://recharts.org)
- **Maps**: Google Maps API (with safe fallback UI)
- **Deployment**: [Vercel](https://vercel.com)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/DEEPA-055/transit-dashboard.git
cd transit-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the dashboard.

## 📁 Project Structure

- `/app`: Next.js App Router routes and layouts.
- `/components`: Reusable UI components (Sidebar, TopBar, StatCards, etc.).
- `/context`: Global state management for Authentication and Theming.
- `/data`: Mock transit data and system constants.
- `/public`: Static assets and icons.

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository, create a new feature branch, and open a pull request.

## 👩‍💻 Author

**Deepa Chaudhary**  
Computer Science & Engineering Student  
Focused on Web Development, AI-driven Systems & Data Visualization

GitHub: [DEEPA-055](https://github.com/DEEPA-055)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
