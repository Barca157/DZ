
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { UnifiedModalProvider } from '@/components/modals/unified/UnifiedModalProvider';
import { EnhancedSecurityProvider } from '@/components/security/EnhancedSecurityProvider';
import { GlobalNotificationManager } from '@/components/common/GlobalNotificationManager';

import { AIAutoFillGlobalManager } from '@/components/ai/AIAutoFillGlobalManager';

function App() {
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
