import React from "react";
import { getTowns } from "@/bridge";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { PaginationControls } from "@/components/PaginationControls";

export const revalidate = 900;

async function fetchTownsData(page: number, searchTerm: string = "") {
  "use server";
  const towns = await getTowns(page);

  const filteredTowns = searchTerm ? towns.data.filter((town) => town.name.toLowerCase().includes(searchTerm.toLowerCase())) : towns.data;

  return { towns: { ...towns, data: filteredTowns } };
}

export default async function Page({ searchParams }: { searchParams: { page?: string; search?: string } }) {
  const page = parseInt(searchParams.page || "1", 10);
  const searchTerm = searchParams.search || "";

  const { towns } = await fetchTownsData(page, searchTerm);

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-5xl font-black">Towns</h1>
      <SearchForm initialSearchTerm={searchTerm} entityType="towns" />
      <div className="space-y-2">
        {towns.data.map((town) => (
          <Link href={`/towns/${town.UUID}`} className="btn btn-lg btn-block justify-start" key={town.UUID}>
            {town.name}
          </Link>
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={towns.totalPages} searchTerm={searchTerm} entityType="towns" />
    </section>
  );
}
