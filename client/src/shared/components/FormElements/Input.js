import React, { useReducer } from 'react';

import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: true,
            };
        default:
            return state;
    }
};

const initialState = { value: '', isValid: false };

export const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialState);

    const changeHandler = (event) => {
        dispatch({ type: 'CHANGE', value: event.target.value, isValid: true });
    };

    const element =
        props.element === 'input' ? (
            <input
                value={inputState.value}
                onChange={changeHandler}
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
            />
        ) : (
            <textarea
                value={inputState.value}
                onChange={changeHandler}
                id={props.id}
                rows={props.rows || 3}
            />
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid && 'form-control--invalid'
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};
