// Classes Imports
import clsx from "clsx";
import React, { useRef } from "react";

export function Component() {
  const ulRef = useRef<HTMLUListElement>(null);
  const handleDrag: React.DragEventHandler = (evt) => {
    void evt;
  };

  return (
    <div className={clsx("h-full border border-red-400 border-solid")}>
      <h1>performance</h1>
      <ul
        ref={ulRef}
        onDrag={handleDrag}
        onDragOver={(e) => e.preventDefault()}
        className="list-none p-0 w-fit mx-auto "
      >
        <li
          draggable
          className="border border-solid border-slate-500 w-96 h-16 bg-green-300 mb-2 last:mb-0"
        >
          123
        </li>
        <li
          draggable
          className="border border-solid border-slate-500 w-96 h-16 bg-green-300 mb-2 last:mb-0"
        >
          123
        </li>
        <li
          draggable
          className="border border-solid border-slate-500 w-96 h-16 bg-green-300 mb-2 last:mb-0"
        >
          123
        </li>
        <li
          draggable
          className="border border-solid border-slate-500 w-96 h-16 bg-green-300 mb-2 last:mb-0"
        >
          123
        </li>
        <li
          draggable
          className="border border-solid border-slate-500 w-96 h-16 bg-green-300 mb-2 last:mb-0"
        >
          123
        </li>
      </ul>
    </div>
  );
}
