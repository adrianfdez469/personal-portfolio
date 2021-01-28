import React from "react"
import {
    makeStyles,
    AppBar,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    Avatar
} from '@material-ui/core';

import {
    AccountCircle,
    NotificationsActive,
    PeopleAlt
} from "@material-ui/icons";

import MenuIcon from "@material-ui/icons/Menu/";
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyle = makeStyles(theme => ({
    topBarAppBar: {
        flexGrow: 1,
        top:'auto'
    },
    topBarToolbar: {
        top: 'auto',
        boxShadow: '0px 6px 9px 1px rgba(0,0,0,0.2)',
        backgroundColor: '#fd9f41', //azul ff8000[Naranja] fd9f41[Naranja-Amarillo];
    },
    topBarIcon: {
        size: '1.8em'
    },
    topBarTitle: {
        flexGrow: 1,
    },
    topBarImg:{
        width:'2.0rem'
    }
}));

const TopBar = ({ t }) => {
    const classes = useStyle();

    return (
        <>
            <AppBar className={classes.topBarAppBar} position="static">
                <Toolbar className={classes.topBarToolbar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img className={classes.topBarImg} src="/logo_blanco_2.png" />
                    </IconButton>
                    <Typography variant="h6" className={classes.topBarTitle}>
                        Portafolios
                    </Typography>
                    <Tooltip title="Colaboradores">
                        <IconButton color="inherit">
                            <PeopleAlt className={classes.topBarIcon} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Avisos">
                        <IconButton color="inherit">
                            <NotificationsActive className={classes.topBarIcon} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Autenticación">
                        <IconButton color="inherit">
                            <AccountCircle className={classes.topBarIcon} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Opciones">
                        <IconButton aria-label="display more actions" edge="end" color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default TopBar;