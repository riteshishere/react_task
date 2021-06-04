import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

export const useTextField = (props) => {
    const [value, setValue] = useState("")
    const input = 
        <TextField
            value={value}
            onChange={e => setValue(e.target.value)}
            variant={props.variant}
            margin={props.margin ? props.margin : "normal"}
            required={props.required}
            fullWidth={props.fullWidth? true: false}
            id={props.id}
            name={props.name}
            label={props.label}
            type={props.type}
            autoComplete={props.autoComplete ? props.autoComplete : ""}
            autoFocus={props.autoFocus? true : false}
            error= {(props.errorMsg && (props.errorMsg.length > 0)) ? true : false}
            helperText = {props.errorMsg ? props.errorMsg : ""}

        />
    return [value, input]
}