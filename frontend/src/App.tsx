import React, { useRef, useState } from 'react';
import './App.css'; // Keep your original CSS file import here if you have one

const API_BASE_URL = ((import.meta as any).env?.VITE_API_BASE_URL) || 'https://ai-business-assistant-platform.onrender.com';

export default function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadStatus(`Uploading ${file.name}...`);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`Success: ${file.name} uploaded!`);
        console.log('Upload response:', data);
      } else {
        setUploadStatus(`Upload failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Network error: Unable to reach backend server.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="shell">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.docx"
      />

      <aside className="sidebar">
        {/* Your Sidebar Navigation Icons */}
      </aside>

      <section className="content" id="workspace">
        <header className="topbar">
          <div className="user-avatar">MM</div>
        </header>

        <section className="hero-card">
          <div className="hero-copy">
            <span className="pill">YOUR PRIVATE KNOWLEDGE LAYER</span>
            <h2>Ask better questions of every document.</h2>
            <p>Upload policies, reports, and internal notes. Atlas will find the relevant context and show you where every answer came from.</p>
            
            {/* Attached Upload Handler */}
            <button className="primary-button" onClick={handleUploadClick} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload a document ↗'}
            </button>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h4>DOCUMENTS</h4>
            <p className="stat-number">{selectedFile ? '1' : '0'}</p>
            <p className="stat-subtext">{selectedFile ? selectedFile.name : 'Upload your first source'}</p>
          </div>
          <div className="stat-card">
            <h4>CONVERSATIONS</h4>
            <p className="stat-number">0</p>
            <p className="stat-subtext">Your questions will live here</p>
          </div>
          <div className="stat-card">
            <h4>SOURCES CITED</h4>
            <p className="stat-number">—</p>
            <p className="stat-subtext">Grounded answers, not guesses</p>
          </div>
        </section>

        <section className="empty-state" id="documents">
          <div className="empty-state-card">
            <div className="plus-icon">+</div>
            <div>
              <h3>Build your first source library</h3>
              <p>Add a PDF or text document to make this workspace useful. The processing pipeline will extract, chunk, and index it for chat.</p>
            </div>
            
            {/* Secondary Upload Button */}
            <button className="secondary-button" onClick={handleUploadClick} disabled={isUploading}>
              Choose a file
            </button>
          </div>
        </section>

        {uploadStatus && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
            <p>{uploadStatus}</p>
          </div>
        )}
      </section>
    </div>
  );
}