import React, { useRef } from 'react';

export function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file);
    // Call your upload API function here (e.g., uploadDocument(file))
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        accept=".pdf,.txt,.docx"
      />

      {/* Main Hero Upload Button */}
      <button className="primary-button" onClick={triggerFileInput}>
        Upload a document ↗
      </button>

      {/* Lower Empty State Button */}
      <button className="secondary-button" onClick={triggerFileInput}>
        Choose a file
      </button>
    </div>
  );
}