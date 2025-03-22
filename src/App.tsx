import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import RSVP from "./pages/RSVP";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import { RSVPForm } from "@/components/RSVPForm";

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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Wedding RSVP</h1>
            <p className="text-lg text-gray-600">Please verify your name to access the RSVP form.</p>
          </div>
          <RSVPForm />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
