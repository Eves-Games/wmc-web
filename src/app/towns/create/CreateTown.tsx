"use client";

import { FormEvent, useState } from "react";
import { DollarSign, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createTown } from "@/bridge";

type CreateTownProps = {
  userUUID: string;
};

export function CreateTown({ userUUID }: CreateTownProps) {
  const [name, setName] = useState("");
  const [board, setBoard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateTown = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const newTown = await createTown(name, board, userUUID);
      console.log("Town created successfully:", newTown);
      router.push(`/towns/${newTown.UUID}`);
    } catch (err) {
      console.error("Error creating town:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-5xl font-black">Create Town</h1>
      {error && (
        <div className="alert alert-error">
          <TriangleAlert /> {error}
        </div>
      )}
      <form onSubmit={handleCreateTown} className="space-y-4">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Town name"
            className="input input-md input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Board</span>
          </div>
          <textarea
            placeholder="Town board (optional)"
            className="textarea textarea-bordered h-48"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
          />
        </label>
        <div className="flex justify-end gap-2">
          <Link href="/towns" className="btn btn-outline">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <DollarSign />
                64 Gold
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
