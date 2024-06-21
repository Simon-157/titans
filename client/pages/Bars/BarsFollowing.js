import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import chunk from 'lodash/chunk';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import size from 'lodash/size';
import {
  emptyArr,
  emptyObj,
  BARS,
  CONTAINER,
  FAVOURITE,
  H1_LARGE,
  ID,
  NAME,
  RED,
  RESIZE,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import FeaturedItem from 'components/FeaturedBlock/FeaturedItem';
import Carousel from 'components/Carousel';
import { getCurrentUser } from 'reducers/user/selectors';
import DotBgShape from 'assets/img/dot-bg-shape.svg';
import styles from './css/styles.css';

class BarsFollowing extends Component {
  static displayName = 'BarsFollowing'

  static propTypes = {
    data: PropTypes.object,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  state = {
    width: window.innerWidth,
  }

  constructor(props) {
    super(props);

    const { data: { bars } } = props;

    this.prevProps = bars;

    this.prepare(bars);
  }

  componentDidMount() {
    this.resize();

    global.addEventListener(RESIZE, this.resize);
  }

  shouldComponentUpdate(newProps, newState) {
    const { data: { bars } } = newProps;

    const equals = isEqual(this.prevProps, bars) &&
      this.state.width === newState.width;

    if (!equals) {
      this.prevProps = bars;

      this.prepare(bars);
    }

    return !equals;
  }

  prepare(bars) {
    if (!bars) {
      return;
    }

    const { width: windowWidth } = this.state;

    const width = this.items ? this.items.offsetWidth : (windowWidth - 30);

    let itemWidth;
    if (windowWidth > 899) {
      itemWidth = 365 + 20;
    } else {
      itemWidth = 300 + 20;
    }

    let count = (width / itemWidth) | 0;
    if (count === 0) {
      count = 1;
    }

    this.bars = chunk(orderBy(bars, NAME), count);

    const last = this.bars[this.bars.length - 1];

    if (last) {
      let lastLength = last.length;

      while (lastLength++ < count) {
        last.push(emptyObj);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.resize);
  }

  resize = () => {
    this.setState({
      width: window.innerWidth,
    });
  }

  setRef = (c) => {
    this.items = c;
  }

  renderRow = (row, key) => {
    return (
      <div key={key} className={styles.row}>
        {map(row, this.renderBar)}
      </div>
    );
  }

  renderBar = (item, key) => {
    const { userId, t } = this.props;

    const { _id } = item;

    return (
      <FeaturedItem
        key={_id || key}
        className={styles.bar}
        entity={BARS}
        item={item}
        userId={userId}
        t={t}
      />
    );
  }

  render() {
    const { t } = this.props;

    if (size(this.bars) === 0) {
      return null;
    }

    return (
      <div className={styles.following}>

        <DotBgShape className={styles.dots} />

        <div className={styles.bricks} />

        <div className={CONTAINER}>

          <h1 className={cx(H1_LARGE, RED)}>
            {t([BARS, FAVOURITE])}
          </h1>

          <Carousel className={styles.carousel} setRef={this.setRef}>
            {map(this.bars, this.renderRow)}
          </Carousel>

        </div>

      </div>
    );
  }
}

export default withSub(BarsFollowing, function subscriptions({ userId }) {
  if (!userId) {
    return emptyArr;
  }

  return [{
    name: 'followingBars',
    props: {
      userId,
    },
  }];
}, function mapStateToProps(state) {
  const user = getCurrentUser(state);
  const userId = get(user, [ID]);

  return {
    user,
    userId,
  };
});
