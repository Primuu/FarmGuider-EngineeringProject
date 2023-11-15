import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import React, {ElementType} from "react";
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import routesConfig from "@/routes/routerConfig.ts";
import MainLayout from "@/layouts/MainLayout/MainLayout.tsx";

export type RouteConfig = {
    path: string;
    page: ElementType;
    accessibleRoles: UserRoles | UserRoles[];
}

const AppRouter = () => {
    return (
        <Routes>
            {routesConfig.map((route: RouteConfig, index: number) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                    <MainLayout>
                        <ProtectedRoute
                            accessibleRoles={Array.isArray(route.accessibleRoles)
                            ? route.accessibleRoles
                            : [route.accessibleRoles]}
                        >
                            {React.createElement(route.page)}
                        </ProtectedRoute>
                    </MainLayout>
                    }
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
