"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { react } from "./client";
import { env } from "@/env.mjs";

export default function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
  react.createClient({
      links: [
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
        }),
      ],
    })
  );
  return (
    <react.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </react.Provider>
  );
}
