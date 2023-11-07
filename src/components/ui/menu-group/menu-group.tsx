// React Imports
import React from "react";

// Hooks Imports
import { useObserverResize } from "@/hooks";

// Transition Imports
import { Transition } from "react-transition-group";

export function MenuGroup() {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const resizeEntry = useObserverResize(contentRef);
  React.useEffect(() => {
    void resizeEntry;
  }, [resizeEntry]);

  return (
    <>
      <div></div>
      <Transition
        in={true}
        nodeRef={nodeRef}
        addEndListener={(done) => {
          nodeRef.current?.addEventListener("transitionend", done);
        }}
        unmountOnExit
      >
        {(status) => {
          console.log(status);
          return (
            <div ref={nodeRef} style={{ overflow: "hidden" }}>
              <div ref={contentRef}></div>
            </div>
          );
        }}
      </Transition>
    </>
  );
}
