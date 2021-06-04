import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../features/user'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { useTextField } from '../Utils/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Alert from '../Utils/Alert'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    flexbox: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fullWidth: {
        width: "90%",
    },
}));

const Login = ({ location, history }) => {
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const [emailid, emailInput] = useTextField({
        variant: "outlined",
        required: true,
        fullWidth: true,
        id: "emailid",
        name: "emailid",
        label: "Email address",
        type: "email",
        autoComplete: "email",
        autoFocus: true,
        errorMsg: emailErrorMsg
    })

    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.user)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (user) {
            history.push(redirect)
        }
    }, [history, user, redirect])

    const validate = () => {
        if (email.length > 0) {
            if (!emailPattern.test(email) && emailErrorMsg !== "Please enter a valid Email") {
                setEmailErrorMsg("Please enter a valid Email")
            } else if (emailPattern.test(email) && emailErrorMsg.length !== 0) {
                setEmailErrorMsg("")
            }
        } else if (email === "") {
            setEmailErrorMsg("")
        }
    }
    const canProceed = () => (emailErrorMsg.length === 0 && email.length > 0 && password.length > 0)
    const loginHandler = (e) => {
        e.preventDefault()
        console.log(`Dispatching with email ${email} & password ${password}`)
        dispatch(loginUser({ email, password }))
    }
    useEffect(() => {
        validate()
    }, [email, password])

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
                    {/* {emailInput} */}

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
                </form>
            </div>
        </Container>
    )
}

export default Login