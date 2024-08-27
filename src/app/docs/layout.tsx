import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs",
};

interface docsPage {
  name: string;
  href: string;
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
    name: "Voting",
    href: "/docs/voting",
  },
  {
    name: "Custom Recipes",
    href: "/docs/recipes",
  },
] satisfies docsPage[];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">{children}</div>
      <div className="drawer-side border-r">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu w-56 p-4 text-base-content">
          {docsPages.map((doc) => (
            <li key={doc.name}>
              <Link href={doc.href}>{doc.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
