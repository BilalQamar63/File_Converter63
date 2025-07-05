import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';

const ImageOptimizer = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [previewOriginal, setPreviewOriginal] = useState(null);
    const [previewCompressed, setPreviewCompressed] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showInput, setShowInput] = useState(true);
    const [showDownloadToast, setShowDownloadToast] = useState(false);

    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setShowInput(false);
        setOriginalImage(file);
        setPreviewOriginal(URL.createObjectURL(file));

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
        };

        try {
            const compressed = await imageCompression(file, options);
            setTimeout(() => {
                setCompressedImage(compressed);
                setPreviewCompressed(URL.createObjectURL(compressed));
                setLoading(false);
            }, 3000);
        } catch (error) {
            console.error(`Compression error: ${error}`);
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (compressedImage) {
            saveAs(compressedImage, `optimized-${originalImage.name}`);
            setShowDownloadToast(true);

            // Reset after toast
            setTimeout(() => {
                setShowDownloadToast(false);
                setCompressedImage(null);
                setOriginalImage(null);
                setPreviewOriginal(null);
                setPreviewCompressed(null);
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
                <h2 className="converter-title">Image Optimizer</h2>
            </div>

            {showInput && (
                <label className="drop-area">
                    <p>Drag & Drop or Click to Select Image</p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                </label>
            )}

            {loading && <div className="loader"><PropagateLoader color="#a2aab3" /></div>}

            {!loading && compressedImage && (
                <div className="preview-section">
                    <div className="image-box">
                        <p>Original Image ({(originalImage.size / 1024).toFixed(2)} KB)</p>
                        <img src={previewOriginal} alt="Original" className="preview-img" />
                    </div>

                    <div className="image-box">
                        <p>Compressed Image ({(compressedImage.size / 1024).toFixed(2)} KB)</p>
                        <img src={previewCompressed} alt="Compressed" className="preview-img" />
                        <button className="output-button" onClick={handleDownload}>
                            <FaDownload /> Download Optimized
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

export default ImageOptimizer;
