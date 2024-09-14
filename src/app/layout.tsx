import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Menu } from "lucide-react";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
});

interface MenuLink {
  name: string;
  href: string;
  target?: string;
  icon?: ReactNode;
  subLinks?: MenuLink[];
}

const docsPages = [
  {
    name: "Introduction",
    href: "/docs",
  },
  {
    name: "Joining the Server",
    href: "/docs/ip",
  },
  {
    name: "Vote",
    href: "/docs/vote",
  },
  {
    name: "Custom Recipes",
    href: "/docs/recipes",
  },
  {
    name: "Server Rules",
    href: "/docs/rules",
  },
] satisfies MenuLink[];

const menuLinks = [
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "Docs",
    href: "/docs",
    subLinks: docsPages,
  },
  {
    name: "Map",
    href: "https://map.worldmc.net",
    target: "_blank",
    icon: <ExternalLink className="size-4" />,
  },
  {
    name: "Store",
    href: "https://worldmc-710.tebex.io/",
    target: "_blank",
    icon: <ExternalLink className="size-4" />,
  },
  {
    name: "Discord",
    href: "https://discord.gg/JRMYBhDbBb",
    target: "_blank",
    icon: <ExternalLink className="size-4" />,
  },
] satisfies MenuLink[];

const navLinks = menuLinks.map((menuLink) => (
  <li key={menuLink.name} className="relative">
    {menuLink.subLinks ? (
      <>
        <Link href={menuLink.subLinks[0].href} className="hidden lg:inline-block" target={menuLink.target || ""}>
          {menuLink.name}
          {menuLink.icon}
        </Link>
        <details className="lg:hidden" open>
          <summary>{menuLink.name}</summary>
          <ul className="pl-4">
            {menuLink.subLinks.map((subLink) => (
              <li key={subLink.name}>
                <Link href={subLink.href}>{subLink.name}</Link>
              </li>
            ))}
          </ul>
        </details>
      </>
    ) : (
      <Link href={menuLink.href} target={menuLink.target || ""}>
        {menuLink.name}
        {menuLink.icon}
      </Link>
    )}
  </li>
));

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
      <body className={twMerge(rubik.className, "mx-auto max-w-screen-xl px-4")}>
        <div className="drawer min-h-screen">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="navbar border-b">
              <div className="flex-none lg:hidden">
                <label htmlFor="nav-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <Menu className="size-5" />
                </label>
              </div>
              <Link className="btn btn-ghost text-xl" href="/">
                <Image src={"/worldmc.png"} alt="WorldMC Icon" className="size-6" width={100} height={100} />
                <span className="hidden lg:block">WorldMC</span>
              </Link>
              <div className="flex-1">
                <ul className="menu menu-horizontal hidden p-0 lg:flex">{navLinks}</ul>
              </div>
              <Link href="/docs/ip" className="btn btn-primary btn-sm">
                play.WorldMC.net
                <div className="badge">1.21.x</div>
              </Link>
            </div>
            {children}
          </div>
          <div className="drawer-side">
            <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu min-h-full w-80 gap-2 bg-base-100 px-4">
              <Link className="btn btn-ghost w-fit text-xl" href="/">
                <Image src={"/worldmc.png"} alt="WorldMC Icon" className="size-6" width={100} height={100} />
                WorldMC
              </Link>
              <hr />
              <div>{navLinks}</div>
            </ul>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
