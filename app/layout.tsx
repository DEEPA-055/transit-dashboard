import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

export const metadata: Metadata = {
  title: 'Urban Transit Dashboard',
  description: 'Smart City Transit Analytics for India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
            <TopBar />
            <main style={{ flex: 1, padding: '30px', backgroundColor: 'var(--color-background-dark)' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
