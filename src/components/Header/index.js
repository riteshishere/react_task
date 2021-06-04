import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Toolbar from "@material-ui/core/Toolbar"
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
    },
    title: {
        fontWeight: 900,
    },
    bold: {
        fontWeight: 800,
    },
}));

const Header = ({ location, history }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const classes = useStyles();
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
        console.log("location is", location)
        console.log("history is", history)
        if (!user) {
            if(location.pathname === "/auth/register") history.push("/auth/register")
            else history.push("/auth/login")
        }
    }, [user, history])

    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    return (
        <AppBar position="static" className={classes.block}>
            <Toolbar className={classes.padding}>
                <Container
                    disableGutters={true}
                    className={`${classes.max} ${classes.flex} ${classes.spaceBetween}`}
                >
                    <Link
                        href="/"
                        color="secondary"
                        underline="none"
                    >
                        <Typography color="inherit" variant="h3" className={classes.title}>
                            React Task
                        </Typography>
                    </Link>
                    {user &&
                        <Button color="secondary" variant="contained" onClick={logoutHandler} className={classes.bold}>Logout</Button>
                    }
                </Container>
            </Toolbar>
        </AppBar>
    )

}

export default withRouter(Header)