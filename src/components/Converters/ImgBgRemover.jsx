import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';

const ImageBgRemover = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [removedBgImage, setRemovedBgImage] = useState(null);
  const [previewOriginal, setPreviewOriginal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  const navigate = useNavigate();

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setShowInput(false);
    setOriginalImage(file);
    setPreviewOriginal(URL.createObjectURL(file));
    setRemovedBgImage(null);

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
      const res = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
        headers: {
          'X-Api-Key': 'LMGdMGcUe25KFwnJ5LXkB4aV',
        },
        responseType: 'blob',
      });

      const removedBgURL = URL.createObjectURL(res.data);
      setTimeout(() => {
        setRemovedBgImage(removedBgURL);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Failed to remove background. Please try again.");
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const handleDownload = () => {
    if (removedBgImage) {
      saveAs(removedBgImage, `no-bg-${originalImage.name}`);
      setShowDownloadToast(true);

      setTimeout(() => {
        setShowDownloadToast(false);
        setRemovedBgImage(null);
        setOriginalImage(null);
        setPreviewOriginal(null);
        setShowInput(true);
      }, 2000);
    }
  };

  return (
    <div className="image-optimizer-container">
      <div>
        <button className="go-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft fontSize={20} />
        </button>
        <h2 className="converter-title">Background Remover</h2>
      </div>

      {showInput && (
        <div className="drop-area" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>{isDragActive ? 'Drop the image here...' : 'Drag & Drop or Click to Select Image'}</p>
        </div>
      )}

      {loading && <div className="loader">
        <PropagateLoader color="#a2aab3" />
      </div>}

      {!loading && removedBgImage && (
        <div className="preview-section">
          <div className="image-box">
            <p>Original Image</p>
            <img src={previewOriginal} alt="Original" className="preview-img" />
          </div>

          <div className="image-box">
            <p>Image Without Background</p>
            <img src={removedBgImage} alt="Removed Background" className="preview-img" />
            <button className="output-button" onClick={handleDownload}>
              <FaDownload /> Download
            </button>
          </div>
        </div>
      )}

      {showDownloadToast && (
        <div className="copy-toast">Download Complete!</div>
      )}
    </div>
  );
};

export default ImageBgRemover;
