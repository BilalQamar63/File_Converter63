import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CsvToJson from '../components/Converters/CsvToJson';
import JsonToCsv from '../components/Converters/JsonToCsv';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csvToJson" element={<CsvToJson />} />
        <Route path="/jsonToCsv" element={<JsonToCsv />} />
      </Routes>
    </Router>
  );
}

export default App;
