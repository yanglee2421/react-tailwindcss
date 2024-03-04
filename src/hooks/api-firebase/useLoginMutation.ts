import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/api/firebase/app";
import type { UserCredential } from "firebase/auth";

export function useLoginMutation() {
  return useMutation<UserCredential, Error, Req>({
    mutationFn(req) {
      return signInWithEmailAndPassword(getAuth(app), req.email, req.password);
    },
  });
}

export interface Req {
  email: string;
  password: string;
}
