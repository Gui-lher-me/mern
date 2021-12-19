import React from 'react';

import { UserItem } from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

export const UsersList = ({ users }) => {
    if (users.length === 0) {
        return (
            <div className='centered'>
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className='users-list'>
            {users.map((user) => {
                return <UserItem key={user.id} user={user} />;
            })}
        </ul>
    );
};
