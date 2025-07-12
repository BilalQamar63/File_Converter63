import React, { useState } from 'react';
import { FaArrowLeft, FaPlay, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import axios from 'axios';

const voices = [
  { label: 'Woman', id: '21m00Tcm4TlvDq8ikWAM' },
  { label: 'Man', id: 'pNInz6obpgDQGcFmaJgB' },
  { label: 'Boy', id: 'yoZ06aMxZJJ28mfd3POQ' },
  { label: 'Girl', id: 'MF3mGyEYCl7XYWbV9V6O' },
  { label: 'Sigma Man', id: 'TxGEqnHWrfWFTfGW9XjX' },
  { label: 'Old Man', id: 'ODq5zmih8GrVes37Dizd' },
  { label: 'Narrator', id: 'onwK4e9ZLuTAKqWW03F9' },
  { label: 'Calm Female', id: 'AZnzlk1XvdvUeBnXmlld' },
  { label: 'Excited Male', id: 'D38z5RcWu1voky8WS1ja' },
  { label: 'Urdu', id: 'EXAVITQu4vr4xnSDxMaL' },
];

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const navigate = useNavigate();
  const ElevenLab = process.env.REACT_APP_ELEVENLABS_API_KEY;

  const handleConvert = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`,
        {
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.7 },
        },
        {
          headers: {
            'xi-api-key': ElevenLab,
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Error generating speech:', error);
      alert('Failed to generate audio');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'tts-voice.mp3';
      a.click();
    }
  };

  return (
    <div className="image-optimizer-container">
      <div>
        <button className="go-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft fontSize={20} />
        </button>
        <h2 className="converter-title">Text To Voice Converter</h2>
      </div>

      <div className="preview-section">
        {/* LEFT: TEXT INPUT */}
        <div className="image-box">
          <p>Enter Text</p>
          <textarea
            rows={10}
            className="drop-area full-width"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <select
            className="voice-dropdown"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.label}
              </option>
            ))}
          </select>
          <button className="output-button" onClick={handleConvert} disabled={loading}>
            <FaPlay style={{ marginRight: '8px' }} />
            {loading ? 'Converting...' : 'Generate Voice'}
          </button>
        </div>

        {/* RIGHT: AUDIO OUTPUT */}
        <div className="image-box">
          <p>Audio Output</p>
          {audioUrl && (
            <>
              <audio controls src={audioUrl} className="full-width" />
              <button className="output-button" onClick={handleDownload}>
                <FaDownload style={{ marginRight: '6px' }} /> Download MP3
              </button>
            </>
          )}

          {loading && (
            <div className="loader">
              <PropagateLoader color="#a2aab3" />
            </div>
          )}
        </div>
      </div>

      {showToast && <div className="copy-toast">Audio Ready!</div>}
    </div>
  );
};

export default TextToSpeech;
