import React from 'react';
import PropTypes from 'prop-types';
import {
  emptyNullFunc,
  LEFT_HAND,
  RIGHT_HAND,
} from 'defaults';
import styles from './css/styles.css';

function WeaponTypeTag(props) {
  const {
    type,
    t,
  } = props;

  return (
    <div className={styles.tag}>
      {t([type])}
    </div>
  );
}

WeaponTypeTag.displayName = 'RarityTag';

WeaponTypeTag.propTypes = {
  type: PropTypes.oneOf([RIGHT_HAND, LEFT_HAND]),
  t: PropTypes.func,
};

WeaponTypeTag.defaultProps = {
  t: emptyNullFunc,
};

export default WeaponTypeTag;
