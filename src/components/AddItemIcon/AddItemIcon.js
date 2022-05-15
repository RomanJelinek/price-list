import React from 'react';
import styles from './AddItemIcon.module.css';
const AddItemIcon = ({handleModal}) => {
    return <div className={styles.addItemIcon} onClick={() => handleModal("new")}/>;
};

export default AddItemIcon;