import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drag and Drop",
  description: "An interview test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`sm:bg-black ${inter.className}`}>{children}</body>
    </html>
  );
}




