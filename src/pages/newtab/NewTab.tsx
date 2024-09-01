import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { SignInWithGithub } from "@/components/shared/SignInWithGithub";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";

export function NewTab() {
  const user = useCurrentUser();

  return (
    <div className="text-base">
      <header>
        <img src={user?.photoURL || ""} alt="" />
      </header>
      <main>
        <SignInWithGoogle />
        <SignInWithGithub />
      </main>
      <footer>
        &copy;2024 by <a href="#">yanglee2421</a>
      </footer>
    </div>
  );
}
