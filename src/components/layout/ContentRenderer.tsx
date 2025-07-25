
import { Dashboard } from "@/components/Dashboard";
import { LegalTextsSections } from "@/components/LegalTextsSections";
import { AdministrativeProcedures } from "@/components/AdministrativeProcedures";
import { ProceduresSections } from "@/components/ProceduresSections";
import { AnalysisReportsSections } from "@/components/AnalysisReportsSections";
import { EnhancedAssistedWritingSection } from "@/components/EnhancedAssistedWritingSection";
import { CollaborationSections } from "@/components/CollaborationSections";
import { NewsReferencesSections } from "@/components/NewsReferencesSections";
import { ConfigurationSections } from "@/components/ConfigurationSections";
import { HelpSections } from "@/components/HelpSections";
import { AISearchSection } from "@/components/AISearchSection";
import { FavoritesSection } from "@/components/FavoritesSection";
import { DataExtractionSection } from "@/components/DataExtractionSection";
import { DocumentTemplatesSection } from "@/components/DocumentTemplatesSection";
import { AdvancedSearchSection } from "@/components/AdvancedSearchSection";
import { SavedSearchesEnhanced } from "@/components/SavedSearchesEnhanced";
import { AccessibilitySettings } from "@/components/configuration/AccessibilitySettings";
import { EnhancedAccessibilitySettings } from "@/components/configuration/EnhancedAccessibilitySettings";
import { OfflineMode } from "@/components/configuration/OfflineMode";
import { SecuritySection } from "@/components/configuration/SecuritySection";
import { MobileAppSection } from "@/components/configuration/MobileAppSection";
import { IntegrationsInteroperabilitySection } from "@/components/configuration/IntegrationsInteroperabilitySection";
import AlgerianLegalOCRComponent from "@/components/ocr/AlgerianLegalOCRComponent";
import OCRDemoComponent from "@/components/ocr/OCRDemoComponent";
import SimpleOCRDiagnostic from "@/components/ocr/SimpleOCRDiagnostic";
import OCRTestBasic from "@/components/OCRTestBasic";
import SimplifiedOCRComponent from "@/components/ocr/SimplifiedOCRComponent";
import RealOCRComponent from "@/components/ocr/RealOCRComponent";
import DZOCRIAProcessor from "@/components/ocr/DZOCRIAProcessor";
import ApprovalWorkflowComponent from "@/components/ocr/ApprovalWorkflowComponent";
import BatchProcessingComponent from "@/components/ocr/BatchProcessingComponent";
import OCRAnalyticsComponent from "@/components/ocr/OCRAnalyticsComponent";
import OCRSettingsComponent from "@/components/ocr/OCRSettingsComponent";
import { MonitoringComponent } from "@/components/monitoring/MonitoringComponent";

import { AIAdvancedSection } from "@/components/ai/AIAdvancedSection";
import { AnalyticsDashboardsSection } from "@/components/analytics/AnalyticsDashboardsSection";

// NextGenSearchSection intégré dans les onglets de recherche
import { EnhancedAILegalAssistant } from "@/components/ai/EnhancedAILegalAssistant";
import { AdminPanel } from "@/components/admin/AdminPanel";

interface ContentRendererProps {
  activeSection: string;
  language: string;
  refreshTrigger?: number;
}

export function ContentRenderer({ activeSection, language, refreshTrigger }: ContentRendererProps) {
  switch (activeSection) {
    case "dashboard":
      return (
        <div className="space-y-8">
          <Dashboard language={language} />
        </div>
      );
    
    // OCR + IA sections - Composants fonctionnels
    case "ocr-extraction":
      return <DZOCRIAProcessor />;
    case "batch-processing":
      return <BatchProcessingComponent />;
    case "ocr-analytics":
      return <OCRAnalyticsComponent />;
    case "approval-workflow":
      return <ApprovalWorkflowComponent />;
    case "ocr-settings":
      return <OCRSettingsComponent />;
    case "monitoring":
      return <MonitoringComponent />;
    
    // Legal Texts sections
    case "legal-catalog":
    case "legal-enrichment":
    case "legal-search":
      return <LegalTextsSections section={activeSection} language={language} />;
    
    // Administrative Procedures sections
    case "procedures-catalog":
      return <AdministrativeProcedures />;
    case "procedures-enrichment":
    case "procedures-search":
    case "procedures-resources":
      return <ProceduresSections section={activeSection} language={language} />;
    
    // Analysis & Reports sections
    case "dashboards":
    case "analysis":
    case "reports":
      return <AnalysisReportsSections section={activeSection} language={language} />;
    case "analytics-dashboards":
      return <AnalyticsDashboardsSection language={language} />;
    case "assisted-writing":
      return <EnhancedAssistedWritingSection />;
    
    // Collaboration sections
    case "forum":
    case "collaborative-workspace":
    case "shared-resources":
      return <CollaborationSections section={activeSection} language={language} />;
    
    // News & References sections
    case "news":
    case "library":
    case "dictionaries":
    case "directories":
      return <NewsReferencesSections section={activeSection} language={language} />;
    
    // Configuration sections
    case "nomenclature":
    case "complementary-resources":
    case "alerts-notifications":
    case "user-management":
    case "performance-scalability":
      return <ConfigurationSections section={activeSection} language={language} />;
    case "integrations-interoperability":
      return <IntegrationsInteroperabilitySection language={language} />;
    
    // Redirect data-management to security section
    case "data-management":
    case "security":
      return <SecuritySection language={language} />;
    
    // New mobile app section
    case "mobile-app":
      return <MobileAppSection language={language} />;
    
    // New configuration sections
    case "accessibility-settings":
      return <EnhancedAccessibilitySettings language={language} />;
    case "offline-mode":
      return <OfflineMode language={language} />;
    
    // Help sections
    case "about":
    case "contact":
    case "technical-support":
      return <HelpSections section={activeSection} language={language} />;

    // Legal sections  
    case "privacy-policy":
      return (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              La République Algérienne Démocratique et Populaire s'engage à protéger la confidentialité 
              des utilisateurs de la plateforme dalil.dz.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Collecte des données</h2>
            <p className="text-gray-600 mb-4">
              Nous collectons uniquement les données nécessaires au fonctionnement de la plateforme 
              et à l'amélioration de nos services juridiques.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Utilisation des données</h2>
            <p className="text-gray-600 mb-4">
              Les données collectées sont utilisées exclusivement pour fournir les services de veille 
              juridique et améliorer l'expérience utilisateur.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Protection des données</h2>
            <p className="text-gray-600 mb-4">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données 
              personnelles contre tout accès non autorisé.
            </p>
          </div>
        </div>
      );
    
    case "terms-of-use":
      return (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              En utilisant la plateforme dalil.dz, vous acceptez les présentes conditions d'utilisation.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Accès à la plateforme</h2>
            <p className="text-gray-600 mb-4">
              L'accès à dalil.dz est réservé aux professionnels du droit et aux citoyens algériens 
              pour des fins légitimes de consultation juridique.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Utilisation appropriée</h2>
            <p className="text-gray-600 mb-4">
              Les utilisateurs s'engagent à utiliser la plateforme de manière responsable et 
              conforme à la législation algérienne en vigueur.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-600 mb-4">
              Les contenus juridiques disponibles sur dalil.dz sont la propriété de l'État algérien 
              et sont protégés par le droit d'auteur.
            </p>
          </div>
        </div>
      );

    case "messages":
      return (
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Messages et Notifications</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Messages récents</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                    <h3 className="font-medium text-blue-900">Nouvelle mise à jour juridique</h3>
                    <p className="text-blue-700 text-sm mt-1">
                      Une nouvelle loi sur le commerce électronique a été publiée au Journal Officiel.
                    </p>
                    <p className="text-blue-600 text-xs mt-2">Il y a 2 heures</p>
                  </div>
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <h3 className="font-medium text-green-900">Validation de document</h3>
                    <p className="text-green-700 text-sm mt-1">
                      Votre document "Procédure d'immatriculation" a été validé et publié.
                    </p>
                    <p className="text-green-600 text-xs mt-2">Il y a 1 jour</p>
                  </div>
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <h3 className="font-medium text-yellow-900">Rappel de deadline</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      N'oubliez pas de soumettre votre rapport mensuel avant le 30 du mois.
                    </p>
                    <p className="text-yellow-600 text-xs mt-2">Il y a 3 jours</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notifications email</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Alertes juridiques</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Messages système</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // AI sections
    case "ai-assistant":
      return <EnhancedAILegalAssistant />;
    case "ai-advanced":
      return <AIAdvancedSection />;
    // ai-search désormais intégré dans les onglets de recherche
    
    // Admin section
    case "admin":
      return <AdminPanel />;
    
    // Other sections
    case "favorites":
      return <FavoritesSection />;
    case "data-extraction":
      return <DataExtractionSection />;
    case "document-templates":
      return <DocumentTemplatesSection />;
    case "advanced-search":
      return <AdvancedSearchSection />;
    case "saved-searches":
      return <SavedSearchesEnhanced />;
    
    
    default:
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Section en cours de développement</h3>
            <p className="text-muted-foreground">Cette fonctionnalité sera disponible prochainement.</p>
          </div>
        </div>
      );
  }
}
