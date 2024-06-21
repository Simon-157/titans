import React, { Component } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import get from 'lodash/get';
import round from 'lodash/round';
import {
  BAR,
  BLANK,
  CAPACITY,
  NAME,
  USE_KILOMETERS,
  VALUE,
  VISIT,
} from 'defaults';
import { getDistance } from 'client/helpers';
import CapacityIcon from 'assets/img/capacity.svg';
import DistanceIcon from 'assets/img/distance.svg';
import PhoneIcon from 'assets/img/phone.svg';
import WebsiteIcon from 'assets/img/website.svg';
import styles from './css/styles.css';

class BarInfo extends Component {
  static displayName = 'BarInfo'

  static propTypes = {
    bar: PropTypes.object,
    latLng: PropTypes.string,
    userSettings: PropTypes.object,
    t: PropTypes.func,
  }

  renderLine = (line, key) => (
    <div className={styles.hoursLine} key={key}>
      {line}
    </div>
  )

  render() {
    const { bar, latLng, userSettings, t } = this.props;

    if (!bar) {
      return null;
    }

    const {
      capacity,
      latitude,
      longitude,
      phone,
      website,
    } = bar;

    let distance;
    let useKilometers;
    if (latLng) {
      const [lat, lng] = latLng.split(',');

      distance = getDistance({ lat, lng }, {
        lat: latitude,
        lng: longitude,
      });

      useKilometers = get(find(userSettings, [NAME, USE_KILOMETERS]), [VALUE], false);
    }

    const hasDistance = Boolean(distance);

    return (
      <div className={styles.info}>

        {website && (
          <div className={styles.infoSubtitle}>

            <WebsiteIcon className={styles.icon} />

            <a href={website} target={BLANK}>
              {t([BAR, VISIT])}
            </a>

          </div>
        )}

        {phone && (
          <div className={styles.infoSubtitle}>

            <PhoneIcon className={styles.icon} />

            <span>
              {phone}
            </span>

          </div>
        )}

        {hasDistance && (
          <div className={styles.infoSubtitle}>

            <DistanceIcon className={styles.icon} />

            <span>
              {round((useKilometers ? distance * 1.609244 : distance), 2)}
            </span>

            <span>
              {`${useKilometers ? 'km' : 'miles'} away`}
            </span>

          </div>
        )}

        {capacity && (
          <div className={styles.infoSubtitle}>

            <CapacityIcon className={styles.icon} />

            <span>
              {t([CAPACITY])}
            </span>

            <span>
              {`: ${capacity}`}
            </span>

          </div>
        )}

      </div>
    );
  }
}

export default BarInfo;
