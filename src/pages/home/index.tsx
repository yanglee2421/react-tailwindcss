// Redux Imports
import { useAppDispatch, sliceLogin } from "@/redux";

// MUI Imports
import { styled } from "@mui/material";

// React Imports
import { useMemo, useRef } from "react";

const UlStyled = styled("ul")(({ theme }) => {
  return {
    listStyle: "none",
    overflow: "hidden",
    scrollSnapType: "x mandatory",

    display: "flex",
    width: "25rem",
    padding: 0,
    // border: "blue dashed",
    margin: 0,

    "& > li": {
      scrollSnapStop: "always",
      scrollSnapAlign: "start",

      flex: "0 0 25rem",
      height: 100,
      padding: 0,
      border: "1px red dashed",
      margin: 0,
    },
    [theme.breakpoints.down("md")]: {
      overflow: "auto",
    },
  };
});

export function Component() {
  const dispatch = useAppDispatch();
  const handleLoggout = () => {
    const action = sliceLogin.actions.islogged(false);
    dispatch(action);
  };

  const count = 5;
  const liEl = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(i);
    }

    return list.map((item) => <li key={item}>{item}</li>);
  }, [count]);

  const dotEl = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(i);
    }

    return list.map((item) => {
      const handleDotClick = () => {
        const rootStyle = globalThis.getComputedStyle(document.documentElement);
        const el = ulRef.current;

        el?.scroll({
          left: item * 25 * Number.parseInt(rootStyle.fontSize),
          behavior: "smooth",
        });
      };

      return <button onClick={handleDotClick}>dix-{item}</button>;
    });
  }, [count]);

  const ulRef = useRef<HTMLUListElement>(null);

  const handlePrevClick = () => {
    const el = ulRef.current;

    const rootStyle = globalThis.getComputedStyle(document.documentElement);
    el?.scrollBy({
      left: -25 * Number.parseInt(rootStyle.fontSize),
      behavior: "smooth",
    });
  };
  const handleNextClick = () => {
    const rootStyle = globalThis.getComputedStyle(document.documentElement);
    const el = ulRef.current;

    el?.scrollBy({
      left: 25 * Number.parseInt(rootStyle.fontSize),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button onClick={handleLoggout}>log out</button>
      <hr />
      <UlStyled ref={ulRef}>{liEl}</UlStyled>
      <hr />
      <button onClick={handlePrevClick}>prev</button>
      <button onClick={handleNextClick}>next</button>
      <hr />
      {dotEl}
    </div>
  );
}
