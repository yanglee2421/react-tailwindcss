import { useQuery } from "@tanstack/react-query";
import style from "./style.module.scss";
import { useStyle } from "@/hooks";
import React, { useMemo, useReducer } from "react";

interface State {
  data1: {};
  data2: {};
}

type Red = (state: State, action: number) => State;

const Chd01 = React.memo(Chd1);
const Chd02 = React.memo(Chd2);

export default function MyEdit() {
  const cx = useStyle(style);

  const [state, dispatch] = useReducer<Red, State>(
    (state, action) => {
      switch (action) {
        case 1:
          return { ...state, data1: {} };
        case 2:
          return { ...state, data2: {} };
        default:
          return state;
      }
      return state;
    },
    {
      data1: {},
      data2: {},
    },
    (state) => state
  );

  const fEl = useMemo(() => {
    return <Chd1 data={state.data1} />;
  }, [state]);

  const sEl = useMemo(() => {
    return <Chd2 data={state.data2} />;
  }, [state]);

  return (
    <>
      {fEl}
      {sEl}
      <button onClick={() => dispatch(1)}>1</button>
      <button onClick={() => dispatch(2)}>2</button>
    </>
  );
}

interface Chd1Props {
  data: {};
}

function Chd1(props: Chd1Props) {
  console.log("111");
  return <p>1</p>;
}

function Chd2(props: Chd1Props) {
  console.log("222");
  return <p>1</p>;
}
