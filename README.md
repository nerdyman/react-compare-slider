<div align="center">
  <h1>React Compare Slider</h1>
  <p>Compare two components side-by-side or top-to-toe.</p>

[![Example](https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/docs/hero.gif)](https://stackblitz.com/github/nerdyman/react-compare-slider/tree/main/docs/example)

<div class="custom-lib-tags">
  <a href="https://github.com/nerdyman/react-compare-slider/blob/main/LICENSE"><img alt="License MIT" src="https://img.shields.io/npm/l/react-compare-slider.svg" /></a>
  <a href="https://npmjs.com/package/react-compare-slider"><img alt="npm version" src="https://img.shields.io/npm/v/react-compare-slider.svg" /></a>
  <a href="https://npmtrends.com/react-compare-slider"><img alt="Downloads" src="https://img.shields.io/npm/dw/react-compare-slider" /></a>

  <a href="https://github.com/nerdyman/react-compare-slider/actions?query=workflow%3Abuild"><img alt="GitHub CI status" src="https://img.shields.io/github/actions/workflow/status/nerdyman/react-compare-slider/ci.yml" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=nerdyman_react-compare-slider&branch=main"><img src="https://img.shields.io/sonar/coverage/nerdyman_react-compare-slider?server=https%3A%2F%2Fsonarcloud.io" alt="Coverage" /></a>
  <a href="https://react-compare-slider.js.org"><img alt="Demos" src="https://raw.githubusercontent.com/storybookjs/brand/8d28584c89959d7075c237e9345955c895048977/badge/badge-storybook.svg" /></a>
  <a href="https://stackblitz.com/github/nerdyman/react-compare-slider/tree/main/docs/example">
  <img alt="Open in Stackblitz" src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg" />
  </a>
</div>

</div>

> [!IMPORTANT]
> This readme is for the [v4 release](https://github.com/nerdyman/react-compare-slider/releases) which is currently in beta (`react-compare-slider@beta`).
>
> See [Version 3](https://github.com/nerdyman/react-compare-slider/tree/v3.1.0) for the latest stable release (`react-compare-slider`).

---

## Features

- Supports responsive images and any other React components (`picture`, `video`, `canvas`, `iframe`, etc.)
- Supports landscape and portrait orientations
- Accessible with screen reader and keyboard support out of the box
- Simple API
- Unopinionated and fully customizable, optionally use your own components and styles
- Responsive and fluid with intrinsic sizing
- Teeny-tiny, zero dependencies, tree-shakeable
- Type safe

## Demos

- Storybook: [docs](https://react-compare-slider.js.org/?path=/docs/docs-introduction--docs), [demos](https://react-compare-slider.js.org/?path=/story/demos), [custom recipes](https://react-compare-slider.js.org/?path=/story/recipes), [custom handles](https://react-compare-slider.js.org/?path=/story/handles)
- [Standalone demo](https://github.com/nerdyman/react-compare-slider/tree/main/docs/example)

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

```tsx
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

### Advanced Usage

You can also construct your own slider for more granular control.

```tsx
import * as Slider from 'react-compare-slider/components';
import { useReactCompareSlider } from 'react-compare-slider/hooks';

export const Example = () => {
  // Access to state and event bindings of the slider.
  const sliderProps = useReactCompareSlider({ portrait: true });

  return (
    <Slider.Provider {...sliderProps}>
      <Slider.Root>
        <Slider.Item item="itemOne">
          <Slider.Image
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
            alt="Image one"
          />
        </Slider.Item>
        <Slider.Item item="itemTwo">
          <Slider.Image
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
            alt="Image two"
          />
        </Slider.Item>
        <Slider.HandleRoot>
          <Slider.Handle />
        </Slider.HandleRoot>
      </Slider.Root>
    </Slider.Provider>
};
```

See the [Components API docs](https://react-compare-slider.js.org/?path=/docs/docs-components-api--docs) for more information.

## Props

| Prop                                                                                                        | Type                         | Required | Default      | Description                                                                                         |
| :---------------------------------------------------------------------------------------------------------- | :--------------------------- | :------: | ------------ | --------------------------------------------------------------------------------------------------- |
| [`boundsPadding`](https://react-compare-slider.js.org/?path=/docs/docs-bounds-padding--docs)                   | `string`                     |          | `0px`        | Padding to limit the slideable bounds on the X-axis (landscape) or Y-axis (portrait).     |
| [`browsingContext`](https://react-compare-slider.js.org/?path=/docs/docs-browsing-context--docs)               | `globalThis`                 |          | `globalThis` | Context to bind events to (useful for iframes).                                                     |
| [`changePositionOnHover`](https://react-compare-slider.js.org/?path=/docs/docs-change-position-on-hover--docs) | `boolean`                    |          | `false`      | Whether the slider should follow the pointer on hover.                                              |
| [`clip`](https://react-compare-slider.js.org/?path=/docs/docs-clip--docs)                                   | `all\|itemOne\|itemTwo`     |          | `all`       | Whether to clip `itemOne`, `itemTwo` or `all` items.                                               |
| [`defaultPosition`](https://react-compare-slider.js.org/?path=/story/demos--default-position)                              | `number`                     |          | `50`         | Initial percentage position of divide (`0-100`).                                                    |
| [`disabled`](https://react-compare-slider.js.org/?path=/docs/docs-disabled--docs)                              | `boolean`                    |          | `false`      | Whether to disable slider movement (items are still interactable).                                  |
| [`handle`](https://react-compare-slider.js.org/?path=/docs/docs-handles--docs)                                  | `ReactNode`                  |          | `undefined`  | Custom handle component.                                                                            |
| `itemOne`                                                                                                   | `ReactNode`                  |    ✓     | `undefined`  | First component to show in slider.                                                                  |
| `itemTwo`                                                                                                   | `ReactNode`                  |    ✓     | `undefined`  | Second component to show in slider.                                                                 |
| [`keyboardIncrement`](https://react-compare-slider.js.org/?path=/docs/docs-keyboard-increment--docs)           | `` number\|`${number}%` ``   |          | `5%`         | Percentage or pixel amount to move when the slider handle is focused and keyboard arrow is pressed. |
| [`onlyHandleDraggable`](https://react-compare-slider.js.org/?path=/docs/docs-only-handle-draggable--docs)      | `boolean`                    |          | `false`      | Whether to only change position when handle is interacted with (useful for touch devices).          |
| [`onPositionChange`](https://react-compare-slider.js.org/?path=/story/demos--on-position-change)            | `(position: number) => void` |          | `undefined`  | Callback on position change, returns current position percentage as argument.                       |
| [`portrait`](https://react-compare-slider.js.org/?path=/story/demos--portrait)                              | `boolean`                    |          | `false`      | Whether to use portrait orientation.                                                                |
| [`transition`](https://react-compare-slider.js.org/?path=/docs/docs-transition--docs)                          | `string`                     |          | `'0.15s ease-out'\|'none'` | Shorthand CSS `transition` property to apply to handle movement. This is automatically `none` for users with the `prefers-reduced-motion: reduced` preference.  |

[API docs](https://react-compare-slider.js.org/?path=/docs/docs-api--docs) for more information.
