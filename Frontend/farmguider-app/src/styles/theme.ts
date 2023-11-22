import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#F5F8FD'
        },
        primary: {
            main: '#2CB178'
        },
        secondary: {
            main: '#FFD000'
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
