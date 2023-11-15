import SidebarLeft from "@/components/SidebarLeft/SidebarLeft.tsx";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import React, {ReactNode} from "react";
import '@/layouts/MainLayout/mainLayout.css'
import {Box} from "@mui/material";

type MainLayoutProps = {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { userRole, loading } = useAuth();

    const isUserLogged = userRole !== UserRoles.NON_LOGGED;

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="main-layout">
            {isUserLogged && (
                <Box className="sidebar-left">
                    <SidebarLeft/>
                </Box>
            )}
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
