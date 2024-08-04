import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PartialNation } from "@/types/bridge";

const ITEMS_PER_PAGE = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-4">
      <button className={`btn btn-ghost btn-xs ${currentPage === 1 ? "btn-disabled" : ""}`} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft />
      </button>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <button
        className={`btn btn-ghost btn-xs ${currentPage === totalPages ? "btn-disabled" : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

interface AffiliatesListProps {
  title: string;
  affiliates: PartialNation[];
}

function AffiliatesList({ title, affiliates }: AffiliatesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(affiliates.length / ITEMS_PER_PAGE);

  const paginatedAffiliates = affiliates.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-black">{title}</h2>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
      <ul className="list-disc pl-5">
        {paginatedAffiliates.map((affiliate) => (
          <li key={affiliate.UUID}>{affiliate.name}</li>
        ))}
      </ul>
    </div>
  );
}

interface RelationsTabProps {
  allies: PartialNation[];
  enemies: PartialNation[];
}

export default function RelationsTab({ allies, enemies }: RelationsTabProps) {
  return (
    <div className="space-y-6">
      <AffiliatesList title="Allies" affiliates={allies} />
      <hr />
      <AffiliatesList title="Enemies" affiliates={enemies} />
    </div>
  );
}
