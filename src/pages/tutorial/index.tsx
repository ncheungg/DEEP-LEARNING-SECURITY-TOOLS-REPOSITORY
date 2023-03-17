import React, { useEffect, useState } from 'react';

const PdfViewer = () => {
  return (
      <div style={{ width: '100%', height: '100vh' }}>
        <object data="https://storage.googleapis.com/dlstr-pdf-storage/Tutorial.pdf" type="application/pdf" width="100%" height="100%">
          <p>PDF viewer is not supported by your browser. Please download the PDF file.</p>
        </object>
      </div>
  );
};

export default PdfViewer;