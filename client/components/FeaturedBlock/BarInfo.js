import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import round from 'lodash/round';
import {
  emptyArr,
  // BAR,
  // BARS,
  // DETAILS,
  // EDIT,
  // FOLLOW,
  // GENERAL,
  GRADIENT,
  // ICON,
  // PROFILE,
  RED,
  // SAVE,
  // SAVED,
  SETTINGS,
  // TRANSPARENT,
  USE_KILOMETERS,
} from 'defaults';
import { withSub } from 'client/lib/sub';
// import { executePrimusRequest } from 'client/request';
// import Details from 'assets/img/details.svg';
// import Heart from 'assets/img/heart.svg';
// import HeartEmpty from 'assets/img/heart-empty.svg';
// import Pencil from 'assets/img/pencilFilled.svg';
import styles from './css/styles.css';

class BarInfo extends Component {
  static displayName = 'BarInfo'

  static propTypes = {
    // history: PropTypes.object,
    item: PropTypes.object,
    settings: PropTypes.object,
    // manageBrandButtons: PropTypes.bool,
    // t: PropTypes.func,
  }

  // follow = (ev) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //
  //   const { item: { id } } = this.props;
  //
  //   executePrimusRequest(FOLLOW, BAR, { id });
  // }
  //
  // barFollowingActions = () => {
  //   const {
  //     data: {
  //       user_follows_brands: follows,
  //     },
  //     t,
  //   } = this.props;
  //
  //   const follow = find(follows);
  //
  //   const HeartComp = follow ? Heart : HeartEmpty;
  //
  //   return (
  //     <>
  //
  //       <button className={cx(TRANSPARENT, RED)} onClick={this.follow}>
  //
  //         <HeartComp className={ICON} />
  //
  //         <span>
  //           {t([GENERAL, (follow ? SAVED : SAVE)])}
  //         </span>
  //
  //       </button>
  //
  //       <button className={cx(TRANSPARENT, RED)}>
  //
  //         <Details className={ICON} />
  //
  //         <span>
  //           {t([GENERAL, DETAILS])}
  //         </span>
  //
  //       </button>
  //
  //     </>
  //   );
  // }
  //
  // barOwnerActions = () => {
  //   const { t } = this.props;
  //
  //   return (
  //     <button
  //       className={cx(TRANSPARENT, RED)}
  //       onClick={this.openBarEdit}
  //     >
  //
  //       <Pencil className={ICON} />
  //
  //       <span>
  //         {t([PROFILE, BARS, EDIT])}
  //       </span>
  //
  //     </button>
  //   );
  // }

  render() {
    const {
      settings,
      item,
    } = this.props;

    const {
      // longitude,
      // latitude,
      fullLocation,
      name,
    } = item;

    const { distance } = item;

    // if (userLatLong && longitude && latitude) {
    //   const [lat, lng] = userLatLong.split(',');
    //
    //   distance = getDistance({ lat, lng }, {
    //     lat: latitude,
    //     lng: longitude,
    //   });
    // }

    const useKilometers = get(settings, [USE_KILOMETERS]);

    return (
      <div className={cx(GRADIENT, RED, styles.bar)}>

        {distance && (
          <div className={styles.itemTop}>
            {`${round((useKilometers ? distance * 1.609244 : distance), 2)} ${useKilometers ? 'km' : 'miles'}`}
          </div>
        )}

        <h3 className={styles.itemTitle}>
          {name}
        </h3>

        {null
          // <div className={styles.actions}>
          //   {manageBrandButtons ? this.barOwnerActions() : this.barFollowingActions()}
          // </div>
        }

        <div className={styles.more}>
          {fullLocation}
        </div>

      </div>
    );
  }
}

export default withSub(BarInfo, function barInfoSub({ userId }) {
  if (!userId) {
    return emptyArr;
  }

  return [{
    name: SETTINGS,
    props: {
      userId,
    },
  }];
});
