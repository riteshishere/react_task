import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AuthComponentStyle from '../../styles/AuthComponentStyle'

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: "100%",
    },
    titleFont: {
        letterSpacing: "0.1rem",
        fontWeight: 900,
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.5rem",
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "1.6rem",
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "1.6rem",
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "1.7rem",
        },
    },
    padding: {
        padding: "16px",
    },
    column: {
        marginTop: 0,
        flexDirection: "column",
    },
    typographySpan: {
        fontSize: "0.975rem",
        '& > span':{
            fontWeight: 800
        },
    },
}))

const PrimaryInfo = (props) => {
    console.log("Inside PrimaryInfo props is", props)
    const localStyle = useStyles()
    const classes = AuthComponentStyle()
    return (
        <Card raised={true} className={localStyle.fullWidth} >
            <CardContent className={localStyle.padding}>
                <div className={`${classes.flexbox} ${localStyle.column}`}>
                    {props.name &&
                        <Typography component="h3" variant="h3" color="primary" gutterBottom={true} className={localStyle.titleFont}>
                            {props.name}
                        </Typography>
                    }
                    {props.uid &&
                        <Typography component="p" color="textSecondary" variant="body2" className={localStyle.typographySpan}>
                            <span>UID: </span>{props.uid}
                        </Typography>
                    }
                    {props.createdAt._seconds &&
                        <Typography component="p" color="textSecondary" variant="body2" className={localStyle.typographySpan}>
                            <span>Since </span>{new Date(props.createdAt._seconds).toDateString()}
                        </Typography>
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default PrimaryInfo