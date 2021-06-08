import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail } from '../../reducers/userSlice'

import Alert from '../commonComponents/Alert'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import AuthComponentStyle from '../../styles/AuthComponentStyle'
import CssBaseline from '@material-ui/core/CssBaseline'

import DashboardTitle from './Title'
import PrimaryInfo from './PrimaryInfo'

import Container from "@material-ui/core/Container"

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "24px",
    },
    noPadding: {
        padding: 0,
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
    name: {
        fontWeight: 900,
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.5rem",
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "1.2rem",
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "1.5rem",
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "2rem",
        },
    },
    badge: {
        color: theme.palette.secondary.light,
    },
    conatiner: {
        display: "flex"
    },
    curveBorder: {
        border: `2px solid ${theme.palette.primary.dark}`,
        borderRadius: "42px",
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "0px",
    },
    divPadding: {
        padding: "10px",
    },
    containerPaddingBreak: {
        [theme.breakpoints.down('md')]: {
            padding: "0 3rem",
        },
        [theme.breakpoints.up('md')]: {
            padding: "0 5rem",
        },
    },
}));

const Dashboard = () => {
    console.log("Dashboard render")
    const localStyle = useStyles()
    const classes = AuthComponentStyle()
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.user)

    if ((!user) && (!loading) && (!error)) {
        console.log("No user loading error for now")
        dispatch(getUserDetail())
    } else {
        console.log("Something is in dashboard state")
        console.log("user", user)
        console.log("loading", loading)
        console.log("error", error)
    }

    return (
        <Container component="main" maxWidth="lg" disableGutters={true} className={localStyle.containerPaddingBreak}>
            <CssBaseline />
            <div className={`${classes.flexbox} ${localStyle.curveBorder}`}>
                <DashboardTitle />
                {error &&
                    <Alert className={classes.fullWidth} severity="error" AlertTitle="Problem in authentication">
                        {error}
                    </Alert>
                }
                {loading &&
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="secondary" />
                    </Backdrop>
                }
                {user &&
                    <PrimaryInfo {...user} />
                }
            </div>
            {user &&
                <section>
                    {JSON.stringify(user)}
                </section>
            }
        </Container>
    )
}

export default Dashboard