import { useState } from 'react';
import axios from 'axios';
import backendUrl from '../../config/api';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const CsvToJson = () => {
  const [csvData, setCsvData] = useState('');
  const [jsonResult, setJsonResult] = useState(null);
  const navigate = useNavigate();

  const handleConvert = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/convert/csv2json`, {
        csvData
      });
      setJsonResult(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="converter-container">
      <button className='go-back-button' onClick={()=> navigate(-1)}><FaArrowLeft fontSize={20}/></button>
      <h2 className="converter-title">CSV to JSON Converter</h2>
      <textarea
        className="converter-textarea"
        placeholder="Paste CSV data here"
        value={csvData}
        onChange={(e) => setCsvData(e.target.value)}
      />
      <br />
      <button className="converter-button" onClick={handleConvert}>Convert</button>

      {jsonResult && (
        <pre className="converter-output">{JSON.stringify(jsonResult, null, 2)}</pre>
      )}
    </div>
  );
};

export default CsvToJson;
