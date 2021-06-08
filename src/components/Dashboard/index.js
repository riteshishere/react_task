import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail } from '../../reducers/userSlice'

import Alert from '../commonComponents/Alert'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import AuthComponentStyle from '../../styles/AuthComponentStyle'


const Dashboard = () => {
    console.log("Dashboard render")
    const classes = AuthComponentStyle()
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.user)

    if ((!user) && (!loading) && (!error)) {
        console.log("No user loading error for now")
        dispatch(getUserDetail())
    } else {
        console.log("Something is in dashboard state")
        console.log("user",user)
        console.log("loading", loading)
        console.log("error", error)
    }

    return (
        <main>
            <h1>Dashboard</h1>
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
                <section>
                    {JSON.stringify(user)}
                </section>
            }
        </main>
    )
}

export default Dashboard