import React from 'react';

import { NavLink } from 'react-router-dom';

import { routes } from '../constant/routes';
import './NavLinks.css';

export const NavLinks = () => {
    return (
        <ul className='nav-links'>
            {routes.map(({ url, name, exact }, key) => (
                <li key={key}>
                    <NavLink exact={exact} to={url}>
                        {name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};
