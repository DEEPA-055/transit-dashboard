🚇 TransitFlow – Urban Transit Dashboard

A modern, web-based transit analytics dashboard built with Next.js and TypeScript.
The application visualizes urban transit data including ridership trends, route performance, congestion levels, and predictive insights through interactive charts and map visualizations.

🔗 Live Demo:
https://transitdashboard-e933ueq3a-deepa-055s-projects.vercel.app

📌 Project Overview

TransitFlow provides a structured and interactive interface to analyze public transport systems. It demonstrates:

Data visualization using charts

Route performance analytics

Predictive ridership insights

Interactive route mapping

Responsive modern UI design

This project simulates a real-world transit intelligence platform used by city planners and transit authorities.

✨ Features
📊 Dashboard Overview

Total ridership statistics

Average delay metrics

Efficiency score indicators

Carbon savings tracking

🗺 Route Analysis

Route-specific performance details

Congestion level insights

24-hour ridership trend visualization

Route path visualization on map

Predictive next-hour load estimation

📈 Analytics Page

Performance trends

AI-based ridership predictions

Confidence indicators

Data-driven recommendations

🧭 Planning Page

Strategic transit planning insights

Performance comparison indicators

Optimization suggestions

🛡 UX Improvements

Loading states

Error handling

Fallback UI when data or API key is missing

Fully responsive charts

🛠 Tech Stack
Frontend

Next.js 16 (App Router)

React

TypeScript

Visualization

Recharts (Area charts, trend graphs)

Google Maps API (Route visualization)

Styling

Tailwind CSS (utility-based styling)

Custom dark theme design

Deployment

Vercel

CI/CD via GitHub integration

📷 Screenshots

Add screenshots inside a folder like:

/public/screenshots/

Then reference them:

## Dashboard Preview

![Dashboard](public/screenshots/dashboard.png)

## Route Analysis Page

![Routes](public/screenshots/routes.png)

Screenshots significantly improve project presentation.

🚀 Getting Started (Run Locally)

Clone the repository:

git clone https://github.com/DEEPA-055/transit-dashboard.git
cd transit-dashboard

Install dependencies:

npm install

Run development server:

npm run dev

Open in browser:

http://localhost:3000
🔐 Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

If no API key is provided, the map component will display a fallback message instead of crashing.

🌍 Deployment

This project is deployed using Vercel.

Every push to the main branch automatically triggers a production deployment.

Live URL:
https://transitdashboard-e933ueq3a-deepa-055s-projects.vercel.app

📈 Future Improvements

Replace Google Maps with OpenStreetMap (no API dependency)

Add real-time API integration

Add authentication & role-based dashboard

Export analytics reports (PDF/CSV)

Add performance monitoring (Vercel Analytics)

🤝 Contributing

Contributions are welcome.

Fork the repository

Create a new branch

Commit your changes

Open a pull request

👩‍💻 Author

Deepa Chaudhary
Computer Science & Engineering Student
Focused on Web Development, AI-driven Systems & Data Visualization

GitHub: https://github.com/DEEPA-055