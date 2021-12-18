import React from 'react';

import { UsersList } from '../components/UsersList';

export const Users = () => {
    return (
        <UsersList
            users={[
                {
                    placeCount: 3,
                    image: 'https://www.pixel4k.com/wp-content/uploads/2018/09/london-lights-4k_1538069230.jpg',
                    id: 'u1',
                    name: 'Guilherme',
                },
            ]}
        />
    );
};
