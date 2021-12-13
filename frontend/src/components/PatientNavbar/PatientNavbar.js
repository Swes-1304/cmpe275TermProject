import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FaPlane } from 'react-icons/fa';
import { withStyles } from '@material-ui/core/styles';
import '../AdminNavbar/AdminNavbar.css'
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import {FaFileMedical} from 'react-icons/fa'
import backendServer from "../../webConfig" 


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const styles = {
    root: {
        flexGrow: 1,
    },
    toolbarButtons: {
        marginLeft: 'auto',
    },
};

function PersistentDrawerLeft(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { classes } = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const handleLogout = () => {
    //     localStorage.removeItem('adminEmail');
    // };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open} style={{backgroundColor:"#7C0200"}}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon sx={{ fontSize: 30 }} />
                    </IconButton>

                    <Typography className='header' variant='h3' noWrap component='div'>
                        Spartan Vaccination
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant='persistent'
                anchor='left'
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button component={Link} to='/adminDashboard'>
                        <ListItemIcon>
                            <FaFileMedical fontSize='large' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '1.2rem' }} disableTypography primary='Add Clinics' />
                    </ListItem>
                    <Divider />

                    <ListItem button component={Link} to='/addDisease'>
                   <ListItemIcon>
                            <FaFileMedical fontSize='large' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '1.2rem' }} disableTypography primary='Add Disease' />
                    </ListItem>
                    <Divider />

                    <ListItem button component={Link} to='/addVaccination'>
                        <ListItemIcon>
                            <FaFileMedical fontSize='large' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '1.2rem' }} disableTypography primary='Add Vaccination' />
                    </ListItem>

                    <Divider />

                    <ListItem button component={Link} to='/login'>
                        <ListItemIcon>
                            <BsFillPersonFill fontSize='large' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '1.2rem' }} disableTypography primary='Patient Portal' />
                    </ListItem>

                    <Divider />

                    <ListItem button component={Link} to='/login'>
                        <ListItemIcon>
                            <BsFillPersonFill fontSize='large' />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: '1.2rem' }} disableTypography primary='Logout' />
                    </ListItem>
                    <Divider />

                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}
export default withStyles(styles)(PersistentDrawerLeft);
