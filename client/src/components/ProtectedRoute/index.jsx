import { isEmpty } from '../../utils';
import { selectAccessToken, selectIsAuthenticated } from '../../redux/features/authSlice';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    let accessToken = useSelector(selectAccessToken);
    let isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated || isEmpty(accessToken)) {
        // If tokens are not present redirect to landing page
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;