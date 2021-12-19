import { Users } from '../../user/pages/Users';
import { NewPlace } from '../../places/pages/NewPlace';
import React from 'react';

export const AddPlace = () => {
    return <p>ADD PLACE</p>;
};

export const Authenticate = () => {
    return <p>AUTHENTICATE</p>;
};

export const routes = Object.freeze([
    {
        name: 'ALL USERS',
        url: '/',
        exact: true,
        path: '/',
        component: Users,
    },
    {
        name: 'MY PLACES',
        url: '/u1/places',
        exact: false,
        path: '/u1/places',
        component: NewPlace,
    },
    {
        name: 'ADD PLACE',
        url: '/places/new',
        exact: false,
        path: '/places/new',
        component: AddPlace,
    },
    {
        name: 'AUTHENTICATE',
        url: '/auth',
        exact: false,
        path: '/auth',
        component: Authenticate,
    },
]);
