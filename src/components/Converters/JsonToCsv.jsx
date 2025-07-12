import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCopy, FaDownload } from 'react-icons/fa';
import '../../App.css';

const JsonToCsv = () => {
  const [jsonData, setJsonData] = useState('');
  const [csvResult, setCsvResult] = useState('');
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const navigate = useNavigate();

  const handleConvert = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      if (!Array.isArray(parsedData)) throw new Error("JSON should be an array of objects");

      const keys = Object.keys(parsedData[0]);
      const csvRows = [
        keys.join(','), // header
        ...parsedData.map(row => keys.map(k => JSON.stringify(row[k] ?? '')).join(','))
      ];
      setCsvResult(csvRows.join('\n'));
    } catch (err) {
      console.error("Conversion Error:", err);
      setCsvResult('Invalid JSON format!');
    }
  };

  const handleCopy = () => {
    if (csvResult) {
      navigator.clipboard.writeText(csvResult)
        .then(() => {
          setShowCopyMessage(true);
          setTimeout(() => setShowCopyMessage(false), 2000);
        })
        .catch(err => console.error("Copy failed:", err));
    }
  };

  const handleDownload = () => {
    if (csvResult) {
      const blob = new Blob([csvResult], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="converter-container">
      <button className='go-back-button' onClick={() => navigate(-1)}>
        <FaArrowLeft fontSize={20} />
      </button>
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
        <>
          <div className="converter-actions">
            <button className="output-button" onClick={handleCopy}><FaCopy /> Copy CSV</button>
            <button className="output-button" onClick={handleDownload}><FaDownload /> Download CSV</button>
            {showCopyMessage && (
              <div className="copy-toast">Copied to Clipboard!</div>
            )}
          </div>
          <pre className="converter-output">{csvResult}</pre>
        </>
      )}
    </div>
  );
};

export default JsonToCsv;
