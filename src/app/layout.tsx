import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import ThemeWrapper from "@/components/themeWrapper";

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
      <ThemeWrapper>
        <body style={{marginTop: "75px"}}>
          <header>
            <Navbar />
          </header>
          {children}
        </body>
      </ThemeWrapper>

    </html>
  );
}
