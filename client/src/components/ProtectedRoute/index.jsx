import { isEmpty } from '../../utils';
import { selectAccessToken, selectIsAuthenticated } from '../../redux/features/authSlice';

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