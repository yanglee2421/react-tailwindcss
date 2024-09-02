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
        <form action="" className="space-y-3">
          <fieldset>
            <input className="block w-full focus:border-blue-500 focus:ring-blue-500" />
          </fieldset>
          <fieldset>
            <input
              type="datetime-local"
              className="block w-full focus:border-blue-500 focus:ring-blue-500"
            />
          </fieldset>
          <fieldset>
            <input className="block w-full focus:border-blue-500 focus:ring-blue-500" />
          </fieldset>
          <div className="space-x-2">
            <button className="btn-blue">submit</button>
            <button className="btn-border">reset</button>
          </div>
        </form>
        <div className="mt-3 space-x-2">
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
