import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export default function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
}
