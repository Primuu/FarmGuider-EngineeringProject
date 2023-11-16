import React, {useEffect} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {HOME_PAGE_URL, NOT_LOGGED_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";

type ProtectedRouteProps = {
    accessibleRoles: UserRoles[];
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, accessibleRoles  }) => {
    const { userRole, loading } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (userRole !== UserRoles.NON_LOGGED) {
            localStorage.setItem('lastPath', location.pathname);
        }
    }, [userRole, location.pathname]);

    const getProperRoute = () => {
        if (userRole === UserRoles.NON_LOGGED) {
            return NOT_LOGGED_PAGE_URL;
        }
        const lastPath = localStorage.getItem('lastPath');
        return lastPath || HOME_PAGE_URL;
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return accessibleRoles.includes(userRole)
        ? children
        : <Navigate to={getProperRoute()} state={{ from: location }} replace />;
};

export default ProtectedRoute;
