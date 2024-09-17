import React from "react";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { User, Shield } from "lucide-react";

const replaceUnderscoresWithSpaces = (input: string): string => input.replace(/_/g, " ");

interface ResidentButtonProps {
  item: {
    UUID: string;
    name: string;
    town?: {
      name: string;
    };
  };
  showTown?: boolean;
  showMayor?: boolean;
}

export default function ResidentButton({ item, showTown = false, showMayor = false }: ResidentButtonProps) {
  return (
    <Link
      href={`/residents/${item.UUID}`}
      className={twMerge("btn btn-lg btn-block flex justify-between bg-gradient-to-r from-base-200 to-green-200")}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Image
          src={`https://crafatar.com/avatars/${item.UUID}?size=32&default=MHF_Steve&overlay`}
          alt={`${item.name}'s Minecraft Face`}
          height={32}
          width={32}
          className="size-8 shrink-0"
        />
        <div className="min-w-0 flex-1 text-left">
          <span className="truncate">
            {replaceUnderscoresWithSpaces(item.name)}
            {showMayor && " (Mayor)"}
          </span>
          {showTown && item.town && (
            <p className="truncate text-sm font-normal text-base-content/70">{replaceUnderscoresWithSpaces(item.town.name)}</p>
          )}
        </div>
      </div>
      {showMayor ? <Shield className="shrink-0" /> : <User className="shrink-0" />}
    </Link>
  );
}
