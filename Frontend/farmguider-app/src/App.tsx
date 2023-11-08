import {AuthProvider} from '@/contexts/AuthContext/AuthContext.tsx';
import {ThemeProvider} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import '@/i18n.ts';
import theme from "@/theme.ts";
import AppRouter from "@/routes/AppRouter.tsx";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppRouter />
                </ThemeProvider>
            </AuthProvider>
        </SnackbarProvider>
    );
}

export default App