import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles, withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Box from '@material-ui/core/Box'
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DashboardIcon from '@material-ui/icons/Dashboard'

import { logoutUser } from '../../reducers/userSlice'
import { withRouter } from 'react-router'

const useStyles = makeStyles((theme) => ({
    block: {
        display: "block",
    },
    flex: {
        display: "flex",
    },
    spaceBetween: {
        justifyContent: "space-between",
    },
    padding: {
        padding: "24px",
    },
    max: {
        maxWidth: "1280px",
        [theme.breakpoints.down('sm')]: {
            padding: "0 0",
        },
        [theme.breakpoints.up('sm')]: {
            padding: "0 24px",
        },
        [theme.breakpoints.up('md')]: {
            padding: "0 48px",
        },
    },
    bold: {
        fontWeight: 800,
    },
    brandFont: {
        fontWeight: 900,
        [theme.breakpoints.down('sm')]: {
            fontSize: "2.5rem",
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "2rem",
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "2.5rem",
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "3rem",
        },
    },
}));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem);

const Header = ({ location, history }) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const classes = useStyles();
    useEffect(() => {
        console.log("User state is", user)
        console.log("location is", location)
        console.log("history is", history)
        if (!user) {
            if (location.pathname === "/auth/register") history.push("/auth/register")
            else history.push("/auth/login")
        }
    }, [user, history])

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    const handleChangePass = () => {
        history.push("/auth/change-password")
    }

    const dashboardHandler = () => {
        history.push("/")
    }

    return (
        <AppBar position="static" className={classes.block}>
            <Box display="flex" flexDirection="row" alignItems="center" padding="24px" >
                <Container
                    disableGutters={true}
                    className={`${classes.max} ${classes.flex} ${classes.spaceBetween}`}
                >
                    <Link
                        href="/"
                        color="secondary"
                        underline="none"
                    >
                        <Typography color="inherit" variant="h3" className={classes.brandFont}>
                            React Task
                        </Typography>
                    </Link>
                    {user && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                getContentAnchorEl={null}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <StyledMenuItem onClick={dashboardHandler}>
                                    <ListItemIcon>
                                        <DashboardIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </StyledMenuItem>
                                <StyledMenuItem onClick={handleChangePass}>
                                    <ListItemIcon>
                                        <VpnKeyIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Change Password" />
                                </StyledMenuItem>
                                <StyledMenuItem onClick={logoutHandler}>
                                    <ListItemIcon>
                                        <ExitToAppIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </StyledMenuItem>
                            </Menu>
                        </div>
                    )}
                </Container>
            </Box>
        </AppBar>
    )

}

export default withRouter(Header)