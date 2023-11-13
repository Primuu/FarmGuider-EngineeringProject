import List from "@mui/material/List";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

import logo from "@/assets/farmguider-logo.svg";

const SidebarLeftDrawer = () => (
    <div>
        <List>
            <Box className="logo-box">
                <img src={logo} alt="Farm guider logo" className='logo'/>
                <Typography className="logo-text">
                    FarmGuider
                </Typography>
            </Box>

            {/*Example: */}
            {/*<ListItemButton>*/}
            {/*    <ListItemIcon>*/}
            {/*        <HomeIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="Home"/>*/}
            {/*</ListItemButton>*/}
        </List>
    </div>
);

export default SidebarLeftDrawer;