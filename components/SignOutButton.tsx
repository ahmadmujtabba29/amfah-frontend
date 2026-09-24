"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api";
import { Button } from "@/components/Button";

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await logout();
    } catch {
      // Clear navigation even if the request fails.
    } finally {
      router.push("/");
      router.refresh();
      setIsSigningOut(false);
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="min-w-0 px-3 py-2 text-xs sm:min-w-[140px] sm:px-4 sm:py-3 sm:text-sm"
    >
      {isSigningOut ? "..." : "SIGN OUT"}
    </Button>
  );
}
