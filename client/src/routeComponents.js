import React from 'react';

import { Switch, Redirect, Route } from 'react-router-dom';

import { routes } from './shared/constant/routes';

export const routeComponents = (
    <Switch>
        {routes.map(({ exact, path, component }, key) => {
            return (
                <Route
                    exact={exact}
                    path={path}
                    component={component}
                    key={key}
                />
            );
        })}
        <Redirect to='/' />
    </Switch>
);
