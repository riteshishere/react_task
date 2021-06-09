import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import Grid from '@material-ui/core/Grid'
import AuthComponentStyle from '../../styles/AuthComponentStyle'

const useStyles = makeStyles((theme) => ({
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
    gridItem: {
        padding: "16px",
        // border: "1px solid mediumspringgreen",
        // margin: "2px",
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
}))

const PrimaryInfo = (props) => {
    const localStyle = useStyles()
    const classes = AuthComponentStyle()
    return (
        <Grid item xs={12} md={6} className={`${localStyle.gridItem}`}>
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
        </Grid>
    )
}

export default PrimaryInfo