
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { UnifiedModalProvider } from '@/components/modals/unified/UnifiedModalProvider';
import { EnhancedSecurityProvider } from '@/components/security/EnhancedSecurityProvider';
import { GlobalNotificationManager } from '@/components/common/GlobalNotificationManager';

import { AIAutoFillGlobalManager } from '@/components/ai/AIAutoFillGlobalManager';
import '@/utils/realActionHandler'; // Initialiser le gestionnaire d'actions réelles
import { initializeUniversalButtonHandlers } from '@/utils/universalButtonHandler';
import { initializeSampleData } from '@/data/sampleData';
import { useAppStore } from '@/stores/appStore';

function App() {
  // Initialiser les handlers universels et les données d'exemple au démarrage
  React.useEffect(() => {
    initializeUniversalButtonHandlers();
    
    // Initialiser les données d'exemple seulement si le store est vide
    const store = useAppStore.getState();
    if (store.legalTexts.length === 0) {
      initializeSampleData();
    }
  }, []);

  return (
    <EnhancedSecurityProvider>
      <UnifiedModalProvider>
          <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/:section" element={<Index />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster />
              <AIAutoFillGlobalManager />
              <GlobalNotificationManager />
            </div>
          </BrowserRouter>
        </UnifiedModalProvider>
    </EnhancedSecurityProvider>
  );
}

export default App;
