import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Building2, Landmark, Shield, User } from "lucide-react";

const replaceUnderscoresWithSpaces = (input: string): string => input.replace(/_/g, " ");

interface TownButtonProps {
  item: {
    UUID: string;
    name: string;
  };
  showCapital?: boolean;
}

export default function TownButton({ item, showCapital = false }: TownButtonProps) {
  return (
    <Link
      href={`/towns/${item.UUID}`}
      className={twMerge("btn btn-lg btn-block justify-between bg-gradient-to-r from-base-200 to-blue-200")}
    >
      <div className="flex items-center gap-4">
        {replaceUnderscoresWithSpaces(item.name)}
        {showCapital && " (Capital)"}
      </div>
      {showCapital ? <Landmark className="shrink-0" /> : <Building2 className="shrink-0" />}
    </Link>
  );
}
