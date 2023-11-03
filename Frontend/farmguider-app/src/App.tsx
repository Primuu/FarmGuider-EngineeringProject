import {Route, Routes} from 'react-router-dom';
import {useAuth} from '@/contexts/AuthContext/AuthContext.tsx';
import NotLoggedPage from '@/components/NotLoggedPage.tsx';
import UserRoles from "@/contexts/AuthContext/UserRoles.ts";
import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";


const theme = createTheme({
    palette: {
        background: {
            default: '#FAFAFA'
        },
        primary: {
            main: '#2CB178'
        },
        secondary: {
            main: '#49b483'
        }
    }
});

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
