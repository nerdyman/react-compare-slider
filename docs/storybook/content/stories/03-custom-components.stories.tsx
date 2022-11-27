import { GoogleApiWrapper, Map } from 'google-maps-react';
import React from 'react';
import { ReactCompareSlider } from 'react-compare-slider';

import { argTypes, args } from './config';

export default {
  title: 'Demos/Custom Components',
  component: ReactCompareSlider,
  args,
  argTypes,
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

export const GoogleMaps = ({ onlyHandleDraggable = true, ...props }) => {
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
      {...props}
      itemOne={<GoogleMap {...mapOne.current} />}
      itemTwo={<GoogleMap {...mapTwo.current} />}
      onlyHandleDraggable={onlyHandleDraggable}
      style={mapStyle}
    />
  );
};

GoogleMaps.args = { boundsPadding: 0, onlyHandleDraggable: true };
