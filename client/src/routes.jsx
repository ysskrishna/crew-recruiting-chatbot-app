
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/landing';
import NotFound from './pages/not-found';
import Dashboard from './pages/dashboard';



export const routes = [
    // Public Routes
    {
        path: '/',
        element: <LandingPage />
    },

    // Private routes
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    },
    
    // Default not found route
    {
        path: '*',
        element: <NotFound />
    },

    
];
