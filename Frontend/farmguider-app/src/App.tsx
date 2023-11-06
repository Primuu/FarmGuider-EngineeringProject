import {Route, Routes} from 'react-router-dom';
import {useAuth} from '@/contexts/AuthContext/AuthContext.tsx';
import NotLoggedPage from '@/pages/NotLoggedPage/NotLoggedPage.tsx';
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {ThemeProvider} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import '@/i18n.ts';
import theme from "@/theme.ts";

function App() {
    const authContext = useAuth();

    const userRole = authContext.userRole;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={userRole === UserRoles.NON_LOGGED ? <NotLoggedPage/> : <NotLoggedPage/>}/>
            </Routes>
        </ThemeProvider>

    );
}

export default App