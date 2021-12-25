import React from 'react';

import { createPortal } from 'react-dom';

import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = ({
    footer,
    footerClass,
    children,
    className,
    contentClass,
    onSubmit,
    style,
    headerClass,
    header,
}) => {
    return createPortal(
        <div className={`modal ${className}`} style={style}>
            <header className={`modal__header ${headerClass}`}>
                <h2>{header}</h2>
            </header>
            <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
                <div className={`modal__content ${contentClass}`}>
                    {children}
                </div>
                <footer className={`modal__footer ${footerClass}`}>
                    {footer}
                </footer>
            </form>
        </div>,
        document.querySelector('#modal-hook')
    );
};

export const Modal = (props) => {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames='modal'
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </>
    );
};
