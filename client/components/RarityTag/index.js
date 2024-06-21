import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  emptyNullFunc,
  COMMON,
  EPIC,
  RARE,
  LEGENDARY,
  UNIQUE,
} from 'defaults';
import styles from './css/styles.css';

function RarityTag(props) {
  const {
    rarity,
    t,
  } = props;

  const corectedRarity = rarity === UNIQUE ? LEGENDARY : rarity;

  return (
    <div className={cx(styles.tag, styles[corectedRarity])}>
      {t([corectedRarity])}
    </div>
  );
}

RarityTag.displayName = 'RarityTag';

RarityTag.propTypes = {
  rarity: PropTypes.oneOf([COMMON, EPIC, RARE, LEGENDARY]),
  t: PropTypes.func,
};

RarityTag.defaultProps = {
  t: emptyNullFunc,
};

export default RarityTag;
