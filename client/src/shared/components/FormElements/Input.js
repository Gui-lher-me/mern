import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const initialState = (props) => {
    return {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouched: false,
    };
};

export const Input = (props) => {
    const [inputState, dispatch] = useReducer(
        inputReducer,
        initialState(props)
    );

    const { onInput, id } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
        return () => {};
    }, [onInput, id, value, isValid]);

    const changeHandler = (event) => {
        dispatch({
            validators: props.validators,
            type: 'CHANGE',
            value: event.target.value,
        });
    };

    const touchHandler = () => dispatch({ type: 'TOUCH' });

    const element = props.input ? (
        <input
            value={inputState.value}
            onChange={changeHandler}
            onBlur={touchHandler}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
        />
    ) : (
        <textarea
            value={inputState.value}
            onChange={changeHandler}
            onBlur={touchHandler}
            id={props.id}
            rows={props.rows || 3}
        />
    );

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                'form-control--invalid'
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <p>{props.errorText}</p>
            )}
        </div>
    );
};
