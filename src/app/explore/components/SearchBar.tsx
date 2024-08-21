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

  const currentFilter = searchParams.get("filter");

  return (
    <div className="flex items-center justify-center gap-2">
      <label className="input input-bordered flex w-full items-center gap-2">
        <Search className="flex-shrink-0 opacity-70" />
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          defaultValue={searchParams.get("query")?.toString()}
          aria-label={placeholder}
          onChange={(e) => handleChange("query", e.target.value)}
          className="w-full min-w-0"
        />
      </label>
      <div className="dropdown dropdown-end flex-none">
        <button tabIndex={0} className="btn">
          {currentFilter || "Nations"} <ChevronDown />
        </button>
        <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
          <li onClick={() => handleChange("filter", "Nations")}>
            <a className="flex justify-between">
              Nations <Flag />
            </a>
          </li>
          <li onClick={() => handleChange("filter", "Towns")}>
            <a className="flex justify-between">
              Towns <Building2 />
            </a>
          </li>
          <li onClick={() => handleChange("filter", "Residents")}>
            <a className="flex justify-between">
              Residents <Users />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
