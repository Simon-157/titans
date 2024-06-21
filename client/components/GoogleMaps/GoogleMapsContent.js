import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { emptyFunc } from 'defaults';

class GoogleMapsContent extends Component {
  static displayName = 'GoogleMapsContent'

  static propTypes = {
    defaultZoom: PropTypes.number,
    markers: PropTypes.array,
    showMarker: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
    getRef: PropTypes.func,
    onBoundsChanged: PropTypes.func,
  }

  static defaultProps = {
    defaultZoom: 17,
    onBoundsChanged: emptyFunc,
  }

  bounds

  constructor(props) {
    super(props);

    this.onBoundsChanged = debounce(this.onBoundsChanged, 250);
  }

  ref = (c) => {
    const { getRef } = this.props;

    this.c = c;

    if (isFunction(getRef)) {
      getRef(c);
    }
  }

  onBoundsChanged = () => {
    if (!this.c) {
      return;
    }

    const bounds = this.c.getBounds();

    if (isEqual(this.bounds, bounds)) {
      return;
    }

    const { onBoundsChanged } = this.props;

    this.bounds = bounds;

    onBoundsChanged(bounds);
  }

  render() {
    const {
      defaultZoom,
      lat,
      lng,
      markers,
      showMarker,
    } = this.props;

    if (!markers && (!lat || !lng)) {
      return null;
    }

    const center = lat && lng ? { lat, lng } : null;

    return (
      <GoogleMap
        ref={this.ref}
        center={center}
        defaultZoom={defaultZoom}
        defaultCenter={center}
        onBoundsChanged={this.onBoundsChanged}
      >

        {markers && (map(markers, (marker, key) => {
          const { children, labelAnchor, labelClass, onClick } = marker;

          return (
            <MarkerWithLabel
              key={key}
              labelAnchor={labelAnchor}
              labelClass={labelClass}
              position={marker}
              onClick={onClick}
            >
              <div>
                {children}
              </div>
            </MarkerWithLabel>
          );
        }))}

        {!markers && showMarker && <Marker position={{ lat, lng }} />}

      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(GoogleMapsContent));
