import SidebarLeft from "@/components/SidebarLeft/SidebarLeft.tsx";
import {useAuth} from "@/contexts/AuthContext/AuthContext.tsx";
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen.tsx";
import React, {ReactNode} from "react";
import '@/layouts/MainLayout/mainLayout.css'

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
                <div className="sidebar-left">
                    <SidebarLeft/>
                </div>
            )}
            <div className={isUserLogged ? "content": ""}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
