import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient;

export function initializeClient() {
  if (queryClient) {
    return queryClient;
  }

  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return queryClient;
}

export function getClient() {
  if (queryClient) {
    return queryClient;
  }

  throw new Error("Client is not initialized");
}
