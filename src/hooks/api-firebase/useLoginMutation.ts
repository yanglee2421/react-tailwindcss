// Query Imports
import { useMutation } from "@tanstack/react-query";

// Firebase Imports
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { app } from "@/api/firebase";

export function useLoginMutation() {
  return useMutation<UserCredential, Error, Req>({
    mutationFn(req) {
      return signInWithEmailAndPassword(getAuth(app), req.email, req.email);
    },
  });
}

export interface Req {
  email: string;
  password: string;
}
