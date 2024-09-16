"use client";

import { Search, ChevronDown, Flag, Building2, Users } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar({ placeholder }: { placeholder: string }): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <label className="input input-bordered flex w-full items-center gap-2">
      <Search className="flex-shrink-0 opacity-70" />
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        defaultValue={searchParams.get("material")?.toString()}
        aria-label={placeholder}
        onChange={(e) => handleChange("material", e.target.value)}
        className="w-full min-w-0"
      />
    </label>
  );
}
