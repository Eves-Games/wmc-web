"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader } from "lucide-react";

export function SearchForm({
  initialSearchTerm,
  entityType,
}: {
  initialSearchTerm: string;
  entityType: "residents" | "towns" | "nations";
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    performSearch();
  };

  const performSearch = () => {
    if (searchTerm.trim()) {
      startTransition(() => {
        router.push(`/${entityType}?page=1&search=${encodeURIComponent(searchTerm.trim())}`);
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="input input-bordered flex w-full items-center gap-2">
        <input
          type="text"
          name="search"
          className="grow"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Search"
        />
        {isPending ? (
          <Loader className="size-4 animate-spin opacity-70" />
        ) : (
          <Search className="size-4 cursor-pointer opacity-70" onClick={performSearch} aria-label="Submit search" />
        )}
      </label>
    </form>
  );
}
