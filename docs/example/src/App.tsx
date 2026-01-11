import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import * as Slider from 'react-compare-slider/components';
import { useReactCompareSlider } from 'react-compare-slider/hooks';

/**
 * Optionally create your own slider instead of using the pre-built `ReactCompareSlider` component.
 */
const CustomSlider = () => {
  const sliderProps = useReactCompareSlider({ portrait: true, transition: '0.15s linear' });

  return (
    <Slider.Provider {...sliderProps}>
      <Slider.Root style={{ width: '100%', height: '50%' }}>
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
            style={{
              backgroundColor: 'white',
              backgroundImage: `
                linear-gradient(45deg, #ccc 25%, transparent 25%),
                linear-gradient(-45deg, #ccc 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #ccc 75%),
                linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
              backgroundSize: `20px 20px`,
              backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
            }}
          />
        </Slider.Item>
        <Slider.HandleRoot>
          <Slider.Handle />
        </Slider.HandleRoot>
      </Slider.Root>
    </Slider.Provider>
  );
};

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        flexGrow: 1,
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <ReactCompareSlider
        portrait={false}
        transition="0.15s linear"
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-1.png"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/lady-2.png"
            alt="Image two"
            style={{
              backgroundColor: 'white',
              backgroundImage: `
                linear-gradient(45deg, #ccc 25%, transparent 25%),
                linear-gradient(-45deg, #ccc 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #ccc 75%),
                linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
              backgroundSize: `20px 20px`,
              backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
            }}
          />
        }
        style={{ width: '100%', height: '50%' }}
      />
      <CustomSlider />
    </div>
  );
}
