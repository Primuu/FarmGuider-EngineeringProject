import {AuthProvider} from '@/contexts/AuthContext/AuthContext.tsx';
import {ThemeProvider} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import '@/i18n.ts';
import theme from "@/theme.ts";
import AppRouter from "@/routes/AppRouter.tsx";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppRouter />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App