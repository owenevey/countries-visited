"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { signOutAction } from "@/app/actions/auth";

export default function HomePage() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  if (isPending) return <div>Loading session...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full">
      <div className="h-40 w-full bg-blue-400">
        {session?.user ? (
          <div>Welcome, {session.user.name}</div>
        ) : (
          <div>You are not logged in</div>
        )}
      </div>
      <div className="h-40 w-full bg-amber-400">
        {session?.session?.token && (
          <div className="p-2 text-sm">
            <strong>Token:</strong> {session.session.token}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={async () => {
          await signOutAction(); // call server action
        }}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
      >
        Sign Out
      </button>
    </div>
  );
}
