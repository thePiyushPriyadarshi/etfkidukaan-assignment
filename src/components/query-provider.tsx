import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export function QueryProvier({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
