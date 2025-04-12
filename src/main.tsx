import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Index from './pages/Index'
import Details from './pages/Details'
import WeddingParty from './pages/Registry'
import NotFound from './pages/NotFound'

// Performance optimization: Only log in development
if (import.meta.env.DEV) {
  console.log('Environment:', {
    isDev: import.meta.env.DEV,
    mode: import.meta.env.MODE,
    base: import.meta.env.BASE_URL
  });
}

const basename = import.meta.env.MODE === 'production' ? '/hannahrob2026' : '';

const routes = [
  {
    path: '/',
    element: <Index />,
    errorElement: <NotFound />
  },
  {
    path: '/details',
    element: <Details />,
    errorElement: <NotFound />
  },
  {
    path: '/wedding-party',
    element: <WeddingParty />,
    errorElement: <NotFound />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

const router = createBrowserRouter(routes, {
  basename,
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

// Performance optimization: Use requestIdleCallback for non-critical rendering
const root = createRoot(document.getElementById("root")!);
requestIdleCallback(() => {
  root.render(
    <RouterProvider router={router} />
  );
});
