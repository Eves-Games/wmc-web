import React from 'react';
import { getAuthenticatedUser } from "@/auth";
import { getResident, getResidents } from "@/bridge";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchForm } from '../nations/components/SearchForm';
import { PaginationControls } from '../nations/components/PaginationControls';

export const revalidate = 900;

async function fetchResidentsData(page: number, searchTerm: string = '') {
    'use server'
    const residents = await getResidents(page);
    const user = getAuthenticatedUser();
    const resident = user ? await getResident(user.uuid) : null;

    const filteredResidents = searchTerm
        ? residents.data.filter(resident => resident.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : residents.data;

    return { residents: { ...residents, data: filteredResidents }, user, resident };
}

export default async function Page({
    searchParams,
}: {
    searchParams: { page?: string; search?: string };
}) {
    const page = parseInt(searchParams.page || '1', 10);
    const searchTerm = searchParams.search || '';

    const { residents, user, resident } = await fetchResidentsData(page, searchTerm);

    return (
        <section className="space-y-4 text-center">
            <h1 className="text-5xl font-black">Residents</h1>
            <div className="flex gap-2 justify-center">
                <SearchForm initialSearchTerm={searchTerm} />
                {resident &&
                    <Link href={`/residents/${resident.UUID}`} className="btn btn-outline">
                        <User /> My Resident
                    </Link>
                }
            </div>
            <div className="space-y-2">
                {residents.data.map((resident) => (
                    <Link
                        href={`/residents/${resident.UUID}`}
                        className="btn btn-lg btn-block justify-start"
                        key={resident.UUID}
                    >
                        {resident.name}
                    </Link>
                ))}
            </div>
            <PaginationControls currentPage={page} totalPages={residents.totalPages} searchTerm={searchTerm} />
        </section>
    );
}