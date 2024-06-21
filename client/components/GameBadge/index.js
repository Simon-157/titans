import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BADGE } from 'defaults';
import translit from 'lib/translit';
import styles from './css/styles.css';

function GameBadge({ gameName }) {
  return (
    <div className={cx(styles.badge, BADGE)}>
      <div className={cx(styles.game, styles[translit(gameName)])} />
    </div>
  );
}

GameBadge.displayName = 'GameBadge';

GameBadge.propTypes = {
  gameName: PropTypes.string,
};

export default GameBadge;
