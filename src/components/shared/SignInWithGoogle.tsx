import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleAuthProvider } from "@/api/firebase/app";

export function SignInWithGoogle() {
  const [isPending, startTransition] = React.useTransition();

  return (
    <>
      <button
        onClick={() => {
          startTransition(async () => {
            await signInWithPopup(auth, googleAuthProvider);
          });
        }}
        disabled={isPending}
      >
        Sign in with Google
      </button>
    </>
  );
}
