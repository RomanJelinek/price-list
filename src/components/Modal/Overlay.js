import styles from './Modal.module.css';
import React from 'react';

const Overlay = ({ handleModal }) => {
  return <div className={styles.overlay} onClick={handleModal}></div>;
};

export default Overlay;
