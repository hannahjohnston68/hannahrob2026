
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import RSVP from "./pages/RSVP";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/details" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
