import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Typography from "@material-ui/core/Typography"
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    flexContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        margin: theme.spacing(1),
    },
    title: {
        width: "100%",
        // backgroundColor: theme.palette.common.black,
        backgroundColor: theme.palette.common.black,
        // color: '#677df1',
        color: theme.palette.secondary.main,
        border: "inherit",
        borderRadius: "inherit",
        borderWidth: "0px",
        padding: "15px",
    },
    titleFont: {
        letterSpacing: "0.1rem",
        fontWeight: 900,
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.3rem",
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "1.3rem",
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "1.5rem",
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "1.7rem",
        },
    }
}))

const Title = () => {
    const localStyle = useStyles()
    return (
        <Box className={`${localStyle.flexContainer} ${localStyle.title}`}>
            <DashboardIcon className={`${localStyle.icon} ${localStyle.titleFont}`} />
            <Typography component="h2" variant="h5" className={localStyle.titleFont}>
                Dashboard
            </Typography>
        </Box>
    )
}

export default Title