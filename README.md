<div align="center">
    <h1>React Compare Slider</h1>
    <p>Compare two components, side-by-side or top-to-toe.</p>

<a href="https://github.com/nerdyman/react-compare-slider/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-compare-slider.svg" alt="License MIT">
</a>
<a href="https://npmjs.com/package/react-compare-slider">
    <img src="https://img.shields.io/npm/v/react-compare-slider.svg" alt="NPM package">
</a>
<a href="https://bundlephobia.com/result?p=react-compare-slider">
    <img src="https://img.shields.io/bundlephobia/minzip/react-compare-slider.svg" alt="Bundle size">
</a>
<br/>
<a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild">
    <img src="https://img.shields.io/github/workflow/status/nerdyman/react-compare-slider/build" alt="Build Status">
</a>
<a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild">
    <img src="https://img.shields.io/codeclimate/coverage/nerdyman/react-compare-slider" alt="Build Status">
</a>
<a href="https://festive-darwin-fab443.netlify.com/">
    <img src="https://img.shields.io/badge/demos-🚀-blue.svg" alt="Demos" />
</a>
</div>

---

## Features

- Supports responsive images, videos, any React components
- Supports landscape and portrait orientations
- Simple API
- Unopinionated & fully customizable &ndash; optionally use your own components and styles
- Responsive, fluid
- Works in IE11+
- [Teeny-tiny](https://bundlephobia.com/result?p=react-compare-slider), only one ponyfill dependency
- Type safe

## Demo

See Storybook for [documentation](https://festive-darwin-fab443.netlify.com/?path=/docs/docs-intro--page) and [demos](https://festive-darwin-fab443.netlify.com/?path=/docs/demos-images--default).

## Usage

### Install

```sh
yarn add react-compare-slider
# OR
npm install react-compare-slider
```

### Basic Image Usage

You *may* use `ReactCompareSliderImage` to render images or use your own custom
components.

```jsx
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

<ReactCompareSlider
    itemOne={<ReactCompareSliderImage src="..." srcSet="..." alt="Image one" />}
    itemTwo={<ReactCompareSliderImage src="..." srcSet="..." alt="Image two" />}
/>
```

### Advanced Usage

See the [docs](https://festive-darwin-fab443.netlify.com/?path=/docs/docs-intro--page) for advanced examples.

## Props

| Prop | Type | Required | Default value | Description |
|------|------|:--------:|---------------|-------------|
| `handle`    | `ReactNode` |   | `undefined` | Custom handle component |
| `itemOne`   | `ReactNode` | ✓ | `undefined` | First component to show in slider |
| `itemTwo`   | `ReactNode` | ✓ | `undefined` | Second component to show in slider |
| `onPositionChange`  | `function`  |   | `undefined` | Callback on position change, returns current position as argument `(position) => { ... }` |
| `position`  | `number`    |   | `50` | Initial percentage position of divide (`0-100`) |
| `portrait`  | `boolean`   |   | `undefined` | Whether to use portrait orientation |

See the [API docs](https://festive-darwin-fab443.netlify.com/?path=/docs/docs-api--page) for detailed information.

## Extending

### `ReactCompareSliderImage`

`ReactCompareSliderImage` is a standalone image component that detects whether the browser supports the `object-fit` CSS property, if not it will apply a background image to achieve the same effect. It will set `background-size`, `background-position` and `background-image` if they have not already been defined in a passed `style` prop.

#### `ReactCompareSliderImage` Props

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

### `styleFitContainer`

The `styleFitContainer` utility makes any child media component (`img`, `picture`, `video`, etc.) fill its parent and maintain the correct aspect ratio. It returns a React `style` object and accepts a
CSS object as an argument and defaults to `object-fit` to `cover`.

#### Example

Fill a full width/height container:

```jsx
import { styleFitContainer } from 'react-compare-slider';

<div style={{ width: '100vw', height: '100vh' }}>
    <video 
        style={{ 
            ...styleFitContainer({
                objectFit: 'contain', 
                objectPosition: 'center',
            }) 
        }} 
    />
</div>
```

## Requirements

- React 16.8+

## Notes

Bootstrapped with [TSDX](<https://github.com/palmerhq/tsdx>).
