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
    <div className="flex">
      <ul className="hidden min-h-full w-56 flex-shrink-0 border-r p-4 lg:menu">
        {docsPages.map((page: docsPage) => (
          <li key={page.name}>
            <Link href={page.href}>{page.name}</Link>
          </li>
        ))}
      </ul>
      <div className="w-full py-4 lg:p-4">{children}</div>
    </div>
  );
}
