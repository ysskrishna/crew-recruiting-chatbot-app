
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/landing';
import NotFound from './pages/not-found';
import Dashboard from './pages/dashboard';
import Share from './pages/share';



export const routes = [
    // Public Routes
    {
        path: '/',
        element: <LandingPage />
    },

    {
        path: '/share/:chatId',
        element: <Share />
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
