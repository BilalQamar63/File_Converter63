import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners"; 


const ImageToText = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setText("");
    }
  };

  const extractText = async () => {
    if (!image) return;

    setLoading(true); 
    setText("Processing...");

    try {
      const result = await Tesseract.recognize(image, "eng");
      setText(result.data.text);
    } catch (err) {
      setText("Failed: " + err.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="image-to-text-wrapper">
      <button className="go-back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft fontSize={20} />
      </button>
      <h2 className="converter-title">Image to Text</h2>

      {!image && (
        <label className="drop-area">
          <p>Drag & Drop or Click to Select Image</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>
      )}

      {/* Loader shown during OCR */}
      {loading && (
        <div className="loader">
          <PropagateLoader color="#a2aab3" />
        </div>
      )}

      {image && !loading && (
        <div className="preview-section">
          <div className="image-preview-card">
            <p>Uploaded Image</p>
            <img src={image} alt="Selected" className="uploaded-img" />
            <button className="output-button" onClick={extractText}>Extract Text</button>
          </div>

          <div className="image-preview-card">
            <p>Extracted Text</p>
            <textarea
              value={text}
              className="ocr-textarea"
              readOnly
              rows={10}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageToText;
