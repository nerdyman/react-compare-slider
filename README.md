<div align="center">
  <h1>React Compare Slider</h1>
  <p>Compare two components side-by-side or top-to-toe.</p>

[![Example](https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/docs/hero.gif)](https://codesandbox.io/p/sandbox/github/nerdyman/react-compare-slider/tree/main/docs/example?file=/src/App.tsx:1,1)

<a href="https://github.com/nerdyman/react-compare-slider/blob/main/LICENSE"><img alt="License MIT" src="https://img.shields.io/npm/l/react-compare-slider.svg" /></a>
<a href="https://npmjs.com/package/react-compare-slider"><img  alt="npm version" src="https://img.shields.io/npm/v/react-compare-slider.svg" /></a>
<a href="https://bundlephobia.com/result?p=react-compare-slider"><img alt="Bundle size" src="https://img.shields.io/bundlephobia/minzip/react-compare-slider.svg?color=brightgreen" /></a>
<br/>
<a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild"><img alt="GitHub CI status" src="https://img.shields.io/github/actions/workflow/status/nerdyman/react-compare-slider/ci.yml" /></a>
<a href="https://codeclimate.com/github/nerdyman/react-compare-slider/code?q=lib"><img src="https://img.shields.io/codeclimate/coverage/nerdyman/react-compare-slider" alt="Coverage" /></a>
<a href="https://react-compare-slider.vercel.app"><img  alt="Demos" src="https://raw.githubusercontent.com/storybookjs/brand/8d28584c89959d7075c237e9345955c895048977/badge/badge-storybook.svg" /></a>

</div>

---

## Features

- Supports responsive images and any other React components (`picture`, `video`, `canvas`, `iframe` etc.)
- Supports landscape and portrait orientations
- Accessible &ndash; screen reader and keyboard support out of the box
- Simple API
- Unopinionated & fully customizable &ndash; optionally use your own components and styles
- Responsive & fluid with intrinsic sizing
- Teeny-tiny, zero dependencies
- Type safe

## Demos

- Storybook: [docs](https://react-compare-slider.vercel.app/?path=/docs/docs-introduction--docs), [demos](https://react-compare-slider.vercel.app/?path=/story/demos), [custom recipes](https://react-compare-slider.vercel.app/?path=/story/recipes), [custom handles](https://react-compare-slider.vercel.app/?path=/story/handles), [`useReactCompareSliderRef`](https://react-compare-slider.vercel.app/?path=/docs/docs-usereactcomparesliderref--docs)
- CodeSandbox: [basic demo](https://codesandbox.io/p/sandbox/github/nerdyman/react-compare-slider/tree/main/docs/example?file=/src/App.tsx:1,1)
- [Local example](./docs/example)

## Usage

### Install

```sh
npm install react-compare-slider
# or
yarn add react-compare-slider
# or
pnpm add react-compare-slider
```

### Basic Image Usage

You _may_ use `ReactCompareSliderImage` to render images or use your own custom
components.

```jsx
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export const Example = () => {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src="..." srcSet="..." alt="Image one" />}
      itemTwo={<ReactCompareSliderImage src="..." srcSet="..." alt="Image two" />}
    />
  );
};
```

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | :------: | ------- | ----------- |
| [`boundsPadding`](https://react-compare-slider.vercel.app/?path=/story/demos--bounds-padding)                   | `number`                     |   | `0`           | Padding to limit the slideable bounds in pixels on the X-axis (landscape) or Y-axis (portrait).
| [`browsingContext`](https://react-compare-slider.vercel.app/?path=/story/demos--browsing-context)               | `globalThis`                 |   | `globalThis`  | Context to bind events to (useful for iframes).
| [`changePositionOnHover`](https://react-compare-slider.vercel.app/?path=/story/demos--change-position-on-hover) | `boolean`                    |   | `false`       | Whether the slider should follow the pointer on hover.
| [`disabled`](https://react-compare-slider.vercel.app/?path=/story/demos--disabled)                              | `boolean`                    |   | `false`       |  Whether to disable slider movement (items are still interactable).
| [`handle`](https://react-compare-slider.vercel.app/?path=/story/demos--handle)                                  | `ReactNode`                  |   | `undefined`   | Custom handle component.
| `itemOne`                                                                                                       | `ReactNode`                  | ✓ | `undefined`   | First component to show in slider.
| `itemTwo`                                                                                                       | `ReactNode`                  | ✓ | `undefined`   | Second component to show in slider.
| [`keyboardIncrement`](https://react-compare-slider.vercel.app/?path=/story/demos--keyboard-increment)           | `` number\|`${number}%` ``   |   | `5%`          | Percentage or pixel amount to move when the slider handle is focused and keyboard arrow is pressed.
| [`onlyHandleDraggable`](https://react-compare-slider.vercel.app/?path=/story/demos--only-handle-draggable)      | `boolean`                    |   | `false`       | Whether to only change position when handle is interacted with (useful for touch devices).
| [`onPositionChange`](https://react-compare-slider.vercel.app/?path=/story/demos--on-position-change)            | `(position: number) => void` |   | `undefined`   | Callback on position change, returns current position percentage as argument.
| [`portrait`](https://react-compare-slider.vercel.app/?path=/story/demos--portrait)                              | `boolean`                    |   | `false`       | Whether to use portrait orientation.
| [`position`](https://react-compare-slider.vercel.app/?path=/story/demos--position)                              | `number`                     |   | `50`          | Initial percentage position of divide (`0-100`).
| [`transition`](https://react-compare-slider.vercel.app/?path=/story/demos--transition)                          | `string`                     |   | `undefined`   | Shorthand CSS `transition` property to apply to handle movement. E.g. `.5s ease-in-out`

[API docs](https://react-compare-slider.vercel.app/?path=/docs/docs-api--docs) for more information.

<br />

## Real World Examples

Checkout out the [Real World Examples page](https://react-compare-slider.vercel.app/?path=/docs/docs-real-world-examples--docs).

## Requirements

- React 16.8+
- The latest two versions of each major browser are officially supported
