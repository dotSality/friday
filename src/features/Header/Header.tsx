import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import AppBar from "@mui/material/AppBar/AppBar"
import Avatar from "@mui/material/Avatar/Avatar"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import Menu from "@mui/material/Menu/Menu"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import Toolbar from "@mui/material/Toolbar/Toolbar"
import Tooltip from "@mui/material/Tooltip/Tooltip"
import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography/Typography";

import {useAppDispatch, useAppSelector} from "../../bll/store";
import {ProfileType} from "../../bll/profile-reducer";
import UserPhoto from "../../common/img/photo_2022-02-06_16-28-54.png";
import {logoutTC} from "../../bll/login-reducer";
import {PATH} from "../../utils/paths";


const settings = ['Profile', 'Logout'];


export const Header = () => {

    const [openUserMenu, setOpenUserMenu] = useState<null | HTMLElement>(null);

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const user = useAppSelector<ProfileType>(state => state.profile)
    const {avatar} = user

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setOpenUserMenu(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setOpenUserMenu(null);
    };
    const logoutHandler = () => {
        dispatch(logoutTC())
        setOpenUserMenu(null);
    }

    const navigateToProfileClickHandler = () => {
        navigate(PATH.PROFILE)
        setOpenUserMenu(null);
    }


    return (
        <AppBar position="static" sx={{backgroundColor: 'gray', width:'100%'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        onClick={() => navigate(PATH.MAIN)}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex', cursor: "pointer"}}}
                    >
                            Cards
                    </Typography>

                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        {isLoggedIn &&
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="user photo" src={avatar ? avatar : UserPhoto}/>
                            </IconButton>
                        </Tooltip>
                        }
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={openUserMenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(openUserMenu)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting}
                                          onClick={setting === 'Logout'
                                              ? logoutHandler
                                              : navigateToProfileClickHandler}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
