import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import pick from 'lodash/pick';
import {
  emptyNullFunc,
  emptyObj,
  ATTACK,
  BALANCE,
  CENTER,
  DESC,
  ELEMENTAL,
  FLEX,
  M,
  POINTER,
  SCROLL,
  TITLE,
  WEAPON,
} from 'defaults';
import { randomId } from 'lib/random';
import { calculateDamage } from 'lib/scroll';
import styles from './css/styles.css';

const updateProps = [BALANCE, SCROLL];

class Scroll extends Component {
  static displayName = 'Scroll'

  static propTypes = {
    balance: PropTypes.object, // eslint-disable-line
    size: PropTypes.string,
    scroll: PropTypes.object,
    learnScroll: PropTypes.func, // eslint-disable-line
    replaceScroll: PropTypes.func, // eslint-disable-line
    onClick: PropTypes.func,
    t: PropTypes.func,
  }

  static defaultProps = {
    balance: emptyObj,
    size: M,
    scroll: emptyObj,
    t: emptyNullFunc,
  }

  className = randomId()

  damage = 0

  constructor(props) {
    super(props);

    this.prevProps = pick(props, updateProps);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    const newPrevProps = pick(newProps, updateProps);

    const equals = isEqual(this.prevProps, newPrevProps);

    if (!equals) {
      this.prevProps = newPrevProps;

      this.prepare(newProps);
    }
  }

  prepare(props = this.props) {
    const { scroll } = props;

    this.damage = calculateDamage(scroll);
  }

  onClick = () => {
    const { scroll, onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(scroll);
    }
  }

  render() {
    const {
      balance,
      size,
      scroll,
      onClick,
      t,
    } = this.props;

    const { damage } = this;

    const { _id, pool, resourceValue = 0 } = scroll;

    const desc = t([DESC, _id], balance?.data?.scrolls?.[_id]);
    const title = t([TITLE, _id]);

    return (
      <div
        className={cx(
          styles.scroll,
          styles[size],
          this.className,
          {
            [POINTER]: onClick,
          },
        )}
        data-id={_id}
        data-pool={pool}
        title={title}
        onClick={onClick ? this.onClick : null}
      >
        <div
          className={styles.scrollImage}
          style={{ backgroundImage: `url("/img/scroll/${_id}_image.png")` }}
          title={t([TITLE, _id])}
        />

        <div className={styles.scrollPaper} />

        <div
          className={styles.scrollPool}
          style={{ backgroundImage: `url("/img/scrollPools/${pool}.webp")` }}
        >

          <div
            className={cx(styles.manaCost, styles.number, FLEX, CENTER)}
          >
            {resourceValue}
          </div>

          <div className={cx(styles.damage, styles.number, FLEX, CENTER)}>
            {damage === 0 ? (
              <img
                src={`/img/poolTypesIcons/${pool === WEAPON ? ATTACK : pool}.svg`}
                alt={pool}
                width='55%'
              />
            ) : damage}
          </div>

          <div className={cx(styles.title, FLEX, CENTER)}>
            {title}
          </div>

        </div>

        <div
          className={cx(styles.descContainer)}
        >
          <div
            className={cx(styles.desc)}
            title={desc}
          >
            {desc}
          </div>

        </div>

        {scroll.pool === ELEMENTAL && scroll.element && (
          <div
            className={styles.element}
            style={{ backgroundImage: `url("/img/characterElements/${scroll.element}.svg")` }}
          />
        )}

      </div>
    );
  }
}

export default Scroll;
