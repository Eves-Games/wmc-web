import Link from "next/link";
import Image from "next/image";
import { Building2, Map, Menu, Scroll, Store, Vote } from "lucide-react";
import { ReactNode } from "react";
import { NavUser } from "@/components/NavUser";
import DiscordLogo from "./DiscordLogo";
import { getAuthenticatedUser } from "@/auth";

export interface LinkHref {
  name: string;
  href: string;
  target?: string;
  icon: ReactNode;
}

const NavLinks = [
  {
    name: "Discord",
    target: "_blank",
    href: "https://discord.gg/g4stgqxahv",
    icon: <DiscordLogo className="size-5 fill-neutral" />,
  },
  {
    name: "Towns",
    href: "/towns",
    icon: <Building2 className="size-5" />,
  },
  {
    name: "Map",
    target: "_blank",
    href: "http://map.worldmc.net",
    icon: <Map className="size-5" />,
  },
  {
    name: "Vote",
    href: "/vote",
    icon: <Vote className="size-5" />,
  },
  {
    name: "Store",
    target: "_blank",
    href: "https://worldmc-710.tebex.io/",
    icon: <Store className="size-5" />,
  },
  {
    name: "Rules",
    href: "/rules",
    icon: <Scroll className="size-5" />,
  },
] satisfies Array<LinkHref>;

export default async function Nav() {
  const user = getAuthenticatedUser();

  return (
    <nav className="navbar">
      <ul className="menu navbar-start menu-horizontal flex-nowrap items-center gap-2 py-0">
        <Link href="/" className="btn btn-ghost">
          <Image
            src={"/worldmc.png"}
            alt="WorldMC Icon"
            className="size-6"
            width={100}
            height={100}
          />
          <h1 className="text-xl font-black">WorldMC</h1>
        </Link>
        <div className="dropdown-start dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <Menu className="size-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 p-2 shadow"
          >
            {NavLinks.map((LinkHref) => (
              <li key={LinkHref.name}>
                <Link href={LinkHref.href} target={LinkHref.target} className="justify-between">
                  {LinkHref.name}
                  {LinkHref.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {NavLinks.map((LinkHref) => (
          <li key={LinkHref.name} className="hidden lg:block">
            <Link href={LinkHref.href} target={LinkHref.target}>{LinkHref.name}</Link>
          </li>
        ))}
      </ul>
      <div className="navbar-end">
        {user ? (
          <NavUser {...user} />
        ) : (
          <label htmlFor="sign_in_modal" className="btn btn-ghost">
            Sign in
            <Image
              src={"/minecraft.svg"}
              alt="Minecraft Icon"
              height={20}
              width={20}
              className="size-5"
            />
          </label>
        )}
      </div>
    </nav>
  );
}
