import {Route, Routes} from 'react-router-dom';
import {useAuth} from '@/contexts/AuthContext/AuthContext.tsx';
import NotLoggedPage from '@/components/NotLoggedPage.tsx';
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";

function App() {
    const authContext = useAuth();

    const userRole = authContext.userRole;

    return (
        <Routes>
            <Route path="/" element={userRole === UserRoles.NON_LOGGED ? <NotLoggedPage/> : <NotLoggedPage/>}/>
        </Routes>
    );
}

export default App
