import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Box from '@material-ui/core/Box'
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

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
    }
}));

const Header = ({ location, history }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const classes = useStyles();
    useEffect(() => {
        console.log("location is", location)
        console.log("history is", history)
        if (!user) {
            if (location.pathname === "/auth/register") history.push("/auth/register")
            else if (location.pathname === "/auth/change-password") history.push("/auth/change-password")
            else history.push("/auth/login")
        }
    }, [user, history])

    const logoutHandler = () => {
        dispatch(logoutUser())
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
                    {user &&
                        <Button color="secondary" variant="contained" onClick={logoutHandler} className={classes.bold}>Logout</Button>
                    }
                </Container>
            </Box>
        </AppBar>
    )

}

export default withRouter(Header)