import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  A,
  BAR,
  BLANK,
  BUTTON,
  CONTAINER,
  JOIN,
  HALF,
  GENERAL,
  SHARE,
  SPAN,
  title as webSiteTitle,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import Breadcrumbs from 'components/Breadcrumbs';
import LogoCircle from 'components/LogoCircle';
import Rating from 'components/Rating';
import SocialShare from 'components/SocialShare';
import BarInfo from './BarInfo';
import styles from './css/styles.css';

class BarTop extends Component {
  static displayName = 'BarTop'

  static propTypes = {
    id: PropTypes.string,
    bar: PropTypes.object,
    hasRights: PropTypes.bool,
    latLng: PropTypes.string,
    userSettings: PropTypes.object,
    t: PropTypes.func,
  }

  join = () => {
    const { id } = this.props;

    executePrimusRequest(JOIN, BAR, { barId: id });
  }

  render() {
    const {
      bar,
      hasRights,
      latLng,
      userSettings,
      t,
    } = this.props;

    if (!bar) {
      return null;
    }

    const {
      description,
      fullLocation,
      name,
      rating,
      shortUrl,
      website,
    } = bar;

    const shareText = `${name} bar on ${webSiteTitle}`;

    const LocationComp = website ? A : SPAN;

    return (
      <div className={styles.top}>
        <div className={CONTAINER}>

          <LogoCircle className={styles.logoCircle} />

          <Breadcrumbs
            id={BAR}
            name={name}
            shortUrl={shortUrl}
            t={t}
          />

          <div className={styles.halfs}>
            <div className={cx(HALF, styles.topLeft)}>

              {rating && (
                <Rating className={styles.rating} rating={rating} />
              )}

              <div className={styles.name}>
                {name}
              </div>

            </div>

            <div className={cx(HALF, styles.topRight)}>

              <LocationComp
                className={styles.location}
                href={website}
                target={BLANK}
              >
                {fullLocation}
              </LocationComp>

              <div className={styles.btns}>
                <SocialShare className={styles.btn} text={shareText} t={t}>
                  {t([GENERAL, SHARE])}
                </SocialShare>
              </div>

              <BarInfo
                bar={bar}
                latLng={latLng}
                hasRights={hasRights}
                userSettings={userSettings}
                t={t}
              />

              <div className={styles.desc}>
                {description}
              </div>

              <br />

              <button
                type={BUTTON}
                onClick={this.join}
              >
                {t(['joinBar'])}
              </button>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default BarTop;
