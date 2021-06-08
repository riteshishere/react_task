import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import PublicRoute from '../../routes/PublicRoute'
import PrivateRoute from '../../routes/PrivateRoute'
import Login from './Login'
import Register from './Register'
import ChangePassword from './ChangePassword'

export const Auth = () => {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <PublicRoute restricted path={`${path}/login`} component={Login} />
            <PublicRoute restricted path={`${path}/register`} component={Register} />
            <PrivateRoute path={`${path}/change-password`} component={ChangePassword} />
        </Switch>
    )
}