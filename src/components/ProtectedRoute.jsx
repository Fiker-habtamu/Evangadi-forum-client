import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, loading, children }) => {
  // If authentication is still being determined, show a loading indicator
  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  // If the user is not authenticated, redirect to the login page
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (protected content)
  return children;
};

export default ProtectedRoute;
