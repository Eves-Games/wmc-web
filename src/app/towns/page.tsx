import React from 'react';
import { getAuthenticatedUser } from "@/auth";
import { getTowns, getResident } from "@/bridge";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { SearchForm } from '../nations/components/SearchForm';
import { PaginationControls } from '../nations/components/PaginationControls';

export const revalidate = 900;

async function fetchTownsData(page: number, searchTerm: string = '') {
  'use server'
  const towns = await getTowns(page);
  const user = getAuthenticatedUser();
  const resident = user ? await getResident(user.uuid) : null;

  const filteredTowns = searchTerm
    ? towns.data.filter(town => town.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : towns.data;

  return { towns: { ...towns, data: filteredTowns }, user, resident };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const searchTerm = searchParams.search || '';

  const { towns, user, resident } = await fetchTownsData(page, searchTerm);

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-5xl font-black">Towns</h1>
      <div className="flex gap-2 justify-center">
        <SearchForm initialSearchTerm={searchTerm} />
        {resident && resident.town &&
          <Link href={`/towns/${resident.town.UUID}`} className="btn btn-outline">
            <Building2 /> My Town
          </Link>
        }
      </div>
      <div className="space-y-2">
        {towns.data.map((town) => (
          <Link
            href={`/towns/${town.UUID}`}
            className="btn btn-lg btn-block justify-start"
            key={town.UUID}
          >
            {town.name}
          </Link>
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={towns.totalPages} searchTerm={searchTerm} />
    </section>
  );
}