import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isAuthenticated from '../utilities/isAuthenticUser'

const PrivateRoute = (props) => {
    console.log("Private route for", props.path)
    const { component: Component, ...rest } = props
    const render = props => {

        if (!Boolean(isAuthenticated())) {
            return <Redirect to="/auth/login" />
        }
        return <Component {...props} />
    }
    return <Route {...rest} render={render} />
}

export default PrivateRoute