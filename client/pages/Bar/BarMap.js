import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import find from 'lodash/find';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import {
  emptyArr,
  BAR,
  CONTAINER,
  MAP,
  MARKERS,
} from 'defaults';
import { executePrimusRequest } from 'client/request';
import { randomIntFromInterval } from 'lib/random';
import GoogleMaps from 'components/GoogleMaps';
import DotBgShape from 'assets/img/dot-bg-shape.svg';
import styles from './css/styles.css';

class BarMap extends Component {
  static displayName = 'BarMap'

  static propTypes = {
    className: PropTypes.string,
    history: PropTypes.object,
    defaultZoom: PropTypes.number,
    img: PropTypes.string,
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    shortUrl: PropTypes.string,
  }

  state = {
    bars: this.props.img ? [{
      latitude: this.props.lat,
      longitude: this.props.lng,
      img: this.props.img,
      shortUrl: this.props.shortUrl,
    }] : [],
  }

  img = {}

  centered = false

  onBoundsChanged = (bounds) => {
    if (!bounds) {
      return;
    }

    const boundsNeLatLng = bounds.getNorthEast();
    const boundsSwLatLng = bounds.getSouthWest();

    const data = {
      north: boundsNeLatLng.lat(),
      south: boundsSwLatLng.lat(),
      east: boundsNeLatLng.lng(),
      west: boundsSwLatLng.lng(),
    };

    executePrimusRequest(MARKERS, BAR, data, this.cb);
  }

  cb = (err, bars) => {
    if (err) {
      return;
    }

    const { lat, lng, img, shortUrl } = this.props;

    this.setState({
      bars: [
        ...(bars || emptyArr),
        ...(img ? [{
          latitude: lat,
          longitude: lng,
          img,
          shortUrl,
        }] : emptyArr),
      ],
    });
  }

  getRef = (c) => {
    if (global.google && !this.centered && c) {
      const googleMap = find(c.context);

      if (isFunction(googleMap.setCenter)) {
        const { lat, lng } = this.props;

        googleMap.setCenter(new global.google.maps.LatLng(lat, lng));

        this.centered = true;
      }
    }
  }

  renderMarker = (bar) => {
    const { history } = this.props;

    const { id, latitude, longitude, shortUrl } = bar;

    let { img } = bar;

    if (!img || img.indexOf('/img/default-brand-picture') === 0) {
      img = this.img[id] = this.img[id] || `/img/cooldown-placeholder-${randomIntFromInterval(1, 11)}.jpg`;
    }

    if (process.env.CORDOVA && img.indexOf('/') === 0) {
      img = `.${img}`;
    }

    return {
      children: (
        <div className={styles.marker}>
          <div
            className={styles.markerCont}
            style={{
              backgroundImage: `url("${img}")`,
            }}
          />
        </div>
      ),
      labelAnchor: { x: 20, y: 45 },
      labelClass: styles.markerLabel,
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
      onClick: shortUrl ? () => {
        history.push(`/bar/${bar.shortUrl}`);
      } : null,
    };
  }

  render() {
    const { className, defaultZoom, title } = this.props;

    const { bars } = this.state;

    return (
      <div className={cx(MAP, styles.mapWrap, className)}>

        <div className={CONTAINER}>

          <div className={styles.mapContent}>
            {global.__CLIENT__ && (
              <GoogleMaps
                defaultZoom={defaultZoom}
                height={640}
                markers={map(bars, this.renderMarker)}
                getRef={this.getRef}
                onBoundsChanged={this.onBoundsChanged}
                showMarker
              />
            )}
          </div>

          <div className={styles.mapRight}>
            {title && (
              <div className={styles.find}>
                {title}
              </div>
            )}
          </div>

        </div>

        <DotBgShape className={styles.mapDots} />

      </div>
    );
  }
}

export default BarMap;
