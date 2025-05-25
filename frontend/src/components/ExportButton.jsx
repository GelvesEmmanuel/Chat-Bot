import React, { useState } from 'react';

const ExportButton = ({ messages, chatTitle = "Conversación", onExport }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleExport = (format) => {
    if (messages.length === 0) {
      alert('No hay mensajes para exportar');
      return;
    }
    
    setShowDropdown(false);
    if (onExport) onExport(format);
  };

  return (
    <div className="export-container" style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="export-button"
        disabled={messages.length === 0}
        style={{
          padding: '8px 16px',
          backgroundColor: messages.length === 0 ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: messages.length === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        📥 Exportar ({messages.length})
      </button>
      
      {showDropdown && (
        <div 
          className="export-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 1000,
            minWidth: '150px'
          }}
        >
          <button
            onClick={() => handleExport('json')}
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            📄 JSON
          </button>
          <button
            onClick={() => handleExport('txt')}
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              backgroundColor: 'transparent',
              textAlign: 'left',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            📝 Texto
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;