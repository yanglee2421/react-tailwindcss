export function SlowRender(props: React.PropsWithChildren) {
  const begin = performance.now();

  while (performance.now() - begin < 1) {
    void 0;
  }

  return <li>{props.children}</li>;
}
