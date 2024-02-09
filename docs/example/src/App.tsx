import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%', flexGrow: 1 }}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/wall-1.png"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/wall-2.png"
            alt="Image two"
          />
        }
        style={{
          width: '100%',
          height: '50%',
          backgroundColor: 'white',
          backgroundImage: `
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%)
        `,
          backgroundSize: `20px 20px`,
          backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
        }}
      />
      <ReactCompareSlider
        portrait
        itemOne={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/wall-1.png"
            alt="Image one"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src="https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-compare-slider/demo-images/wall-2.png"
            alt="Image two"
          />
        }
        style={{
          width: '100%',
          height: '50%',
          backgroundColor: 'white',
          backgroundImage: `
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%)
        `,
          backgroundSize: `20px 20px`,
          backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
        }}
      />
    </div>
  );
}
