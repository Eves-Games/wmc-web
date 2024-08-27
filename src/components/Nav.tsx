import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { ReactNode } from "react";

interface MenuLink {
  name: string;
  href: string;
  target: string;
  icon?: ReactNode;
}

const menuLinks = [
  {
    name: "Explore",
    href: "/explore",
    target: "",
  },
  {
    name: "Docs",
    href: "/docs",
    target: "",
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
    href: "https://discord.gg/g4stgqxahv",
    target: "_blank",
    icon: <ExternalLink className="size-4" />,
  },
] satisfies MenuLink[];

const navLinks = menuLinks.map((menuLink) => (
  <li key={menuLink.name}>
    <Link href={menuLink.href} target={menuLink.target}>
      {menuLink.name}
      {menuLink.icon}
    </Link>
  </li>
));

export default function Nav() {
  return (
    <div className="navbar border-b">
      <div className="flex-0">
        <Link className="btn btn-ghost text-xl" href="/">
          <Image src={"/worldmc.png"} alt="WorldMC Icon" className="size-6" width={100} height={100} />
          <span className="hidden lg:block">WorldMC</span>
        </Link>
      </div>
      <div className="flex-1">
        <ul className="menu menu-horizontal hidden p-0 md:flex">{navLinks}</ul>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <Menu className="size-5" />
          </div>
          <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            {navLinks}
          </ul>
        </div>
      </div>
      <Link href="/docs/ip" className="btn btn-primary btn-sm">
        play.WorldMC.net
        <div className="badge">1.21.x</div>
      </Link>
    </div>
  );
}
