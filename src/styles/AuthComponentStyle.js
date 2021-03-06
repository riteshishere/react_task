import { makeStyles } from '@material-ui/core/styles'

const AuthComponentStyle = makeStyles((theme) => ({
    flexbox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
    marginTop: {
        marginTop: theme.spacing(8),
    },
}));

export default AuthComponentStyle