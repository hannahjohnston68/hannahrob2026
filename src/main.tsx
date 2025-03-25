import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Index from './pages/Index'
import Gallery from './pages/Gallery'
import RSVP from './pages/RSVP'
import Details from './pages/Details'
import NotFound from './pages/NotFound'

console.log('Environment:', {
  isDev: import.meta.env.DEV,
  mode: import.meta.env.MODE,
  base: import.meta.env.BASE_URL
});

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Index />
      },
      {
        path: 'gallery',
        element: <Gallery />
      },
      {
        path: 'rsvp',
        element: <RSVP />
      },
      {
        path: 'details',
        element: <Details />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]

const basename = import.meta.env.MODE === 'production' ? '/hannahrob2026/' : '/';
console.log('Using basename:', basename);

const router = createBrowserRouter(routes, {
  basename,
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
})

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
