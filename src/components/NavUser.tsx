import { Building2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { LinkHref } from "./Nav";
import Image from "next/image";
import { getResident } from "@/bridge";

interface NavUserProps {
  uuid: string;
  username: string;
}

export async function NavUser({ uuid, username }: NavUserProps) {
  const resident = await getResident(uuid);

  const UserLinks = [
    ...(resident.town
      ? [
          {
            name: "My Town",
            href: `/towns/${resident.town.UUID}`,
            icon: <Building2 className="size-5" />,
          },
        ]
      : []),
    {
      name: "My Resident",
      href: `/residents/${resident.UUID}`,
      icon: <User className="size-5" />,
    },
  ] satisfies Array<LinkHref>;

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost">
        {username}
        <Image
          src={`https://crafatar.com/avatars/${uuid}?size=20&default=MHF_Steve&overlay`}
          alt={`${username}'s Face`}
          width={20}
          height={20}
          className="size-5"
        />
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-300 shadow"
      >
        {UserLinks.map((LinkHref) => (
          <li key={LinkHref.name}>
            <Link href={LinkHref.href} className="justify-between">
              {LinkHref.name}
              {LinkHref.icon}
            </Link>
          </li>
        ))}
        <li>
          <button className="justify-between">
            Log Out
            <LogOut className="size-5" />
          </button>
        </li>
      </ul>
    </div>
  );
}
