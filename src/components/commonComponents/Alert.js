import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(2)
    },
    fullWidth: {
        width: "90%",
    },
}))

const DescriptionAlerts = (props) => {
    const classes = useStyles()

    return (
        <Alert className={`${classes.fullWidth} ${classes.marginTop}`} severity={props.severity}>
            <AlertTitle>{props.AlertTitle}</AlertTitle>
            {props.children}
        </Alert>
    );
}

export default DescriptionAlerts