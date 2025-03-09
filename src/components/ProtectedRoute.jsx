import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
