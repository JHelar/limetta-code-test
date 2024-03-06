import { QueryClientProvider as RQQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { initializeClient } from "./queryClient";
import { PropsWithChildren } from "react";

const client = initializeClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <RQQueryClientProvider client={client}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </RQQueryClientProvider>
  );
}
