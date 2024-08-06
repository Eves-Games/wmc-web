import React, { Suspense } from "react";
import { getNations } from "@/bridge";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { PaginationControls } from "@/components/PaginationControls";

export const revalidate = 900;

async function fetchNationsData(page: number, searchTerm: string = "") {
  "use server";
  return await getNations(page, searchTerm);
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle className="size-16 animate-spin opacity-70" />
    </div>
  );
}

async function NationsList({ page, searchTerm }: { page: number; searchTerm: string }) {
  const nations = await fetchNationsData(page, searchTerm);

  return (
    <>
      <div className="space-y-2">
        {nations.data.map((nation) => (
          <Link href={`/nations/${nation.UUID}`} className="btn btn-lg btn-block justify-start" key={nation.UUID}>
            {nation.name}
          </Link>
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={nations.totalPages} searchTerm={searchTerm} entityType="nations" />
    </>
  );
}

export default async function Page({ searchParams }: { searchParams: { page?: string; search?: string } }) {
  const page = parseInt(searchParams.page || "1", 10);
  const searchTerm = searchParams.search || "";

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-5xl font-black">Nations</h1>
      <SearchForm initialSearchTerm={searchTerm} entityType="nations" />
      <Suspense fallback={<LoadingSpinner />}>
        <NationsList page={page} searchTerm={searchTerm} />
      </Suspense>
    </section>
  );
}
