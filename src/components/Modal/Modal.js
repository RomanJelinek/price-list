import styles from './Modal.module.css';
import React from 'react';
import Overlay from "./Overlay"

const Modal = ({handleModal, children}) => {
    return (
        <>
        <div className={styles.modal}>
            <div className={styles.closeButton} onClick={handleModal}>X</div>
            {children}
        </div>
        <Overlay handleModal={handleModal}/>
        </>
    );
};

export default Modal;