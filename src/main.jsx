import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ImageExtractionPage from './pages/ImageExtractionPage';
import { StyledEngineProvider } from '@mui/material';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <div className="w-screen h-screen bg-gray-600 p-4">
        {/* <ApplicationPage/> */}
        {/* <ComponentPage /> */}
        {/* <ImageGenerationPage /> */}
        <ImageExtractionPage />
      </div>
    </StyledEngineProvider>
  </React.StrictMode>
);
