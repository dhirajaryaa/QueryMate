'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a client
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
