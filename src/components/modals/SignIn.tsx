"use client";
import { Check, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignInModal() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      router.push(`/api/gateway/${username}/start`);
    }
  };

  return (
    <>
      <input type="checkbox" id="sign_in_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box space-y-4 bg-base-100">
          <h3 className="text-xl font-bold">Sign in</h3>
          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <User />
              <input
                type="text"
                className="grow"
                placeholder="Minecraft Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <div className="modal-action">
              <button type="submit">
                <label htmlFor="sign_in_modal" className="btn btn-primary">
                  <Check className="size-5" />
                  Sign in
                </label>
              </button>
              <label htmlFor="sign_in_modal" className="btn btn-neutral">
                Cancel
              </label>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="sign_in_modal" />
      </div>
    </>
  );
}