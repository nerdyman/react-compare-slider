[![Build Status](https://github.com/nerdyman/react-compare-slider/workflows/node-ci/badge.svg)](https://github.com/nerdyman/react-compare-slider/workflows/node-ci)

# React Compare Slider

Compare two components, side-by-side or top-to-toe.

## Features

- Supports responsive images, videos, any React components
- Supports landscape and portrait orientations
- Simple API
- Responsive, fluid
- Fully customisable
- Works in IE11+
- Teeny-tiny, no dependencies
- Type safe

## Demo

- [Storybook](<https://festive-darwin-fab443.netlify.com/>)

## Usage

### Install

```sh
yarn add react-compare-slider
# OR
npm install react-compare-slider
```

### Use it!

Pass two components, you _may_ want the components
to fill the container. To do this you can use the `styleFitContainer` utility which returns a CSS style object, it accepts any `object-fit` property.

```jsx
import { ReactComareSlider, styleFitContainer } from 'react-compare-slider';

// Standard image to fill container and maintain aspect ratio
const Img = ({ style, ...props }) => (
    <img
        style={{ ...styleFitContainer(), ...style }}
        {...props}
    />
);

// Render the component
const App = () => (
    <ReactCompareImage
        itemOne={
            <Img
                alt="Campsite at night"
                src="https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg"
                style={{ filter: 'blur(20px)' }}
            />
        }
        itemTwo={
            <Img
                alt="Campsite at night blurred"
                src="https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg"
            />
        }
    >
);
```

## Props & docs

### Props

| Prop | Type | Required | Default value | Description |
|------|------|:--------:|---------------|-------------|
| `handle`    | `ReactNode` |   | `undefined` | Custom handle component |
| `itemOne`   | `ReactNode` | ✓ | `undefined` | First component to show in slider |
| `itemTwo`   | `ReactNode` | ✓ | `undefined` | Second component to show in slider |
| `position`  | `number`    |   | `50` | Initial percentage position of divide (`0-100`) |
| `portrait`  | `boolean`   |   | `undefined` | Whether to use portrait orientation |

### `styleFitContainer`

The `styleFitContainer` utility returns a React `style` object. It accepts a
CSS object as an argument and defaults to `object-fit` to `cover`.

Example:

```jsx
<video 
    style={{ ...styleFitContainer({ objectFit: 'contain' }) }} 
    src="..."
/>
```

## Notes

Bootstrapped with [TSDX](<https://github.com/palmerhq/tsdx>).
