import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import RSVP from "./pages/RSVP";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/details" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default App;
