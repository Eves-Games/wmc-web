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
    template: "WorldMC - %s",
  },
  description:
    "Explore a 1:1000 Earth map in Minecraft. Build empires, engage in politics, and shape the global economy in this immersive, player-driven world. With support for up to 500 players, enhanced Towny plugin, and a player-run gold economy, WorldMC offers unparalleled opportunities for adventure, leadership, and economic strategy in a bustling Minecraft community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(rubik.className, "mx-auto grid h-screen max-w-screen-xl grid-rows-[auto_1fr_auto] space-y-4 p-4")}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
