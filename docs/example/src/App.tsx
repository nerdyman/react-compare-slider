import { ReactCompareSlider } from 'react-compare-slider';

import './App.css';

function App() {
  return (
    <div style={{ width: '100%', height: '100%', flexGrow: 1 }}>
      <ReactCompareSlider
        itemOne={<img src="https://picsum.photos/800/600" />}
        itemTwo={<img src="https://picsum.photos/800/600" />}
      />
      <ReactCompareSlider
        portrait
        itemOne={<img src="https://picsum.photos/800/600" />}
        itemTwo={<img src="https://picsum.photos/800/600" />}
      />
    </div>
  );
}

export default App;
