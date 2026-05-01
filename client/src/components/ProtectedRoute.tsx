import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/storeHooks";
import type { JSX } from "react/jsx-runtime";

interface Props {
    children: JSX.Element;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
    const { isAuthenticated, role } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (requireAdmin && role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}

export default ProtectedRoute;