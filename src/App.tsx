import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/provideres/theme-provider";

import AppRouter from "@/router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  });
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AppRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
