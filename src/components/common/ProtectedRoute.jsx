import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; 

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-pu-blue">
        Loading user...
      </div>
    );
  }   

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
    