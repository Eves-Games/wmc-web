import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Flag } from "lucide-react";

const replaceUnderscoresWithSpaces = (input: string): string => input.replace(/_/g, " ");

interface NationButtonProps {
  item: {
    UUID: string;
    name: string;
  };
  showRelation?: "ally" | "enemy";
}

export default function NationButton({ item, showRelation }: NationButtonProps) {
  const getBackgroundClass = () => {
    switch (showRelation) {
      case "ally":
        return "from-green-200 to-violet-200";
      case "enemy":
        return "from-red-200 to-violet-200";
      default:
        return "from-base-200 to-violet-200";
    }
  };

  return (
    <Link href={`/nations/${item.UUID}`} className={twMerge("btn btn-lg btn-block justify-between bg-gradient-to-r", getBackgroundClass())}>
      <div className="flex items-center gap-4">{replaceUnderscoresWithSpaces(item.name)}</div>
      <Flag />
    </Link>
  );
}
