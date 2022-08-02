import { Navigate } from "react-router-dom";

const AuthRequired = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthRequired;
