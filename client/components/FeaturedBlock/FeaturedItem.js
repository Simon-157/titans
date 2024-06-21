import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import {
  emptyObj,
  A,
  ASPECT_WRAP,
  BAR,
  BARS,
  BLANK,
  BLOG,
  DIV,
  EVENT,
  EVENTS,
  FILES,
  GA_EVENT,
  IMAGE,
  INFO,
  NEWS,
  REACH,
  TESTIMONIALS,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import { randomIntFromInterval } from 'lib/random';
import { dataLayerPush, getBarImg } from 'client/helpers';
// import EventAttendies from 'components/Profile/ProfilePage/Events/EventAttendies';
// import Files from 'components/Files';
import GameBadge from 'components/GameBadge';
import BarInfo from './BarInfo';
import EventInfo from './EventInfo';
import NewsInfo from './NewsInfo';
import styles from './css/styles.css';

function getNewsItemPath(item) {
  const { path, blogpost } = item;

  const type = blogpost ? BLOG : NEWS;

  return `/${type}/${path}`;
}

function getEventItemPath(item) {
  const { _id, shortUrl } = item;

  return `/event${shortUrl ? `/${shortUrl}` : `ById/${_id}`}`;
}

function getBarItemPath(item) {
  const { _id, shortUrl } = item;

  return `/b${shortUrl ? `ar/${shortUrl}` : `arById/${_id}`}`;
}

const reaches = {};

class FeaturedItem extends Component {
  static displayName = 'FeaturedItem'

  static propTypes = {
    className: PropTypes.string,
    entity: PropTypes.string,
    eventAttendies: PropTypes.bool,
    history: PropTypes.object,
    item: PropTypes.object,
    manageBrandButtons: PropTypes.bool,
    showActionButtons: PropTypes.bool,
    userId: PropTypes.string,
    width: PropTypes.string,
    fade: PropTypes.bool,
    t: PropTypes.func,
  }

  static defaultProps = {
    item: emptyObj,
  }

  int = randomIntFromInterval(1, 11)

  img = `/img/cooldown-placeholder-${this.int}.jpg`

  constructor(props) {
    super(props);

    const { entity } = this.props;

    this.isBar = entity === BARS;
    this.isEvent = entity === EVENTS;
  }

  ref = (c) => {
    const { isBar, isEvent } = this;

    if (!isBar && !isEvent) {
      return;
    }

    if (!c || !global.IntersectionObserver) {
      return;
    }

    const observer = this.observer = new IntersectionObserver(this.observe, {
      threshold: [1],
    });

    observer.observe(c);
  }

  observe = (entries) => {
    if (entries[0].isIntersecting) {
      this.observer.disconnect();

      const { item } = this.props;

      const { _id, barId, name, title } = item;

      if (!_id || reaches[_id]) {
        return;
      }

      reaches[_id] = true;

      const { isBar, isEvent } = this;

      if (isBar) {
        executePrimusRequest(REACH, BAR, { barId: _id });
        dataLayerPush({
          event: GA_EVENT,
          eventCategory: 'Bar Reach',
          eventAction: 'Reach',
          eventLabel: name,
        });
      } else if (isEvent) {
        executePrimusRequest(REACH, EVENT, { eventId: _id, barId });
        dataLayerPush({
          event: GA_EVENT,
          eventCategory: 'Event Reach',
          eventAction: 'Reach',
          eventLabel: title,
        });

        if (reaches[barId]) {
          return;
        }

        reaches[barId] = true;

        executePrimusRequest(REACH, BAR, { barId });
        dataLayerPush({
          event: GA_EVENT,
          eventCategory: 'Bar Reach',
          eventAction: 'Reach',
          eventLabel: name,
        });
      }
    }
  }

  componentWillUnmount() {
    const { observer } = this;

    if (observer) {
      observer.disconnect();
    }
  }

  renderBar = () => {
    const { item } = this.props;

    return this.renderItem(item.img || getBarImg(null, this.int), getBarItemPath, BarInfo);
  }

  renderItem = (img, getItemPath, InfoComp) => {
    const {
      className,
      entity,
      eventAttendies,
      history,
      item,
      manageBrandButtons,
      showActionButtons,
      userId,
      width,
      fade,
      t,
    } = this.props;

    const { _id, external, gameInput, gameName, source } = item;

    const isAnActualItem = getItemPath && _id;

    const gameBadge = gameName || gameInput;

    const Comp = external ? A : (isAnActualItem ? Link : DIV);

    return (
      <Comp
        key={_id}
        className={cx(styles.item, entity, className, {
          [styles.fade]: fade,
        })}
        style={{
          maxWidth: width,
          width,
        }}
        to={isAnActualItem ? getItemPath(item) : null}
        href={external ? source : null}
        rel={external ? 'noopener noreferrer' : null}
        target={external ? BLANK : null}
        ref={this.ref}
      >

        {_id && (
          <>

            <div className={styles.row}>

              <div
                className={cx(styles.img, IMAGE, ASPECT_WRAP)}
                style={{
                  backgroundImage: `url("${process.env.CORDOVA && img.indexOf('/') === 0 ? '.' : ''}${img}")`,
                }}
              />

              {null
                // eventAttendies && (
                //   <EventAttendies eventId={item.id} t={t} />
                // )
              }

              {gameBadge && !eventAttendies && (
                <GameBadge gameName={gameBadge} />
              )}

            </div>

            {InfoComp && (
              <div className={styles.row}>
                <div className={cx(styles.info, INFO)}>
                  <InfoComp
                    history={history}
                    id={_id}
                    item={item}
                    manageBrandButtons={manageBrandButtons}
                    showActionButtons={showActionButtons}
                    userId={userId}
                    t={t}
                  />
                </div>
              </div>
            )}

          </>
        )}

      </Comp>
    );
  }

  renderTestimonial = (img) => {
    const {
      className,
      entity,
      item,
      width,
      fade,
    } = this.props;

    const { name, position, text } = item;

    return (
      <div
        className={cx(styles.item, entity, className, {
          [styles.fade]: fade,
        })}
        style={{
          maxWidth: width,
          width,
        }}
      >

        <div className={styles.person}>

          <div
            className={cx(styles.img, IMAGE)}
            style={{
              backgroundImage: `url("${process.env.CORDOVA && img.indexOf('/') === 0 ? '.' : ''}${img}")`,
            }}
          />

          <div className={styles.personInfo}>

            <div className={styles.position}>
              {position}
            </div>

            <div className={styles.name}>
              {name}
            </div>

          </div>

        </div>

        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: text }}
        />

      </div>
    );
  }

  render() {
    const { entity, item } = this.props;

    let renderFunc = this.renderItem;

    let getItemPath;
    let img;
    let InfoComp;
    switch (entity) {
      case EVENTS:
        getItemPath = getEventItemPath;
        img = item.bookingImage || item.img || this.img;
        InfoComp = EventInfo;
        break;
      case TESTIMONIALS:
        renderFunc = this.renderTestimonial;
      case FILES: // eslint-disable-line no-fallthrough
        img = item.url || this.img;
        InfoComp = null;
        break;
      case BARS:
        return this.renderBar();
      default:
        getItemPath = getNewsItemPath;
        img = item.img || this.img;
        InfoComp = NewsInfo;
    }

    return renderFunc(img, getItemPath, InfoComp);
  }
}

export default withRouter(FeaturedItem);
