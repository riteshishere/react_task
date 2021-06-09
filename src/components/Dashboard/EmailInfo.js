import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AuthComponentStyle from '../../styles/AuthComponentStyle'
import Chip from '@material-ui/core/Chip'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import CallIcon from '@material-ui/icons/Call'

const useStyles = makeStyles((theme) => ({
    emailFont: {
        letterSpacing: "0.1rem",
        fontWeight: 900,
        [theme.breakpoints.down('sm')]: {
            fontSize: "0.7rem",
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "1.2rem",
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "1.3rem",
        },
    },
    gridItem: {
        padding: "16px",
        [theme.breakpoints.down('md')]: {
            paddingTop: 0
        }
    },
    column: {
        marginTop: 0,
        flexDirection: "column",
    },
    typographySpan: {
        fontSize: "0.975rem",
        '& > span': {
            fontWeight: 800
        },
    },
    chipMargin: {
        margin: "5px 0",
    },
}))

const EmailIcon = withStyles((theme) => ({
    root:{
        color: theme.palette.secondary.dark
    }
}))(MailOutlineIcon)

const MobileIcon = withStyles((theme) => ({
    root:{
        color: theme.palette.secondary.dark
    }
}))(CallIcon)

const VerfiedIcon = withStyles((theme) => ({
    root:{
        color: theme.palette.success.light
    }
}))(VerifiedUserIcon)

const EmailInfo = (props) => {
    const localStyle = useStyles()
    const classes = AuthComponentStyle()
    return (
        <Grid item xs={12} md={6} className={`${localStyle.gridItem} ${classes.flexbox}`}>
            <div className={`${classes.flexbox}`}>
                {props.email &&
                    <Chip
                        variant="outlined"
                        size="small"
                        icon={<EmailIcon />}
                        label={props.email}
                        clickable
                        color="primary"
                        onDelete={()=>{}}
                        {...(props.verified? {deleteIcon:<VerfiedIcon />}:{})}
                        className={`${localStyle.emailFont} ${localStyle.chipMargin}`}
                    />
                }
                {props.phone &&
                    <Chip
                        variant="outlined"
                        size="small"
                        icon={<MobileIcon />}
                        label={props.phone}
                        clickable
                        color="primary"
                        className={`${localStyle.emailFont} ${localStyle.chipMargin}`}
                    />
                }
            </div>
        </Grid>
    )
}

export default EmailInfo