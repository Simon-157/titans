import React from 'react';
import styles from './css/styles.css';

const CustomButton = ({ text, onClick, icon, primary, width }) => {
  return (
    <button
      className={`${styles.customButton} ${primary ? styles.primary : styles.secondary}`}
      onClick={onClick}
      style={width ? { width: width } : {}}
    >
      {icon && <img src={icon} alt="" className={styles.icon} />}
      {text}
    </button>
  );
};

export default CustomButton;
