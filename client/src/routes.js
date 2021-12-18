import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from 'react-router-dom';

import { routes } from './shared/constant/route';

export const createRoutes = (
    <Router>
        <Switch>
            {routes.map((route) => {
                return (
                    <Route
                        key={route.path}
                        exact={route.path === '/' && true}
                        path={route.path}
                        component={route.component}
                    />
                );
            })}
            <Redirect to='/' />
        </Switch>
    </Router>
);
