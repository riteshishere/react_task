import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ChangePassword from './ChangePassword'

export const Auth = () => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/register`} component={Register} />
            <Route path={`${path}/change-password`} component={ChangePassword} />
        </Switch>
    )
}