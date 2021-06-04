import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

export const Auth = () => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/register`} component={Register} />
        </Switch>
    )
}