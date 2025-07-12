import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CsvToJson from '../components/Converters/CsvToJson';
import JsonToCsv from '../components/Converters/JsonToCsv';
import ImageOptimizer from '../components/Converters/ImageOptimizer';
import ImageBgRemover from '../components/Converters/ImgBgRemover';
import TextToSpeech from '../components/Converters/TextToSpeech';
import ImageToText from '../components/Converters/ImageToText';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csvToJson" element={<CsvToJson />} />
        <Route path="/jsonToCsv" element={<JsonToCsv />} />
        <Route path="/imgOptimizer" element={<ImageOptimizer />} />
        <Route path="/imgBgRemover" element={<ImageBgRemover />} />
        <Route path="/textToSpeech" element={<TextToSpeech />} />
        <Route path="/imageToText" element={<ImageToText />} />
      </Routes>
    </Router>
  );
}

export default App;
