import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../reducers/userSlice'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Alert from '../commonComponents/Alert'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import generalValidator from '../../utilities/validator'
import AuthComponentStyle from '../../styles/AuthComponentStyle'
import { emailPattern } from '../../utilities/regex'

const Login = ({ location, history }) => {
    const classes = AuthComponentStyle();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErrorMsg, setEmailErrorMsg] = useState("")

    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.user)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (user) {
            history.push(redirect)
        }
    }, [history, user, redirect])

    const canProceed = () => (
        emailErrorMsg.length === 0
        && email.length > 0
        && password.length > 0
    )

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        generalValidator(
            email,
            emailPattern,
            emailErrorMsg,
            setEmailErrorMsg,
            "Please enter a valid Email"
        )
    }, [email])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.flexbox}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error &&
                    <Alert className={classes.fullWidth} severity="error" AlertTitle="Invalid attempt!">
                        {error}
                    </Alert>
                }
                {loading &&
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="secondary" />
                    </Backdrop>
                }
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email address"
                        type="email"
                        id="email"
                        autoComplete="email"
                        error={emailErrorMsg.length ? true : false}
                        helperText={emailErrorMsg}
                        autoFocus
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        size='large'
                        disabled={!canProceed()}
                        onClick={e => loginHandler(e)}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/auth/register" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login