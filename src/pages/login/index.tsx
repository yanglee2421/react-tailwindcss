// Redux Imports
import { useAppDispatch, sliceLogin } from "@/redux";

// Antd Imports
import { Button } from "antd";

// Styles Imports
import styles from "./login.module.scss";

// React Imports
import { useEffect, useRef } from "react";

export function Component() {
  // Redux Hooks
  const dispatch = useAppDispatch();

  const handleSignIn = (role: "admin" | "client") => {
    const action = sliceLogin.actions.islogged(true);
    const roleAction = sliceLogin.actions.usr({ role });
    dispatch(action);
    dispatch(roleAction);
  };

  // IntersectionObserver Hooks
  const elRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([{ isIntersecting, intersectionRatio }]) => {
        if (isIntersecting) {
          console.log("entry", intersectionRatio);
          observer.unobserve(el);
        }
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className={styles.box}>
        <Button onClick={() => handleSignIn("admin")}>Sign In As Admin</Button>
        <Button onClick={() => handleSignIn("client")}>
          Sign In As Client
        </Button>
      </section>
      <section ref={elRef}>this</section>
    </>
  );
}
