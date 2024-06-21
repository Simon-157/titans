import React, { Component } from 'react';
import PropTypes from 'prop-types';
import trim from 'lodash/trim';
import { emptyArr, BAR, FIND, KEY, SLIDESHOW, title as webSiteTitle } from 'defaults';
import { withSub } from 'client/lib/sub';
import Helmet from 'components/Helmet';
import BarCarousel from './BarCarousel';
import BarEvents from './BarEvents';
import BarEventsPast from './BarEventsPast';
import BarLeaderboard from './BarLeaderboard';
import BarMap from './BarMap';
import BarTop from './BarTop';
import BarView from './BarView';
import styles from './css/styles.css';

class BarContent extends Component {
  static displayName = 'BarContent'

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    bar: PropTypes.object,
    barId: PropTypes.string,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  render() {
    const {
      history,
      location,
      bar,
      barId,
      userId,
      t,
    } = this.props;

    const { pathname } = location;

    const {
      city,
      country,
      description,
      img,
      latitude,
      longitude,
      name,
    } = bar;

    const seoLink = `${process.env.FRONTEND_PATH}${pathname}`;

    const seoTitle = `${name} - ${webSiteTitle}`;

    return (
      <>

        <Helmet
          title={seoTitle}
          description={trim(description)}
          keywords={`${t([BAR, KEY])}${country ? `, ${country}` : ''}${city ? `, ${city}` : ''}}`}
          link={seoLink}
          img={img}
          city={city}
          country={country}
        />

        <BarView barId={barId} name={name} />

        {img && (
          <BarCarousel
            files={[{ type: SLIDESHOW, url: img }]}
          />
        )}

        <BarTop
          history={history}
          id={barId}
          bar={bar}
          img={img}
          userId={userId}
          t={t}
        />

        <div className={styles.dark}>

          <BarEvents
            bar={bar}
            id={barId}
            userId={userId}
            t={t}
          />

          {Boolean(+latitude && +longitude) && (
            <BarMap
              history={history}
              img={img}
              lat={latitude}
              lng={longitude}
              title={t([BAR, FIND])}
            />
          )}

          <BarLeaderboard
            barId={barId}
            userId={userId}
            t={t}
          />

          <BarEventsPast
            id={barId}
            userId={userId}
            t={t}
          />

        </div>

      </>
    );
  }
}

export default withSub(BarContent, function barContentSub({ barId }) {
  if (!barId) {
    return emptyArr;
  }

  return [{
    name: 'imagesForBar',
    props: {
      barId,
    },
  }, {
    name: 'managersForBar',
    props: {
      barId,
    },
  }];
});
