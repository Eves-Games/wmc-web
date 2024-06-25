import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { SignInModal } from "@/components/modals/SignIn";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "WorldMC",
  description: "WorldMC is ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          rubik.className,
          "mx-auto grid h-screen max-w-screen-xl grid-rows-[auto_1fr_auto] px-8",
        )}
      >
        <Nav />
        <SignInModal />
        {children}
        <Footer />
      </body>
    </html>
  );
}
