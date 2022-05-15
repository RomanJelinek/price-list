import React from 'react';
import styles from './BabyItem.module.css';

const colorList = [
  '#C1DDD8',
  '#F5E4DC',
  '#F2C2C2',
  '#D9E1C1',
  '#F2EAE0',
  '#CCA9C0',
  '#FFE19C',
  '#CCB9AB',
  '#FC9994',
  '#f8fce2',
  '#BCD793',
];

const valueStyles = {
  color: '#663398',
};

const BabyItem = ({ title, value, color, handleModal }) => {
  return (
    <div
      style={{ backgroundColor: colorList[color] }}
      className={styles.card}
      onClick={() => handleModal('update', title)}
    >
      <h3>{title}</h3>
      <h2 style={valueStyles}>{`${value} Kč`}</h2>
    </div>
  );
};

export default BabyItem;
