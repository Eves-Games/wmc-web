import { Building2, CircleUser, Flag, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getResident } from "@/bridge";

interface NavUserProps {
  uuid: string;
  username: string;
}

export async function NavUser({ uuid, username }: NavUserProps) {
  const resident = await getResident(uuid);

  const UserLinks = [
    {
      name: "Resident",
      href: `/residents/${resident.UUID}`,
      icon: <User className="size-5" />,
    },
    ...(resident.town ? [
      {
        name: "Town",
        href: `/towns/${resident.town.UUID}`,
        icon: <Building2 className="size-5" />,
      },
    ] : []),
    ...(resident.nation
      ? [
        {
          name: "Nation",
          href: `/nations/${resident.nation.UUID}`,
          icon: <Flag className="size-5" />,
        },
      ]
      : []),
  ];

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn">
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
      >
        <li>
          <details>
            <summary>
              <CircleUser className="size-5" />
              Myself
            </summary>
            <ul>
              {UserLinks.map((LinkHref) => (
                <li key={LinkHref.name}>
                  <Link href={LinkHref.href}>
                    {LinkHref.icon}
                    {LinkHref.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
        <li>
          <button>
            <LogOut className="size-5" />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}
