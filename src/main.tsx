import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initBasicSecurity } from './utils/basicSecurity'

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Initialisation sécurisée simplifiée (niveau 8.5/10)
initBasicSecurity();

if (import.meta.env.DEV) {
  console.log('🚀 Application starting with basic security (8.5/10)');
}

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
