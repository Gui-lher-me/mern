import React from 'react';

import { Input } from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
    return (
        <form className='place-form'>
            <Input
                validators={[]}
                errorText='Please enter a valid title.'
                element='input'
                type='text'
                label='Title'
            />
        </form>
    );
};

export default NewPlace;
