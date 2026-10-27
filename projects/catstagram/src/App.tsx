import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@/components/ThemeProvider";
import FavoritesProvider from "@/components/FavoritesProvider";
import Header from "@/components/Header";
import Feed from "@/pages/Feed";
import Favorites from "@/pages/Favorites";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <ThemeProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Header />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}
