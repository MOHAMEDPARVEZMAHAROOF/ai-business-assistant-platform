import React, { useRef, useState } from 'react';

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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f3ef', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.docx"
      />

      {/* Dark Left Sidebar */}
      <aside style={{ width: '240px', backgroundColor: '#1a1d1a', color: '#fff', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
          <div style={{ width: '28px', height: '28px', backgroundColor: '#c8f560', color: '#1a1d1a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>
            A
          </div>
          Atlas Assist
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', backgroundColor: '#2a2e2a', borderRadius: '8px', cursor: 'pointer', color: '#fff', fontWeight: '600' }}>
            ✦ Workspace
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer', color: '#a0a0a0' }}>
            ≡ Documents
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer', color: '#a0a0a0' }}>
            🕒 History
          </div>
        </nav>
      </aside>

      {/* Main Content Workspace */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 'bold', color: '#888' }}>AI BUSINESS ASSISTANT</span>
            <h1 style={{ fontSize: '2.5rem', margin: '0.2rem 0 0 0', fontWeight: '800', color: '#1a1d1a' }}>Make sense of the work.</h1>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>
            MM
          </div>
        </header>

        {/* Lime Green Hero Banner */}
        <section style={{ backgroundColor: '#ccf255', borderRadius: '24px', padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ maxWidth: '480px', zIndex: 2 }}>
            <span style={{ display: 'inline-block', padding: '0.35rem 0.85rem', backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>
              YOUR PRIVATE KNOWLEDGE LAYER
            </span>
            <h2 style={{ fontSize: '2.8rem', lineHeight: '1.1', fontWeight: '800', margin: '0 0 1rem 0', color: '#1a1d1a' }}>
              Ask better questions of every document.
            </h2>
            <p style={{ color: '#333', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2rem' }}>
              Upload policies, reports, and internal notes. Atlas will find the relevant context and show you where every answer came from.
            </p>
            <button
              onClick={handleUploadClick}
              disabled={isUploading}
              style={{ backgroundColor: '#1a1d1a', color: '#fff', border: 'none', padding: '0.85rem 1.5rem', borderRadius: '10px', fontWeight: 'bold', cursor: isUploading ? 'not-allowed' : 'pointer', fontSize: '0.95rem' }}
            >
              {isUploading ? 'Uploading...' : 'Upload a document ↗'}
            </button>
          </div>

          {/* Decorative Orbital Target Graphic */}
          <div style={{ width: '280px', height: '280px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '260px', height: '260px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', position: 'absolute' }}></div>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', position: 'absolute' }}></div>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', position: 'absolute' }}></div>
            <div style={{ width: '54px', height: '54px', backgroundColor: '#1a1d1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccf255', zIndex: 3 }}>
              ✦
            </div>
            <span style={{ position: 'absolute', top: '25px', right: '40px', backgroundColor: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>Context</span>
            <span style={{ position: 'absolute', left: '10px', top: '110px', backgroundColor: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>Answers</span>
            <span style={{ position: 'absolute', bottom: '25px', right: '10px', backgroundColor: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>Sources</span>
          </div>
        </section>

        {/* Stats Row */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eaeaea' }}>
            <h4 style={{ margin: 0, fontSize: '0.75rem', color: '#888', fontWeight: 'bold' }}>DOCUMENTS</h4>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#1a1d1a' }}>{selectedFile ? '1' : '0'}</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>{selectedFile ? selectedFile.name : 'Upload your first source'}</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eaeaea' }}>
            <h4 style={{ margin: 0, fontSize: '0.75rem', color: '#888', fontWeight: 'bold' }}>CONVERSATIONS</h4>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#1a1d1a' }}>0</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Your questions will live here</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eaeaea' }}>
            <h4 style={{ margin: 0, fontSize: '0.75rem', color: '#888', fontWeight: 'bold' }}>SOURCES CITED</h4>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#1a1d1a' }}>—</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Grounded answers, not guesses</p>
          </div>
        </section>

        {/* Empty State Banner */}
        <section style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #ccc', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#666' }}>+</div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#888', display: 'block' }}>START HERE</span>
              <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#1a1d1a' }}>Build your first source library</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Add a PDF or text document to make this workspace useful. The processing pipeline will extract, chunk, and index it for chat.</p>
            </div>
          </div>
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            style={{ backgroundColor: '#eaeaea', color: '#333', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: 'bold', cursor: isUploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}
          >
            Choose a file
          </button>
        </section>

        {/* Upload Status Banner */}
        {uploadStatus && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #ddd', color: '#1a1d1a', fontWeight: 'bold' }}>
            {uploadStatus}
          </div>
        )}
      </main>
    </div>
  );
}