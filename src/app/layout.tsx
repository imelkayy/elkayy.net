import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "elkayy.net",
  description: "A website containing elkayy's modding projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{marginTop: "75px"}}>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
