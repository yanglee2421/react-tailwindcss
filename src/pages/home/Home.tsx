import { getAuth, signOut } from "firebase/auth";
import { app } from "@/api/firebase/app";

export function Home() {
  return (
    <button
      onClick={() => {
        signOut(getAuth(app));
      }}
    >
      Sign Out
    </button>
  );
}
