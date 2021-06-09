import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Alert from '../commonComponents/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import generalValidator from '../../utilities/validator'
import API from '../../service/axios'
import AuthComponentStyle from '../../styles/AuthComponentStyle'
import { passwordPattern } from '../../utilities/regex'

const ChangePassword = () => {
    const classes = AuthComponentStyle();
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("")
    const [confirmPasswordErrorMsg, setconfirmPasswordErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)

    const validate = () => {
        generalValidator(
            newPassword,
            passwordPattern,
            newPasswordErrorMsg,
            setNewPasswordErrorMsg,
            "Please enter a strong password"
        )
        if (
            confirmPassword.length > 0
            && confirmPassword !== newPassword
            && confirmPasswordErrorMsg !== "Password doesn't match with new password"
        )
            setconfirmPasswordErrorMsg("Password doesn't match with new password")
        else if (
            (confirmPassword === "" && confirmPasswordErrorMsg !== "")
            || (newPassword === confirmPassword)
        )
            setconfirmPasswordErrorMsg("")
    }
    const canProceed = () => (
        oldPassword.length > 0
        && newPasswordErrorMsg.length === 0
        && newPassword.length > 0
        && confirmPasswordErrorMsg.length === 0
        && confirmPassword.length > 0
    )
    const changePasswordHandler = (e) => {
        e.preventDefault()
        if (error !== null) setError(null)
        if (msg !== null) setMsg(null)
        if (loading === false) setLoading(true)
        console.log(`Resetting with password ${newPassword} & confirmPassword ${confirmPassword}`)
        API.post(
            `/user/changePassword`,
            {
                oldPassword,
                newPassword,
            },
        ).then(res => {
            console.log("Entered in then block")
            if (res.data.success) {
                setMsg("Password changed successfully!")
            } else {
                setError(res.data.msg)
            }
            setLoading(false)
        }).catch(error => {
            console.log("Entering in catch block")
            const err =
                error.response
                    ? error.response.data.message
                        ? error.response.data.message
                        : error.message
                    : error.request
                        ? error.request.data.message
                            ? error.request.message
                            : error.message
                        : "Unknown error has been occured..."
            setError(err)
            setLoading(false)
        })
    }
    useEffect(() => {
        validate()
    }, [newPassword, confirmPassword])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={`${classes.flexbox} ${classes.marginTop}`}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change password
                </Typography>
                {error &&
                    <Alert className={classes.fullWidth} severity="error" AlertTitle="Invalid attempt!">
                        {error}
                    </Alert>
                }
                {msg &&
                    <Alert className={classes.fullWidth} severity="success" AlertTitle="Great!">
                        {msg}
                    </Alert>
                }
                {loading &&
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="secondary" />
                    </Backdrop>
                }
                <form className={classes.form} onSubmit={changePasswordHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="oldPassword"
                        label="Old Password"
                        type="password"
                        id="oldPassword"
                        autoComplete="new-password"
                        autoFocus
                        value={oldPassword}
                        onChange={(event) => setOldPassword(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type="password"
                        id="newPassword"
                        autoComplete="current-password"
                        error={newPasswordErrorMsg.length ? true : false}
                        helperText={newPasswordErrorMsg}
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPpassword"
                        label="Confirm your new password"
                        type="password"
                        id="confirmPpassword"
                        autoComplete="current-password"
                        error={confirmPasswordErrorMsg.length ? true : false}
                        helperText={confirmPasswordErrorMsg}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        size='large'
                        disabled={!canProceed()}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default ChangePassword