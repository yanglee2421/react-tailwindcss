import { getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { app, githubAuthProvider } from "@/api/firebase/app";

export function SignInWithGithub() {
  const [isPending, startTransition] = React.useTransition();

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await signInWithPopup(getAuth(app), githubAuthProvider);
        });
      }}
      disabled={isPending}
    >
      Sign in with Github
    </button>
  );
}
