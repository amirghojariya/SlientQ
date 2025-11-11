
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
      <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
      </AuthProvider>
        </body>
    </html>

  );
}
