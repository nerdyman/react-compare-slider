<div align="center">
    <h1>React Compare Slider</h1>
    <p>Compare two components, side-by-side or top-to-toe.</p>

<a href="https://github.com/nerdyman/react-compare-slider/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-compare-slider.svg" alt="License MIT" />
</a>
<a href="https://npmjs.com/package/react-compare-slider">
    <img src="https://img.shields.io/npm/v/react-compare-slider.svg" alt="NPM package" />
</a>
<a href="https://bundlephobia.com/result?p=react-compare-slider">
    <img src="https://img.shields.io/bundlephobia/minzip/react-compare-slider.svg" alt="Bundle size" />
</a>
<br/>
<a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild">
    <img src="https://img.shields.io/github/workflow/status/nerdyman/react-compare-slider/build" alt="Build Status" />
</a>
<a href="https://codeclimate.com/github/nerdyman/react-compare-slider">
    <img src="https://img.shields.io/codeclimate/coverage/nerdyman/react-compare-slider" alt="Coverage" />
</a>
<a href="https://react-compare-slider.netlify.com/">
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

See Storybook for [documentation](https://react-compare-slider.netlify.com/?path=/docs/docs-intro--page) and [demos](https://react-compare-slider.netlify.com/?path=/docs/demos-images--default).

See the [Image Playground](https://react-compare-slider.netlify.com/?path=/docs/demos-images--playground)
to experiment with image props using the "Knobs" tab.


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

See the [docs](https://react-compare-slider.netlify.com/?path=/docs/docs-intro--page) for advanced examples.

## Props

| Prop | Type | Required | Default value | Description |
|------|------|:--------:|---------------|-------------|
| `handle`    | `ReactNode` |   | `undefined` | Custom handle component |
| `itemOne`   | `ReactNode` | ✓ | `undefined` | First component to show in slider |
| `itemTwo`   | `ReactNode` | ✓ | `undefined` | Second component to show in slider |
| `onPositionChange`  | `function`  |   | `undefined` | Callback on position change, returns current position as argument `(position) => { ... }` |
| `position`  | `number`    |   | `50` | Initial percentage position of divide (`0-100`) |
| `portrait`  | `boolean`   |   | `undefined` | Whether to use portrait orientation |

See the [API docs](https://react-compare-slider.netlify.com/?path=/docs/docs-api--page) for more information.

## Extending

### Custom Components

Custom components can get the same base styles as `ReactCompareSliderImage` 
by using the `styleFitContainer` CSS utility. See the [styleFitContainer docs](https://react-compare-slider.netlify.com/?path=/docs/docs-api--page#stylefitcontainer)
for more information.

### Images

See the [Images docs](https://react-compare-slider.netlify.com/?path=/docs/docs-images--page) for more information.

## Requirements

- React 16.8+

## Notes

Bootstrapped with [TSDX](<https://github.com/palmerhq/tsdx>).
