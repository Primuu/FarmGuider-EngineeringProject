import {createTheme} from '@mui/material/styles';

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
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: "white",
                }
            }
        }
    }
});

export default theme;
