import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emptyNullFunc, googleMapURL } from 'defaults';

let GoogleMapsContent = emptyNullFunc;

class GoogleMaps extends Component {
  static displayName = 'GoogleMaps'

  static propTypes = {
    defaultZoom: PropTypes.number,
    markers: PropTypes.array,
    showMarker: PropTypes.bool,
    lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.number,
    getRef: PropTypes.func,
    onBoundsChanged: PropTypes.func,
  }

  static defaultProps = {
    showMarker: true,
    height: 250,
  }

  state = {}

  constructor(props) {
    super(props);

    if (GoogleMapsContent === emptyNullFunc) {
      import('./GoogleMapsContent').then((m) => {
        GoogleMapsContent = m.default;

        this.forceUpdate();
      });
    }
  }

  // google might not be defined in some rare cases, so we do not want our app to crash, only hide map in this case
  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return null;
    }

    const {
      defaultZoom,
      markers,
      showMarker,
      lat,
      lng,
      height,
      getRef,
      onBoundsChanged,
    } = this.props;

    return (
      <GoogleMapsContent
        defaultZoom={defaultZoom}
        markers={markers}
        showMarker={showMarker}
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `${height}px` }} />}
        containerElement={<div style={{ height: `${height}px` }} />}
        mapElement={<div style={{ height: '100%' }} />}
        lat={Number(lat)}
        lng={Number(lng)}
        getRef={getRef}
        onBoundsChanged={onBoundsChanged}
      />
    );
  }
}

export default GoogleMaps;
