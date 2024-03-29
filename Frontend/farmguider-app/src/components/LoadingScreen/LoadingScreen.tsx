import {Box, CircularProgress, Container} from '@mui/material';
import '@/components/LoadingScreen/loadingScreen.css';

const LoadingScreen = () => {
    return (
        <Container>
            <Box className="loading-box">
                <CircularProgress color="primary"/>
            </Box>
        </Container>
    );
}

export default LoadingScreen;