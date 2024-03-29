import {AuthProvider} from '@/contexts/AuthContext/AuthContext.tsx';
import {ThemeProvider} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import '@/i18n.ts';
import theme from "@/styles/theme.ts";
import AppRouter from "@/routes/AppRouter.tsx";
import {SnackbarProvider} from "notistack";
import {StyledMaterialDesignContent} from "@/styles/snackbarStyles.ts";
import PageTitleUpdater from "@/components/PageTitleUpdater/PageTitleUpdater.ts";

function App() {
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={5000}
            Components={{
                success: StyledMaterialDesignContent,
            }}
        >
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <PageTitleUpdater />
                    <AppRouter/>
                </ThemeProvider>
            </AuthProvider>
        </SnackbarProvider>
    );
}

export default App