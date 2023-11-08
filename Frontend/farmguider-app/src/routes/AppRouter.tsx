import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import React, {ElementType} from "react";
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import routesConfig from "@/routes/routerConfig.ts";
import TitleSetter from "@/routes/TitleSetter.tsx";

export type RouteConfig = {
    path: string;
    page: ElementType;
    accessibleRoles: UserRoles | UserRoles[];
    title: string;
}

const AppRouter = () => {
    return (
        <Routes>
            {routesConfig.map((route: RouteConfig, index: number) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                    <>
                        <TitleSetter title={route.title || "FarmGuider"}/>
                        <ProtectedRoute
                            accessibleRoles={Array.isArray(route.accessibleRoles)
                            ? route.accessibleRoles
                            : [route.accessibleRoles]}
                        >
                            {React.createElement(route.page)}
                        </ProtectedRoute>
                    </>
                    }
                />
            ))}
        </Routes>
    );
};

export default AppRouter;
