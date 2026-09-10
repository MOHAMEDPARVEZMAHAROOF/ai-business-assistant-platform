import React, { useRef, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ai-business-assistant-platform.onrender.com';

export default function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Triggers hidden <input type="file" />
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handles file selection and sends request to backend
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadStatus('Uploading document...');

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
      setUploadStatus('Network error: Could not reach backend server.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI Business Assistant</h1>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.docx"
      />

      {/* Primary Hero Upload Button */}
      <button
        onClick={handleUploadClick}
        disabled={isUploading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '8px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
        }}
      >
        {isUploading ? 'Uploading...' : 'Upload a document ↗'}
      </button>

      {/* Status Output */}
      {uploadStatus && (
        <p style={{ marginTop: '1rem', color: isUploading ? '#666' : '#000' }}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
}