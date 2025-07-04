import { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft , FaCopy , FaDownload} from "react-icons/fa";
import '../../App.css';

const CsvToJson = () => {
  const [csvData, setCsvData] = useState('');
  const [jsonResult, setJsonResult] = useState(null);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const navigate = useNavigate();

  const handleConvert = () => {
    try {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setJsonResult(result.data);
        },
      });
    } catch (err) {
      console.error("Conversion Error: ", err);
    }
  };

  const handleCopy = () => {
    if (jsonResult) {
      navigator.clipboard.writeText(JSON.stringify(jsonResult, null, 2))
        .then(() => {
          setShowCopyMessage(true);
          setTimeout(() => setShowCopyMessage(false), 2000);
        })
        .catch(err => console.error("Copy failed:", err));
    }
  };

  const handleDownload = () => {
    if (jsonResult) {
      const blob = new Blob([JSON.stringify(jsonResult, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.json';
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
        <>
          <div className="converter-actions">
            <button className="output-button" onClick={handleCopy}><FaCopy/> Copy JSON</button>
            <button className="output-button" onClick={handleDownload}><FaDownload/> Download JSON</button>
            {showCopyMessage && (
                <div className="copy-toast">Copied to Clipboard!</div>
            )}
          </div>
          <pre className="converter-output">{JSON.stringify(jsonResult, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default CsvToJson;
