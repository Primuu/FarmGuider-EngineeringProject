import Navbar from "@/components/Navbar/Navbar.tsx";
import {useNavigate} from 'react-router-dom';
import {HOME_PAGE_URL} from "@/constants/ROUTER_URLS.ts";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import '@/pages/NotFoundPage/notFoundPage.css';

import brokenTractor from "@/assets/broken-tractor.png";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate(HOME_PAGE_URL, {replace: true});
    }

    return (
        <div>
            <Navbar/>
            <div className="not-found-container">
                <img src={brokenTractor} alt="" className='tractor'/>
                <Typography className="not-found-header">
                    404 Not Found
                </Typography>
                <Typography className="not-found-text">
                    Whoops... Something went wrong, the page you are looking for does not exist.
                </Typography>
                <Button onClick={handleBackHome} variant="contained" className="back-home-button">
                    Take me away from here
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;