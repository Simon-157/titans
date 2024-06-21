import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import find from 'lodash/find';
import {
  emptyObj,
  emptyNullFunc,
  ATTEND,
  BAR,
  BLANK,
  EVENT,
  FLEX,
  GENERAL,
  H3_SMALL,
  JOIN,
  SHARE,
  TRANSPARENT,
  UNATTEND,
  VIDEO_WRAP,
  title as webSiteTitle,
} from 'defaults';
import { randomIntFromInterval } from 'lib/random';
import { withSub } from 'client/lib/sub';
import { executePrimusRequest } from 'client/request';
import GoogleMaps from 'components/GoogleMaps';
import Modal from 'components/Modal';
import SocialShare from 'components/SocialShare';
import { getBar } from 'reducers/bar/selectors';
import { getEventAttendances } from 'reducers/eventAttendance/selectors';
import { getPromo } from 'reducers/promo/selectors';
import Check from 'assets/img/checkIcon.svg';
import Clock from 'assets/img/clockSimple.svg';
import Close from 'assets/img/close-transparent.svg';
import Location from 'assets/img/marker-icon.svg';
import AttendEvent from './AttendEvent';
import styles from './css/styles.css';

class EventContent extends Component {
  static displayName = 'EventContent'

  static propTypes = {
    attendances: PropTypes.array,
    bar: PropTypes.object,
    event: PropTypes.object,
    promo: PropTypes.object,
    id: PropTypes.string,
    userId: PropTypes.string,
    t: PropTypes.func,
  }

  static defaultProps = {
    event: emptyObj,
    t: emptyNullFunc,
  }

  state = {
    attendEvent: false,
  }

  bar = {}

  img = `/img/cooldown-placeholder-${randomIntFromInterval(1, 11)}.jpg`

  constructor(props) {
    super(props);

    this.prepare();
  }

  componentWillReceiveProps(newProps) {
    this.prepare(newProps);
  }

  prepare(props = this.props) {
    this.now = dayjs();

    if (!global.localStorage) {
      return;
    }

    const { attendances, id, userId } = props;

    if (userId) {
      const attend = localStorage.getItem(ATTEND);

      if (attend === id) {
        this.attend();

        localStorage.removeItem(ATTEND);
      }
    }

    const attendance = find(attendances, (a) => a.userId === userId);

    if (attendance) {
      const congratz = localStorage.getItem(`congratz-${id}`);

      if (!congratz) {
        this.state.congratz = true;
      }
    }
  }

  toggleAttendEvent = () => {
    const { attendEvent } = this.state;

    this.setState({ attendEvent: !attendEvent });
  }

  attend = () => {
    const { id, userId } = this.props;

    if (!id || !userId) {
      return;
    }

    executePrimusRequest(ATTEND, EVENT, { eventId: id });
  }

  unattend = () => {
    const { id, userId } = this.props;

    if (!id || !userId) {
      return;
    }

    executePrimusRequest(UNATTEND, EVENT, { eventId: id });
  }

  closeCongratz = () => {
    this.setState({
      congratz: false,
    });
  }

  renderJoinBtn = () => {
    const {
      attendances,
      event: {
        endAt,
        userId: ownerId,
      },
      promo: {
        name: promoName,
      },
      userId,
      t,
    } = this.props;

    const { now } = this;

    const isMyEvent = ownerId === userId;

    if (now.diff(endAt) > 0) {
      return (
        <button
          className={styles.joinBtn}
          disabled
        >

          <Close className={styles.joinBtnIcon} />

          <span>
            {t([EVENT, 'ended'])}
          </span>

        </button>
      );
    }

    if (isMyEvent) {
      return (
        <button
          className={cx(styles.joinBtn, styles.joined)}
          disabled
        >

          <Check className={styles.joinBtnIcon} />

          <span>
            {t([EVENT, 'owner'])}
          </span>

        </button>
      );
    }

    const attendance = find(attendances, (a) => a.userId === userId);

    if (!attendance && (now.diff(endAt) < 0)) {
      return (
        <button
          className={styles.joinBtn}
          onClick={this.attend}
        >

          <Check className={styles.joinBtnIcon} />

          <span>
            {t([EVENT, JOIN])}
          </span>

        </button>
      );
    }

    if (attendance && promoName) {
      return (
        <>

          <button
            className={cx(styles.joinBtn, styles.joined)}
            onClick={this.toggleAttendEvent}
          >

            <Check className={styles.joinBtnIcon} />

            <span>
              {t([EVENT, 'downloadQr'])}
            </span>

          </button>

          <button
            className={styles.joinBtn}
            onClick={this.unattend}
          >

            <Close className={styles.joinBtnIcon} />

            <span>
              {t(['attendCancel'])}
            </span>

          </button>

        </>
      );
    }

    if (attendance && !promoName) {
      return (
        <button
          className={styles.joinBtn}
          onClick={this.cancelAttend}
        >

          <Close className={styles.joinBtnIcon} />

          <span>
            {t(['attendCancel'])}
          </span>

        </button>
      );
    }

    return null;
  }

  render() {
    const { bar, event, promo, userId, t } = this.props;

    const { attendEvent } = this.state;

    const {
      bookingImage,
      description = '',
      gameName,
      title,
    } = event;

    const { endAt, startAt } = event;

    const {
      fullLocation,
      latitude,
      longitude,
      name: barName,
      shortUrl,
    } = bar;

    const {
      desc: promoDesc,
      img: promoImg,
      name: promoName,
    } = promo;

    const bookingImg = bookingImage || this.img;

    const bookingTime = startAt ? `${startAt.format('dddd, MMMM Do, YYYY')} | ${startAt.format('H:mm')} - ${endAt.format('H:mm')}` : null;

    const shareText = `${title} event on ${webSiteTitle}`;

    return (
      <>

        <div className={styles.bookingInfoWrap}>

          <div
            className={cx(VIDEO_WRAP, styles.bookingImg)}
            src={bookingImg}
            style={{
              backgroundImage: `url("${process.env.CORDOVA && bookingImg.indexOf('/') === 0 ? '.' : ''}${bookingImg}")`,
            }}
          />

          <div className={styles.bookingInfo}>

            {gameName && (
              <p className={styles.gameName}>
                {gameName}
              </p>
            )}

            <div className={H3_SMALL}>
              {title}
            </div>

            <div className={cx(styles.textMedium, styles.desc)}>
              {description.split('\n').map((line, key) => (
                <div
                  key={key} // eslint-disable-line react/no-array-index-key
                  className={styles.descLine}
                >
                  {line}
                </div>
              ))}
            </div>

            <div className={styles.details}>

              <Clock className={styles.icon} />

              <div>

                <p className={cx(styles.textMedium, styles.infoTitle)}>
                  {t([EVENT, 'start'])}
                </p>

                <p className={cx(styles.textMedium, styles.bookingDate)}>
                  {bookingTime}
                </p>

              </div>

            </div>

            <div className={styles.details}>

              <Location className={styles.icon} />

              <div>

                <div className={FLEX}>

                  <p className={cx(styles.textMedium, styles.infoTitle)}>
                    {t([EVENT, 'venue'])}
                  </p>

                  <span
                    className={cx(styles.textMedium, styles.bar)}
                  >
                    <Link to={`/bar/${shortUrl}`}>
                      {barName}
                    </Link>
                  </span>

                </div>

                <p className={cx(styles.textMedium, styles.bookingDate)}>
                  {fullLocation}
                </p>

              </div>

            </div>

            <div className={styles.btns}>
              <a
                href={`https://www.google.com/maps/place/${fullLocation}`}
                target={BLANK}
              >
                <button className={cx(styles.btn, TRANSPARENT)}>
                  {t([GENERAL, 'getDirections'])}
                </button>
              </a>
            </div>

            <div className={styles.bookingInfoMap}>
              {global.__CLIENT__ && (
                <GoogleMaps
                  height={360}
                  lat={latitude}
                  lng={longitude}
                  showMarker
                />
              )}
            </div>

          </div>

        </div>

        <div className={styles.joinBlock}>

          <div className={styles.joinTop}>

            <p className={cx(styles.textMedium, styles.joinText)}>

              <span>
                {t(['free'])}
              </span>

              <span>
                {t(['joinUs'])}
              </span>

            </p>

          </div>

          {this.renderJoinBtn()}

          <SocialShare
            className={cx(styles.half, styles.shareButton)}
            text={shareText}
            t={t}
          >
            {t([GENERAL, SHARE])}
          </SocialShare>

          {promoName && (
            <div
              className={cx(styles.promoBlock, {
                [styles.active]: promoName,
              })}
            >

              {promoImg && (
                <img
                  alt={''}
                  className={styles.joinPromoImg}
                  src={promoImg}
                />
              )}

              <p className={cx(styles.textMedium, styles.joinText)}>

                <span>
                  {`${promoName}: `}
                </span>

                <span>
                  {promoDesc}
                </span>

              </p>

            </div>
          )}

          {attendEvent && (
            <Modal
              className={styles.attendEventDialog}
              onClose={this.toggleAttendEvent}
            >
              <AttendEvent
                event={event}
                bar={bar}
                promo={promo}
                userId={userId}
                t={t}
              />
            </Modal>
          )}

        </div>

      </>
    );
  }
}

export default withSub(EventContent, ({
  event: { barId } = emptyObj,
  id,
}) => {
  return [{
    name: 'attendingEvent',
    props: {
      eventId: id,
    },
  }, {
    name: BAR,
    props: { barId },
  }, {
    name: 'managersForBar',
    props: { barId },
  }];
}, function mapStateToProps(state, { event: { barId, promoId } = emptyObj, id }) {
  return {
    attendances: getEventAttendances(state, id),
    bar: getBar(state, barId),
    promo: getPromo(state, promoId),
  };
});
