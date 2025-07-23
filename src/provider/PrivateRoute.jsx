import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';
import Loader from '../shared/Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  else {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }
};

export default PrivateRoute;