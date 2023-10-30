import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // const login = (token) => {
    //     // Save token, set isAuthenticated to true
    //     setIsAuthenticated(true);
    // };
    //
    // const logout = () => {
    //     // Delete token, set isAuthenticated to false
    //     setIsAuthenticated(false);
    // };

    useEffect(() => {
        // Check JWT
        // setIsAuthenticated(true) if user is logged in
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);