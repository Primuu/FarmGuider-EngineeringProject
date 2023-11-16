import {createContext, ReactNode, useContext, useEffect, useState, useCallback} from 'react';
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {useCookies} from "react-cookie";
import {SESSION_COOKIE} from "@/constants/CONFIG_CONSTS.ts";
import {fetchUserAuthData} from "@/services/authenticationService.ts";
import UserAuthDTO from "@/entities/UserAuthDTO.ts";

type AuthContextType = {
    removeSessionCookie: () => void;
    userRole: UserRoles;
    userId: number | undefined;
    loading: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
    removeSessionCookie: () => {},
    userRole: UserRoles.NON_LOGGED,
    userId: undefined,
    loading: true,
});

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [cookies, , removeCookie] = useCookies([SESSION_COOKIE]);
    const [userId, setUserId] = useState<number | undefined>(undefined)
    const [userRole, setUserRole] = useState(UserRoles.NON_LOGGED);
    const [loading, setLoading] = useState(true);

    const removeSessionCookie = useCallback(() => {
        removeCookie(SESSION_COOKIE);
    }, [removeCookie]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const userAuthDTO: UserAuthDTO = await fetchUserAuthData();
                setUserId(userAuthDTO.userId);
                setUserRole(userAuthDTO.userRole as UserRoles);
            } catch (error) {
                setUserRole(UserRoles.NON_LOGGED);
            } finally {
                setLoading(false);
            }
        };
            void fetchData();
    }, [cookies, removeCookie]);

    const contextValue = {
        userId,
        userRole,
        removeSessionCookie,
        loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);