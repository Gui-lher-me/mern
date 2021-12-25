import React from 'react';

import { Input } from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/useForm';
import './PlaceForm.css';

const initialInputs = {
    title: {
        value: '',
        isValid: false,
    },
    description: {
        value: '',
        isValid: false,
    },
    address: {
        value: '',
        isValid: false,
    },
};

const NewPlace = () => {
    const [formState, inputHandler] = useForm(initialInputs, false);

    const placeSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState); // send this to the server!
    };

    return (
        <form onSubmit={placeSubmitHandler} className='place-form'>
            <Input
                id='title'
                input
                type='text'
                label='Title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid title.'
                onInput={inputHandler}
            />
            <Input
                id='description'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Please enter a valid description (at least 5 characters).'
                onInput={inputHandler}
            />
            <Input
                id='address'
                input
                label='Address'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a valid address.'
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
