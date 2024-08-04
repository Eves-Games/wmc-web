import { getAuthenticatedUser } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { NavUser } from "./NavUser";
import { Menu } from "lucide-react";

interface MenuLink {
  name: string;
  href: string | null;
  target: string | null;
  subMenu?: MenuLink[];
}

const menuLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/g4stgqxahv",
    target: "_blank",
  },
  {
    name: "Explore",
    href: null,
    target: null,
    subMenu: [
      {
        name: "Residents",
        href: "/residents",
        target: "",
      },
      {
        name: "Towns",
        href: "/towns",
        target: "",
      },
      {
        name: "Nations",
        href: "/nations",
        target: "",
      },
    ],
  },
  {
    name: "Store",
    href: "https://worldmc-710.tebex.io/",
    target: "_blank",
  },
] satisfies MenuLink[];

export default async function Nav() {
  const user = getAuthenticatedUser();

  return (
    <div className="navbar rounded-box bg-base-100 shadow">
      <div className="flex-1 lg:flex-none">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="size-5" />
          </div>
          <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg">
            {menuLinks.map((menuLink) =>
              menuLink.subMenu ? (
                <li key={menuLink.name}>
                  <details>
                    <summary>{menuLink.name}</summary>
                    <ul>
                      {menuLink.subMenu.map((subMenuLink) => (
                        <li key={subMenuLink.name}>
                          <Link href={subMenuLink.href} target={subMenuLink.target}>
                            {subMenuLink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={menuLink.name}>
                  <Link href={menuLink.href} target={menuLink.target}>
                    {menuLink.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          <Image src={"/worldmc.png"} alt="WorldMC Icon" className="size-6" width={100} height={100} />
          WorldMC
        </Link>
      </div>
      <div className="hidden flex-1 lg:flex">
        <ul className="menu menu-horizontal p-0">
          {menuLinks.map((menuLink) =>
            menuLink.subMenu ? (
              <li key={menuLink.name}>
                <details>
                  <summary>{menuLink.name}</summary>
                  <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg">
                    {menuLink.subMenu.map((subMenuLink) => (
                      <li key={subMenuLink.name}>
                        <Link href={subMenuLink.href} target={subMenuLink.target}>
                          {subMenuLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={menuLink.name}>
                <Link href={menuLink.href} target={menuLink.target}>
                  {menuLink.name}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="flex-none">
        {user ? (
          <NavUser {...user} />
        ) : (
          <label htmlFor="sign_in_modal" className="btn">
            Sign in
            <Image src={"/minecraft.svg"} alt="Minecraft Icon" height={20} width={20} className="size-5" />
          </label>
        )}
      </div>
    </div>
  );
}
