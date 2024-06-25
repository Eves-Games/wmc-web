"use client";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col text-center">
      <h1 className="text-xl font-black">Something went wrong!</h1>
      <p>{error.message}</p>
    </section>
  );
}
