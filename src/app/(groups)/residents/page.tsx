import React from "react";
import { getResidents } from "@/bridge";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { PaginationControls } from "@/components/PaginationControls";

export const revalidate = 900;

async function fetchResidentsData(page: number, searchTerm: string = "") {
  "use server";
  const residents = await getResidents(page);

  const filteredResidents = searchTerm
    ? residents.data.filter((resident) => resident.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : residents.data;

  return { residents: { ...residents, data: filteredResidents } };
}

export default async function Page({ searchParams }: { searchParams: { page?: string; search?: string } }) {
  const page = parseInt(searchParams.page || "1", 10);
  const searchTerm = searchParams.search || "";

  const { residents } = await fetchResidentsData(page, searchTerm);

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-5xl font-black">Residents</h1>
      <SearchForm initialSearchTerm={searchTerm} entityType="residents" />
      <div className="space-y-2">
        {residents.data.map((resident) => (
          <Link href={`/residents/${resident.UUID}`} className="btn btn-lg btn-block justify-start" key={resident.UUID}>
            {resident.name}
          </Link>
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={residents.totalPages} searchTerm={searchTerm} entityType="residents" />
    </section>
  );
}
