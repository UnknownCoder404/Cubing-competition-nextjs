"use client"; // Add this directive to use client-side components

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function ReactQueryProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
