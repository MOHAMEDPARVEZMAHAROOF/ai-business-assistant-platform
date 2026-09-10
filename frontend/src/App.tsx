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
      } else {
        setUploadStatus(`Upload failed with status code ${response.status}`);
      }
    } catch (error) {
      setUploadStatus('Network error: Unable to reach backend server.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      height: '100vh', 
      maxHeight: '100vh', 
      overflow: 'hidden', 
      backgroundColor: '#f4f3ef', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.docx"
      />

      {/* Dark Fixed Sidebar */}
      <aside style={{ 
        width: '240px', 
        minWidth: '240px',
        height: '100vh', 
        backgroundColor: '#1f211f', 
        color: '#fff', 
        padding: '1.75rem 1.25rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2.5rem',
        boxSizing: 'border-box',
        userSelect: 'none'
      }}>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', fontSize: '1.15rem', color: '#ffffff' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#c8f560', color: '#1f211f', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem' }}>
            A
          </div>
          Atlas Assist
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', backgroundColor: '#2f332f', borderRadius: '10px', cursor: 'pointer', color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>
            <span style={{ color: '#c8f560', fontSize: '0.8rem' }}>✦</span> Workspace
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', color: '#909490', fontSize: '0.9rem', fontWeight: '500' }}>
            <span style={{ fontSize: '0.9rem' }}>≡</span> Documents
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', color: '#909490', fontSize: '0.9rem', fontWeight: '500' }}>
            <span style={{ fontSize: '0.85rem' }}>🕒</span> History
          </div>
        </nav>
      </aside>

      {/* Bound Scrollable Workspace Content */}
      <main style={{ 
        flex: 1, 
        height: '100vh', 
        overflowY: 'auto', 
        padding: '2.5rem 3.5rem', 
        boxSizing: 'border-box',
        overscrollBehavior: 'contain'
      }}>
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: '700', color: '#808480', textTransform: 'uppercase' }}>AI BUSINESS ASSISTANT</span>
            <h1 style={{ fontSize: '2.75rem', margin: '0.2rem 0 0 0', fontWeight: '800', color: '#1a1d1a', letterSpacing: '-1px' }}>Make sense of the work.</h1>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #d8d6d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700', color: '#555', backgroundColor: '#fff' }}>
            MM
          </div>
        </header>

        {/* Lime Green Banner */}
        <section style={{ 
          backgroundColor: '#cbf34a', 
          borderRadius: '28px', 
          padding: '3rem 3.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          position: 'relative', 
          overflow: 'hidden', 
          marginBottom: '1.75rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          <div style={{ maxWidth: '460px', zIndex: 2 }}>
            <span style={{ display: 'inline-block', padding: '0.4rem 0.9rem', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.8px', marginBottom: '1.75rem', color: '#1a1d1a' }}>
              YOUR PRIVATE KNOWLEDGE LAYER
            </span>
            <h2 style={{ fontSize: '3rem', lineHeight: '1.05', fontWeight: '800', margin: '0 0 1.25rem 0', color: '#1a1d1a', letterSpacing: '-1.5px' }}>
              Ask better questions of every document.
            </h2>
            <p style={{ color: '#2d302d', fontSize: '0.98rem', lineHeight: '1.5', marginBottom: '2.25rem', fontWeight: '400' }}>
              Upload policies, reports, and internal notes. Atlas will find the relevant context and show you where every answer came from.
            </p>
            <button
              onClick={handleUploadClick}
              disabled={isUploading}
              style={{ backgroundColor: '#1a1d1a', color: '#fff', border: 'none', padding: '0.9rem 1.6rem', borderRadius: '12px', fontWeight: '700', cursor: isUploading ? 'not-allowed' : 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {isUploading ? 'Uploading...' : 'Upload a document ↗'}
            </button>
          </div>

          {/* Orbital Diagram */}
          <div style={{ width: '300px', height: '300px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.12)', position: 'absolute' }}></div>
            <div style={{ width: '190px', height: '190px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.12)', position: 'absolute' }}></div>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.12)', position: 'absolute' }}></div>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#1a1d1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbf34a', zIndex: 3, fontSize: '1.2rem' }}>
              ✦
            </div>
            <span style={{ position: 'absolute', top: '30px', right: '45px', backgroundColor: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700', color: '#1a1d1a', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Context</span>
            <span style={{ position: 'absolute', left: '12px', top: '120px', backgroundColor: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700', color: '#1a1d1a', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Answers</span>
            <span style={{ position: 'absolute', bottom: '30px', right: '15px', backgroundColor: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700', color: '#1a1d1a', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Sources</span>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1.75rem' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '20px', border: '1px solid #e8e6e0' }}>
            <h4 style={{ margin: 0, fontSize: '0.72rem', color: '#808480', fontWeight: '700', letterSpacing: '0.5px' }}>DOCUMENTS</h4>
            <p style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0.6rem 0 0.4rem 0', color: '#1a1d1a', letterSpacing: '-0.5px' }}>{selectedFile ? '1' : '0'}</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#808480' }}>{selectedFile ? selectedFile.name : 'Upload your first source'}</p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '20px', border: '1px solid #e8e6e0' }}>
            <h4 style={{ margin: 0, fontSize: '0.72rem', color: '#808480', fontWeight: '700', letterSpacing: '0.5px' }}>CONVERSATIONS</h4>
            <p style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0.6rem 0 0.4rem 0', color: '#1a1d1a', letterSpacing: '-0.5px' }}>0</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#808480' }}>Your questions will live here</p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '1.75rem', borderRadius: '20px', border: '1px solid #e8e6e0' }}>
            <h4 style={{ margin: 0, fontSize: '0.72rem', color: '#808480', fontWeight: '700', letterSpacing: '0.5px' }}>SOURCES CITED</h4>
            <p style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0.6rem 0 0.4rem 0', color: '#1a1d1a', letterSpacing: '-0.5px' }}>—</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#808480' }}>Grounded answers, not guesses</p>
          </div>
        </section>

        {/* Start Here Card */}
        <section style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px dashed #d0cecf', padding: '1.75rem 2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '44px', height: '44px', backgroundColor: '#f2f0ea', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#555', fontWeight: '400' }}>+</div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#808480', letterSpacing: '0.5px', display: 'block', marginBottom: '0.2rem' }}>START HERE</span>
              <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.15rem', fontWeight: '800', color: '#1a1d1a' }}>Build your first source library</h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#666', maxWidth: '600px' }}>Add a PDF or text document to make this workspace useful. The processing pipeline will extract, chunk, and index it for chat.</p>
            </div>
          </div>
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            style={{ backgroundColor: '#e8e6e0', color: '#1a1d1a', border: 'none', padding: '0.85rem 1.4rem', borderRadius: '10px', fontWeight: '700', cursor: isUploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', fontSize: '0.88rem' }}
          >
            Choose a file
          </button>
        </section>

        {/* Upload Status Banner */}
        {uploadStatus && (
          <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e8e6e0', color: '#1a1d1a', fontWeight: '700', fontSize: '0.9rem' }}>
            {uploadStatus}
          </div>
        )}
      </main>
    </div>
  );
}