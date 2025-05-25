// Función para exportar como JSON
export const exportAsJSON = (messages, chatTitle = "Conversación") => {
  const exportData = {
    title: chatTitle,
    exportDate: new Date().toISOString(),
    totalMessages: messages.length,
    conversation: messages.map((msg, index) => ({
      id: index + 1,
      sender: msg.sender,
      message: msg.message,
      timestamp: msg.timestamp || new Date().toISOString()
    }))
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `chat_${chatTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Función para exportar como TXT
export const exportAsText = (messages, chatTitle = "Conversación") => {
  let textContent = `=== ${chatTitle} ===\n`;
  textContent += `Fecha de exportación: ${new Date().toLocaleString()}\n`;
  textContent += `Total de mensajes: ${messages.length}\n\n`;
  textContent += "=" + "=".repeat(50) + "\n\n";

  messages.forEach((msg, index) => {
    const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : new Date().toLocaleString();
    textContent += `[${timestamp}] ${msg.sender.toUpperCase()}:\n`;
    textContent += `${msg.message}\n\n`;
    textContent += "-".repeat(50) + "\n\n";
  });

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.download = `chat_${chatTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
  window.URL.revokeObjectURL(url);
};

// Función para exportar como PDF (usando jsPDF)
export const exportAsPDF = (messages, chatTitle = "Conversación") => {
  // Necesitarás instalar jspdf: npm install jspdf
  import('jspdf').then(({ jsPDF }) => {
    const doc = new jsPDF();
    
    // Configuración inicial
    doc.setFontSize(16);
    doc.text(chatTitle, 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Fecha de exportación: ${new Date().toLocaleString()}`, 20, 30);
    doc.text(`Total de mensajes: ${messages.length}`, 20, 35);
    
    let yPosition = 50;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 7;
    
    messages.forEach((msg, index) => {
      // Verificar si necesitamos una nueva página
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Timestamp y sender
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : new Date().toLocaleString();
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(`[${timestamp}] ${msg.sender.toUpperCase()}:`, margin, yPosition);
      yPosition += lineHeight;
      
      // Mensaje
      doc.setFontSize(10);
      doc.setTextColor(0);
      
      // Dividir texto largo en líneas
      const splitText = doc.splitTextToSize(msg.message, 170);
      splitText.forEach(line => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      
      yPosition += lineHeight; // Espacio entre mensajes
    });
    
    // Guardar el PDF
    doc.save(`chat_${chatTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  }).catch(error => {
    console.error('Error al cargar jsPDF:', error);
    alert('Error al exportar PDF. Asegúrate de tener jsPDF instalado.');
  });
};

// Componente de botón de exportación
export const ExportButton = ({ messages, chatTitle, onExport }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleExport = (format) => {
    if (messages.length === 0) {
      alert('No hay mensajes para exportar');
      return;
    }
    
    switch (format) {
      case 'json':
        exportAsJSON(messages, chatTitle);
        break;
      case 'txt':
        exportAsText(messages, chatTitle);
        break;
      case 'pdf':
        exportAsPDF(messages, chatTitle);
        break;
      default:
        console.error('Formato no soportado');
    }
    
    setShowDropdown(false);
    if (onExport) onExport(format);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        disabled={messages.length === 0}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Exportar
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <button
              onClick={() => handleExport('json')}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
            >
              <span className="text-blue-600 font-mono text-sm mr-3">JSON</span>
              Formato estructurado
            </button>
            <button
              onClick={() => handleExport('txt')}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
            >
              <span className="text-green-600 font-mono text-sm mr-3">TXT</span>
              Texto plano
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
            >
              <span className="text-red-600 font-mono text-sm mr-3">PDF</span>
              Documento portable
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook personalizado para manejar exportaciones
export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [lastExport, setLastExport] = useState(null);
  
  const exportConversation = async (messages, format, chatTitle) => {
    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular procesamiento
      
      switch (format) {
        case 'json':
          exportAsJSON(messages, chatTitle);
          break;
        case 'txt':
          exportAsText(messages, chatTitle);
          break;
        case 'pdf':
          exportAsPDF(messages, chatTitle);
          break;
        default:
          throw new Error('Formato no soportado');
      }
      
      setLastExport({
        format,
        timestamp: new Date(),
        messageCount: messages.length
      });
      
    } catch (error) {
      console.error('Error al exportar:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };
  
  return {
    exportConversation,
    isExporting,
    lastExport
  };
};