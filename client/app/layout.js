import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import State from "./Context/State";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <State>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </State>
    </html>
  );
}
