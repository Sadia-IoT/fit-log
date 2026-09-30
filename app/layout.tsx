import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PlanProvider } from "@/components/PlanContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library and Planning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          {children}
           <ToastContainer position="top-right" />
           <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}