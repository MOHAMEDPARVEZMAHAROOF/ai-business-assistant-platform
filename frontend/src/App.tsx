import React, { useRef, useState } from 'react';

// Type cast import.meta to prevent TS2339 build failure on Vercel
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
        setUploadStatus(`Success: ${file.name} uploaded successfully!`);
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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI Business Assistant</h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.docx"
      />

      <button
        onClick={handleUploadClick}
        disabled={isUploading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          borderRadius: '8px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
        }}
      >
        {isUploading ? 'Uploading...' : 'Upload a document ↗'}
      </button>

      {uploadStatus && (
        <p style={{ marginTop: '1rem', color: isUploading ? '#666' : '#000' }}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
}