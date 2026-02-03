import { Navigate } from "react-router-dom";
import { useLoginStore } from "../Store/LoginStore";

function AuthRoute({ children }) {
  const user = useLoginStore((state) => state.user);

  if (user) return <Navigate to="/" replace />;

  return children;
}

export default AuthRoute;
