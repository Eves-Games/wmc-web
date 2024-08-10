import Image from "next/image";
import Link from "next/link";
import { Map, Menu, Search, Store, Vote } from "lucide-react";
import DiscordLogo from "@/components/DiscordLogo";
import { ReactNode } from "react";

interface MenuLink {
  name: string;
  href: string;
  target: string;
  icon: ReactNode;
}

const menuLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/g4stgqxahv",
    target: "_blank",
    icon: <DiscordLogo className="size-6 sm:hidden" />,
  },
  {
    name: "Explore",
    href: "/explore",
    target: "",
    icon: <Search className="sm:hidden" />,
  },
  {
    name: "Vote",
    href: "/vote",
    target: "",
    icon: <Vote className="sm:hidden" />,
  },
  {
    name: "Map",
    href: "https://map.worldmc.net",
    target: "",
    icon: <Map className="sm:hidden" />,
  },
  {
    name: "Store",
    href: "https://worldmc-710.tebex.io/",
    target: "_blank",
    icon: <Store className="sm:hidden" />,
  },
] satisfies MenuLink[];

const navLinks = menuLinks.map((menuLink) => (
  <li key={menuLink.name}>
    <Link className="flex justify-between" href={menuLink.href} target={menuLink.target}>
      {menuLink.name}
      {menuLink.icon}
    </Link>
  </li>
));

export default function Nav() {
  return (
    <div className="navbar rounded-box bg-base-100 shadow">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">
          <Image src={"/worldmc.png"} alt="WorldMC Icon" className="size-6" width={100} height={100} />
          WorldMC
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal hidden p-0 sm:flex">{navLinks}</ul>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
            <Menu className="size-5" />
          </div>
          <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}
