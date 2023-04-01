import { GoogleMap as GoogleMapBase, GoogleMapProps, useJsApiLoader } from '@react-google-maps/api';
import { StoryObj } from '@storybook/react';
import React from 'react';
import { ReactCompareSlider, ReactCompareSliderDetailedProps } from 'react-compare-slider';

import { argTypes, args } from '../config';

export default {
  title: 'Demos/GoogleMaps',
  component: ReactCompareSlider,
  args,
  argTypes,
};

const useGoogleMap = () => {
  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return { onLoad, onUnmount, map };
};

const GoogleMap: React.FC<GoogleMapProps & { isLoaded: boolean }> = ({ isLoaded, ...props }) => {
  if (!isLoaded) return null;

  return <GoogleMapBase {...props} />;
};

const sharedMapProps: GoogleMapProps = {
  zoom: 14,
  tilt: 0,
  center: { lat: 54.9754478, lng: -1.6073616 },
  mapContainerStyle: {
    width: '100vw',
    height: '100vh',
  },
};

export const GoogleMaps: StoryObj<ReactCompareSliderDetailedProps> = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAoRpWSXL16EnnFQqFfkRtfMCKJJTMzvk8',
  });

  const mapOne = useGoogleMap();
  const mapTwo = useGoogleMap();
  const [zoom, setZoom] = React.useState(sharedMapProps.zoom);

  return (
    <ReactCompareSlider
      {...props}
      itemOne={
        <GoogleMap
          {...sharedMapProps}
          {...mapOne}
          isLoaded={isLoaded}
          onDrag={() => mapTwo?.map?.setCenter(mapOne.map?.getCenter())}
          onZoomChanged={() => {
            setZoom(mapOne.map?.zoom || sharedMapProps.zoom);
            mapTwo?.map?.setCenter(mapOne.map?.getCenter());
          }}
          zoom={zoom}
        />
      }
      itemTwo={
        <GoogleMap
          {...sharedMapProps}
          {...mapTwo}
          isLoaded={isLoaded}
          onDrag={() => mapOne?.map?.setCenter(mapTwo.map?.getCenter())}
          onZoomChanged={() => {
            setZoom(mapTwo.map?.zoom || sharedMapProps.zoom);
            mapOne?.map?.setCenter(mapTwo.map?.getCenter());
          }}
          mapTypeId="satellite"
          zoom={zoom}
        />
      }
    />
  );
};

GoogleMaps.args = {
  style: { width: '100%', height: '100vh' },
  onlyHandleDraggable: true,
};
