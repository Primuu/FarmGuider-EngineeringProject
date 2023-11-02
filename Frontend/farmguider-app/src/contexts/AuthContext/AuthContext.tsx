import {createContext, ReactNode, useContext, useEffect, useState, useCallback} from 'react';
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {useCookies} from "react-cookie";
import {SESSION_COOKIE} from "@/constants/COOKIES_NAMES.ts";
import {fetchUserAuthData} from "@/services/authenticationService.ts";
import UserAuthDTO from "@/entities/UserAuthDTO.ts";

type AuthContextType = {
    removeSessionCookie: () => void;
    userRole: UserRoles;
    userId: number | undefined;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
    removeSessionCookie: () => {},
    userRole: UserRoles.NON_LOGGED,
    userId: undefined
});

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [cookies, , removeCookie] = useCookies([SESSION_COOKIE]);
    const [userId, setUserId] = useState<number | undefined>(undefined)
    const [userRole, setUserRole] = useState(UserRoles.NON_LOGGED);

    const removeSessionCookie = useCallback(() => {
        removeCookie(SESSION_COOKIE);
    }, [removeCookie]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userAuthDTO: UserAuthDTO = await fetchUserAuthData();
                setUserId(userAuthDTO.userId);
                setUserRole(userAuthDTO.userRole as UserRoles);
            } catch (error) {
                setUserRole(UserRoles.NON_LOGGED);
            }
        };
        void fetchData();
    }, [cookies]);

    const contextValue = {
        userId,
        userRole,
        removeSessionCookie,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);