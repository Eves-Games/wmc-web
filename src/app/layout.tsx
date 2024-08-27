import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://worldmc.net"),
  title: {
    default: "WorldMC",
    template: "%s - WorldMC",
  },
  description:
    "Explore a 1:1000 Earth map in Minecraft. Build empires, engage in politics, and shape the global economy in this immersive, player-driven world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(rubik.className, "mx-auto h-screen max-w-screen-xl px-4")}>
        <div className="min-h-screen">
          <Nav />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
