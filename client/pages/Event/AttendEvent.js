import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import size from 'lodash/size';
import {
  emptyArr,
  emptyObj,
  emptyNullFunc,
  EVENT,
  FLEX,
  START,
} from 'defaults';
import { withSub } from 'client/lib/sub';
import { getPromoCode } from 'reducers/code/selectors';
import Clock from 'assets/img/clockSimple.svg';
import Download from 'assets/img/download-new.svg';
import Location from 'assets/img/marker-icon.svg';
import styles from './css/styles.css';

class AttendEvent extends Component {
  static propTypes = {
    event: PropTypes.object,
    bar: PropTypes.object,
    eventCode: PropTypes.object,
    promo: PropTypes.object,
    t: PropTypes.func,
  }

  static defaultProps = {
    bar: emptyObj,
    event: emptyObj,
    eventCode: emptyObj,
    promo: emptyObj,
    t: emptyNullFunc,
  }

  render() {
    const {
      event: {
        endAt = dayjs(),
        startAt = dayjs(),
        title,
      },
      eventCode,
      bar: {
        name: barName,
        fullLocation,
      },
      promo: {
        desc: promoDesc,
        name: promoName,
      },
      t,
    } = this.props;

    const { code, img } = eventCode;

    const file = img && `/api/file/${img.split('/').splice(4).join('/')}`;

    const bookingTime = `${startAt.format('MMMM Do, YYYY')} | ${startAt.format('H:mm')} - ${endAt.format('H:mm')}`;

    return (
      <div className={styles.attendEventDialogWrap}>

        <p className={styles.attendJoined}>
          {t([EVENT, 'joined'])}
        </p>

        <p className={styles.title}>
          {title}
        </p>

        <div>

          <div className={cx(FLEX, styles.bookingDetailsWrap)}>

            <Clock className={styles.clockIcon} />

            <div>

              <p
                className={cx(styles.textMedium, styles.bookingInfoTitle)}
              >
                {t([EVENT, START])}
              </p>

              <p className={cx(styles.textMedium, styles.bookingDate)}>
                {bookingTime}
              </p>

            </div>

          </div>

          <div className={cx(FLEX, styles.bookingDetailsWrap)}>

            <Location className={styles.locationIcon} />

            <div>

              <div className={FLEX}>

                <p
                  className={cx(styles.textMedium, styles.bookingInfoTitle)}
                >
                  {t([EVENT, 'venue'])}
                </p>

                <span
                  className={cx(styles.textMedium, styles.bookingInfoBrand)}
                >
                  {` ${barName}`}
                </span>

              </div>

              <p className={cx(styles.textMedium, styles.bookingDate)}>
                {fullLocation}
              </p>

            </div>

          </div>

          {size(eventCode) !== 0 && (
            <div className={cx(FLEX, styles.promoQrWrap)}>

              <div>

                <img className={styles.promoQR} src={file} alt={''} />

                <p
                  className={cx(styles.promoCode, styles.textMedium)}
                >
                  {code}
                </p>

              </div>

              <div className={styles.promoInfo}>

                <p className={cx(styles.textMedium, styles.joinText)}>
                  <span>
                    {`${promoName}.`}
                  </span>
                </p>

                <p className={cx(styles.textMedium, styles.joinText)}>
                  {promoDesc}
                </p>

                <a
                  download={`${code}.svg`}
                  href={file}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <button
                    className={cx(styles.whiteButton, styles.promoButton)}
                  >

                    <Download className={styles.joinBtnIcon} />

                    {t([EVENT, 'downloadQr'])}

                  </button>
                </a>

              </div>

            </div>
          )}

        </div>

      </div>
    );
  }
}

export default withSub(AttendEvent, ({
  event: { id } = emptyObj, userId,
}) => {
  if (!userId) {
    return emptyArr;
  }

  const props = {
    eventId: id,
    userId,
  };

  return [{
    name: 'codeForEvent',
    props,
  }];
}, function mapStateToProps(state, { promo: { _id } = emptyObj, userId }) {
  return {
    eventCode: getPromoCode(state, { promoId: _id, userId }),
  };
});
