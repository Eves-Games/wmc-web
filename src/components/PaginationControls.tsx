"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationControls({
  currentPage,
  totalPages,
  searchTerm,
  entityType,
}: {
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  entityType: "residents" | "towns" | "nations";
}) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/${entityType}?page=${newPage}&search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <div className="join mx-auto grid w-fit grid-cols-2">
        <button className="btn btn-outline join-item" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft /> Previous
        </button>
        <button
          className="btn btn-outline join-item"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight />
        </button>
      </div>
      <p className="col-span-2 mt-2 text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
    </>
  );
}
