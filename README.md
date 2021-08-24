<div align="center">
  <h1>React Compare Slider</h1>
  <p>Compare two components side-by-side or top-to-toe.</p>

[![Example](./example/default-handle-capture.gif)](https://codesandbox.io/s/react-compare-slider-simple-example-9si6l?file=/src/App.jsx)

<a href="https://github.com/nerdyman/react-compare-slider/blob/master/LICENSE">
  <img src="https://img.shields.io/npm/l/react-compare-slider.svg" alt="License MIT" />
</a>
<a href="https://npmjs.com/package/react-compare-slider">
  <img src="https://img.shields.io/npm/v/react-compare-slider.svg" alt="NPM package" />
</a>
<a href="https://bundlephobia.com/result?p=react-compare-slider">
  <img src="https://img.shields.io/bundlephobia/minzip/react-compare-slider.svg?color=brightgreen" alt="Bundle size" />
</a>
<br/>
<a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild">
  <img src="https://img.shields.io/github/workflow/status/nerdyman/react-compare-slider/build" alt="Build Status" />
</a>
<a href="https://codeclimate.com/github/nerdyman/react-compare-slider">
  <img src="https://img.shields.io/codeclimate/coverage/nerdyman/react-compare-slider" alt="Coverage" />
</a>
<a href="https://react-compare-slider.vercel.app">
  <img src="https://raw.githubusercontent.com/storybookjs/brand/8d28584c89959d7075c237e9345955c895048977/badge/badge-storybook.svg" alt="Demos" />
</a>

</div>

---

## Features

- Supports responsive images and any other React components (`picture`, `video`, `canvas`, `iframe` etc.)
- Supports landscape and portrait orientations
- Simple API
- Unopinionated & fully customizable &ndash; optionally use your own components and styles
- Responsive, fluid
- [Teeny-tiny](https://bundlephobia.com/result?p=react-compare-slider)
- Zero dependencies
- Type safe

## Demo

- Storybook: [docs](https://react-compare-slider.vercel.app/?path=/docs/docs-intro--page), [demos](https://react-compare-slider.vercel.app/?path=/story/demos)
- CodeSandbox: [basic editable demo](https://codesandbox.io/s/react-compare-slider-simple-example-9si6l)
- [Local example](./example)

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

See the [Images docs](https://react-compare-slider.vercel.app/?path=/docs/docs-images--page) for more information and [demos](https://react-compare-slider.vercel.app/?path=/story/demos--images).

## Props

| Prop | Type | Required | Default value | Description |
|------|------|:--------:|---------------|-------------|
| [`boundsPadding`](https://react-compare-slider.vercel.app/?path=/story/docs-bounds-padding--page) | `number` |   | `0` | Padding to limit the slideable bounds in pixels on the X-axis (landscape) or Y-axis (portrait). |
| [`changePositionOnHover`](https://react-compare-slider.vercel.app/?path=/story/docs-change-position-on-hover--page) | `boolean` |   | `false` | Whether the slider should follow the pointer on hover. |
| [`handle`](https://react-compare-slider.vercel.app/?path=/story/docs-handles--page) | `ReactNode` |   | `undefined` | Custom handle component. |
| `itemOne`   | `ReactNode` | ✓ | `undefined` | First component to show in slider. |
| `itemTwo`   | `ReactNode` | ✓ | `undefined` | Second component to show in slider. |
| [`onlyHandleDraggable`](https://react-compare-slider.vercel.app/?path=/story/docs-only-handle-draggable--page) | `boolean`  |   | `false` | Whether to only change position when handle is interacted with (useful for touch devices). |
| [`onPositionChange`](https://react-compare-slider.vercel.app/?path=/story/demos--on-position-change)  | `function`  |   | `undefined` | Callback on position change, returns current position percentage as argument `(position) => { ... }`. |
| [`portrait`](https://react-compare-slider.vercel.app/?path=/story/demos--portrait) | `boolean`   |   | `false` | Whether to use portrait orientation. |
| [`position`](https://react-compare-slider.vercel.app/?path=/story/demos--position)  | `number`    |   | `50` | Initial percentage position of divide (`0-100`). |

See the [API docs](https://react-compare-slider.vercel.app/?path=/docs/docs-api--page) for more information.

## Extending

### Custom Items

The library supports all types of React components.

- [Google Maps Demo](https://react-compare-slider.vercel.app/?path=/story/demos-custom-components--google-maps)

Custom components can apply the same base styles as `ReactCompareSliderImage` 
by using the [`styleFitContainer` CSS utility](https://react-compare-slider.vercel.app/?path=/docs/docs-api--page#stylefitcontainer).

### Custom Handles

[![Custom Handles](./example/custom-handle-capture.gif)](https://react-compare-slider.vercel.app/?path=/story/demos-handles--individual-styles)

See the [Handles docs](https://react-compare-slider.vercel.app/?path=/docs/docs-handles--page) for more information.

## Requirements

- React 16.8+
- The [latest two versions of each major browser](./package.json#L49) are officially supported &ndash; try [version 1.2.1](https://www.npmjs.com/package/react-compare-slider/v/1.2.1) if you require legacy Edge support

## Notes

Bootstrapped with [TSDX](https://github.com/formium/tsdx).
