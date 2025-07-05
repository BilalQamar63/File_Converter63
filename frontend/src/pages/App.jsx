import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CsvToJson from '../components/Converters/CsvToJson';
import JsonToCsv from '../components/Converters/JsonToCsv';
import ImageOptimizer from '../components/Converters/ImageOptimizer';
import ImageBgRemover from '../components/Converters/ImgBgRemover';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csvToJson" element={<CsvToJson />} />
        <Route path="/jsonToCsv" element={<JsonToCsv />} />
        <Route path="/imgOptimizer" element={<ImageOptimizer />} />
        <Route path="/imgBgRemover" element={<ImageBgRemover />} />
      </Routes>
    </Router>
  );
}

export default App;
