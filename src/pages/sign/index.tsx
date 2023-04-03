import { log } from "console";
import React from "react";

type submit = React.HtmlHTMLAttributes<HTMLFormElement>["onSubmit"];

export default function PageSign() {
  const handleSubmit: submit = async (e) => {
    e.preventDefault();
    if (!e.nativeEvent.target) return;
    // @ts-ignore
    const data = new FormData(e.nativeEvent.target);
    const res = Object.fromEntries(data.entries());
    const _r = await navigator.credentials.store(
      // @ts-ignore
      new PasswordCredential({
        id: res.user,
        password: res.password,
      })
    );
    log;
  };

  const handleGet = async () => {
    const data = await navigator.credentials.get();
    console.log(data);
  };

  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <input type="text" name="user" />
        <input type="password" name="password" />
        <button type="submit">save</button>
      </form>
      <button onClick={handleGet}>get</button>
    </div>
  );
}
