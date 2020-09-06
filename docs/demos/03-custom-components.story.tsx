/* eslint no-console: 0 */
import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

import { ReactCompareSlider } from 'react-compare-slider';

import * as config from './config';

export default {
  title: 'Demos/Custom Components',
  component: ReactCompareSlider,
  argTypes: config.argTypes,
};

class DataMap extends React.Component {
  mapRef = React.createRef();

  render() {
    return <Map ref={this.mapRef} {...this.props} />;
  }
}

const GoogleMap = GoogleApiWrapper({
  apiKey: 'AIzaSyAoRpWSXL16EnnFQqFfkRtfMCKJJTMzvk8',
})(DataMap);

const mapStyle = {
  width: '100%',
  height: '100vh',
};

export const GoogleMaps = (args) => {
  const mapOne = React.useRef({
    zoom: 13,
    initialCenter: {
      lat: 34.04008,
      lng: -118.23287,
    },
  });

  const mapTwo = React.useRef({
    ...mapOne.current,
    mapType: 'satellite',
  });

  return (
    <ReactCompareSlider
      itemOne={<GoogleMap {...mapOne.current} />}
      itemTwo={<GoogleMap {...mapTwo.current} />}
      style={mapStyle}
      {...args}
    />
  );
};

GoogleMaps.args = {
  onlyHandleDraggable: true,
};
