import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import {
  emptyArr,
  ASC,
  EVENT,
  FEATURED,
  FEATURED_FROM,
  GENERAL,
  H3_SMALL,
  JOIN,
  SHARE,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { renderLine } from 'client/helpers';
import { randomIntFromInterval } from 'lib/random';
import SocialShare from 'components/SocialShare';
import ClockIcon from 'assets/img/clockSimple.svg';
import HomeIcon from 'assets/img/home-icon.svg';
import LocationIcon from 'assets/img/marker-icon.svg';
import styles from './css/styles.css';

class Featured extends Component {
  static displayName = 'Featured'

  static propTypes = {
    data: PropTypes.object,
    t: PropTypes.func,
  }

  img = `/img/cooldown-placeholder-${randomIntFromInterval(1, 11)}.jpg`

  data = emptyArr

  constructor(props) {
    super(props);

    const { data } = props;

    this.prevProps = data;

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    const { data } = newProps;

    if (!isEqual(this.prevProps, data)) {
      this.prevProps = data;

      this.prepare(newProps);
    }
  }

  prepare(props = this.props) {
    const { featureds } = props;

    this.data = orderBy(featureds, FEATURED_FROM, ASC);
  }

  render() {
    const { t } = this.props;

    const { data } = this;

    const item = data[0];

    if (!item) {
      return null;
    }

    const {
      barLocation,
      barName,
      barShortUrl,
      endAt,
      eventDesc,
      eventImg,
      eventShortUrl,
      eventTitle,
      startAt,
    } = item;

    const img = eventImg || this.img;

    return (
      <div
        className={styles.featured}
        to={`/event/${eventShortUrl}`}
      >

        <Link
          to={`/event/${eventShortUrl}`}
          className={styles.img}
          style={{
            backgroundImage: `url("${process.env.CORDOVA && img.indexOf('/') === 0 ? '.' : ''}${img}")`,
          }}
        />

        <div className={styles.info}>

          <div className={styles.badge}>
            {t([GENERAL, FEATURED])}
          </div>

          <Link
            to={`/event/${eventShortUrl}`}
            className={cx(H3_SMALL, styles.title)}
          >
            {eventTitle}
          </Link>

          {eventDesc && (
            <div className={styles.desc}>
              {eventDesc.split('\n').map(renderLine)}
            </div>
          )}

          <div className={styles.lines}>

            <div className={styles.line}>

              <ClockIcon className={styles.icon} />

              <span>
                {`${startAt.format('MMM Do, YYYY | HH:mm')}-${endAt.format('HH:mm')}`}
              </span>

            </div>

            {barName && (
              <div className={styles.line}>

                <HomeIcon className={styles.icon} />

                <Link to={`bar/${barShortUrl}`}>
                  {barName}
                </Link>

              </div>
            )}

            {barLocation && (
              <div className={styles.line}>

                <LocationIcon className={styles.icon} />

                <span>
                  {barLocation}
                </span>

              </div>
            )}

          </div>

          <div className={styles.btns}>

            <SocialShare
              className={styles.share}
              text={`${eventTitle} event on ${process.env.platformName}`}
              url={`${process.env.FRONTEND_PATH}/event/${eventShortUrl}`}
              t={t}
            >
              {t([GENERAL, SHARE])}
            </SocialShare>

            <button className={styles.btn}>
              {t([EVENT, JOIN])}
            </button>

          </div>

        </div>

      </div>
    );
  }
}

export default withSub(Featured, ({ entity }) => {
  const props = {};

  if (entity) {
    props.entity = entity;
  }

  return [{
    name: FEATURED,
    props,
  }];
});
