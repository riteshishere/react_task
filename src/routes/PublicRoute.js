import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isAuthenticated from '../utilities/isAuthenticUser'

const PublicRoute = (props) => {
    console.log("Public route for", props.path)
    const { component: Component, restricted = false, ...rest } = props
    const render = props => {

        if (Boolean(isAuthenticated()) && restricted) {
            return <Redirect to="/" />
        }
        return <Component {...props} />
    }
    return <Route {...rest} render={render} />
}

export default PublicRoute