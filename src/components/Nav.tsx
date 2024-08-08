import Image from "next/image";
import Link from "next/link";
import { Menu, Search, Store, Vote } from "lucide-react";
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
    icon: <DiscordLogo className="size-6 md:hidden" />,
  },
  {
    name: "Explore",
    href: "/explore",
    target: "",
    icon: <Search className="md:hidden" />,
  },
  {
    name: "Vote",
    href: "/vote",
    target: "",
    icon: <Vote className="md:hidden" />,
  },
  {
    name: "Store",
    href: "https://worldmc-710.tebex.io/",
    target: "_blank",
    icon: <Store className="md:hidden" />,
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
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <Menu className="size-5" />
          </div>
          <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          <Image src={"/worldmc.png"} alt="WorldMC Icon" className="size-6" width={100} height={100} />
          WorldMC
        </Link>
      </div>
      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal p-0">{navLinks}</ul>
      </div>
    </div>
  );
}
