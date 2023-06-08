import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "./queryClient";

export function ReactQuery(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
