import {Box, CircularProgress, Container} from '@mui/material';
import '@/components/LoadingComponent/loadingComponent.css';

const LoadingComponent = () => {
    return (
        <Container>
            <Box className="loading-box">
                <CircularProgress color="primary"/>
            </Box>
        </Container>
    );
}

export default LoadingComponent;