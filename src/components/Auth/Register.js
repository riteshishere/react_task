import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../../reducers/userSlice'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Alert from '../commonComponents/Alert'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import generalValidator from '../../utilities/validator'
import AuthComponentStyle from '../../styles/AuthComponentStyle'
import { emailPattern, passwordPattern, phonePattern } from '../../utilities/regex'

const Register = ({ location, history }) => {
    const classes = AuthComponentStyle();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [nameError, setNameError] = useState(false)
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("")

    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.user)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (user) {
            history.push(redirect)
        }
    }, [history, user, redirect])

    const validate = () => {
        if (name.length > 0 && nameError) {
            setNameError(false)
        }
        generalValidator(email, emailPattern, emailErrorMsg, setEmailErrorMsg, "Please enter a valid Email")
        generalValidator(password, passwordPattern, passwordErrorMsg, setPasswordErrorMsg, "Please enter a strong password")
        generalValidator(phone, phonePattern, phoneErrorMsg, setPhoneErrorMsg, "Please enter a valid phone number")
    }

    const canProceed = () => (
        name.length > 0
        && emailErrorMsg.length === 0
        && email.length > 0
        && passwordErrorMsg.length === 0
        && password.length > 0
        && phoneErrorMsg.length === 0
        && phone.length > 0
    )

    const registerHandler = (e) => {
        e.preventDefault()
        if (name.length <= 0) setNameError(true)
        else dispatch(registerUser({ name, email, password, phone }))
    }

    useEffect(() => {
        validate()
    }, [email, password, phone, name])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.flexbox}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
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
                        name="name"
                        label="Full Name"
                        type="text"
                        id="name"
                        autoComplete="name"
                        error={nameError}
                        helperText={nameError ? "Please provide your full name" : ""}
                        autoFocus
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
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
                        error={passwordErrorMsg.length ? true : false}
                        helperText={passwordErrorMsg}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="phone"
                        type="phone"
                        id="phone"
                        autoComplete="tel"
                        error={phoneErrorMsg.length ? true : false}
                        helperText={phoneErrorMsg}
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        size='large'
                        disabled={!canProceed()}
                        onClick={e => registerHandler(e)}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/auth/login" variant="body2">
                                {"Already have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Register