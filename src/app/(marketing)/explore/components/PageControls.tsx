"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PageControls({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get("page") || "1");

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    replace(`${pathname}?${params.toString()}`);
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
