import { useState } from 'react';
import axios from 'axios';
import backendUrl from '../../config/api';
import '../../App.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JsonToCsv = () => {
  const [jsonData, setJsonData] = useState('');
  const [csvResult, setCsvResult] = useState('');
  const navigate = useNavigate();

  const handleConvert = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/convert/json2csv`, {
        jsonData: JSON.parse(jsonData)
      });
      setCsvResult(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="converter-container">
       <button className='go-back-button' onClick={()=> navigate(-1)}><FaArrowLeft fontSize={20}/></button>
      <h2 className="converter-title">JSON to CSV Converter</h2>
      <textarea
        className="converter-textarea"
        placeholder='Paste JSON data like [{"name":"Ali"}]'
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
      />
      <br />
      <button className="converter-button" onClick={handleConvert}>Convert</button>

      {csvResult && (
        <pre className="converter-output">{csvResult}</pre>
      )}
    </div>
  );
};

export default JsonToCsv;
