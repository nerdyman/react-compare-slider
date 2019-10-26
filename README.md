[![License](https://img.shields.io/npm/l/react-compare-slider)](./README.md) [![npm](https://img.shields.io/npm/v/react-compare-slider)](https://npmjs.com/package/react-compare-slider) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-compare-slider)](https://bundlephobia.com/result?p=react-compare-slider)
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
- [Teeny-tiny](https://bundlephobia.com/result?p=react-compare-slider), only one ponyfill dependency
- Type safe

## Requirements

- React 16.8+

## Demo

### CodeSandbox

**Note**: The CodeSandbox code view degrades performance slightly, see _Demo_ links for real-world performance.

- Landscape, Portrait with custom handle
    - [Demo](<https://9si6l.codesandbox.io/>)
    - [Code](<https://codesandbox.io/s/react-compare-slider-simple-example-9si6l>)

## Usage

### Install

```sh
yarn add react-compare-slider
# OR
npm install react-compare-slider
```

### Use it!

```jsx
import { ReactCompareSlider } from 'react-compare-slider';

<ReactCompareSlider
    itemOne={<img src="..." alt="Image one" />}
    itemTwo={<img src="..." alt="Image two" />}
/>
```

## Props & docs

### Props

| Prop | Type | Required | Default value | Description |
|------|------|:--------:|---------------|-------------|
| `handle`    | `ReactNode` |   | `undefined` | Custom handle component |
| `itemOne`   | `ReactNode` | ✓ | `undefined` | First component to show in slider |
| `itemTwo`   | `ReactNode` | ✓ | `undefined` | Second component to show in slider |
| `onChange`  | `function`  |   | `undefined` | Callback on position change, returns current position as argument `(position) => { ... }` |
| `position`  | `number`    |   | `50` | Initial percentage position of divide (`0-100`) |
| `portrait`  | `boolean`   |   | `undefined` | Whether to use portrait orientation |

### `ReactCompareSliderImage`

`ReactCompareSliderImage` is a standalone image component that detects whether the browser supports the `object-fit` CSS property, if not it will apply a background image to achieve the same effect. It calls `styleFitContainer` internally and will set `background-size`, `background-position` and `background-image` if they have not already been defined in a passed `style` prop.

#### Props

`ReactCompareSliderImage` supports all attributes assignable to an `img` component, in addition to the following:

| Prop | Type | Required | Default value | Description |
|------|------|:--------:|---------------|-------------|
| `fallbackEnable`    | `boolean` |   | `true` | Whether to enable fallback background |

#### Example

Standalone:

```jsx
import { ReactCompareSliderImage } from 'react-compare-slider';

// `src` will be used as background image on unsupported browsers
<ReactCompareSliderImage src="..." />

// `backgroundImage` will be used as background image on unsupported browsers
<ReactCompareSliderImage src="..." style={{ backgroundImage: 'url(...)' }} />
```

Within slider:

```jsx
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

<ReactCompareSlider
    itemOne={<ReactCompareSliderImage src="..." alt="Image one" />}
    itemTwo={<ReactCompareSliderImage src="..." alt="Image two" />}
/>
```

### `styleFitContainer`

The `styleFitContainer` utility makes any child media component (`img`, `picture`, `video`, etc.) fill its parent and maintain the correct aspect ratio. It returns a React `style` object and accepts a
CSS object as an argument and defaults to `object-fit` to `cover`.

#### Example

Fill a full width/height container:

```jsx
import { styleFitContainer } from 'react-compare-slider';

// ...

<div style={{ width: '100vw', height: '100vh' }}>
    <video 
        style={{ 
            ...styleFitContainer({
                objectFit: 'contain', 
                objectPosition: 'center',
            }) 
        }} 
        // ...
    />
</div>
```

## Notes

Bootstrapped with [TSDX](<https://github.com/palmerhq/tsdx>).
