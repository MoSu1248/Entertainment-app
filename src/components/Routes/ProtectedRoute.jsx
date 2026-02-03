import { Navigate } from "react-router-dom";
import { useLoginStore } from "../Store/LoginStore";

function ProtectedRoute({ children }) {
  const user = useLoginStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
