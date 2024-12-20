import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "../../ContextAPI/GlobalContext"; // Import GlobalProvider
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Room Booking Admin",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
        </GlobalProvider>
      </body>
    </html>
  );
}
