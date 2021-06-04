import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    fullWidth: {
        width: "90%",
    },
}))

export default function DescriptionAlerts(props) {
    const classes = useStyles()

    return (
        <Alert className={classes.fullWidth} severity={props.severity}>
            <AlertTitle>{props.AlertTitle}</AlertTitle>
            {props.children}
        </Alert>
    );
}