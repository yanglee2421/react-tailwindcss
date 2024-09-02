import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { SignInWithGithub } from "@/components/shared/SignInWithGithub";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";

export function NewTab() {
  const user = useCurrentUser();

  return (
    <div className="flex h-dvh flex-col text-base">
      <header className="px-5 py-2">
        <img src={user?.photoURL || ""} alt="" />
        <p className="space-x-2">
          <button className="btn-indigo">indigo</button>
          <button className="btn-red">red</button>
          <button className="btn-green">green</button>
          <button className="btn-blue">blue</button>
          <button className="btn-yellow">yellow</button>
          <button className="btn-border">border</button>
        </p>
      </header>
      <main className="flex-auto px-5 py-2">
        <div className="space-x-2">
          <SignInWithGoogle />
          <SignInWithGithub />
        </div>
      </main>
      <footer className="px-5 py-2">
        &copy;2024 by <a href="#">yanglee2421</a>
      </footer>
    </div>
  );
}
