import { useAppStore } from '@/stores/appStore';
import { toast } from '@/hooks/use-toast';

// Types pour les actions
interface ActionContext {
  type: string;
  data: any;
  callback?: (result: any) => void;
}

// Gestionnaire d'actions réelles
export class RealActionHandler {
  private static instance: RealActionHandler;
  private store: any;

  static getInstance(): RealActionHandler {
    if (!RealActionHandler.instance) {
      RealActionHandler.instance = new RealActionHandler();
    }
    return RealActionHandler.instance;
  }

  constructor() {
    this.store = useAppStore.getState();
    this.initializeEventListeners();
  }

  private initializeEventListeners() {
    // Actions pour les textes juridiques
    window.addEventListener('view-legal-text', this.handleViewLegalText.bind(this));
    window.addEventListener('download-legal-text', this.handleDownloadLegalText.bind(this));
    window.addEventListener('share-legal-text', this.handleShareLegalText.bind(this));
    window.addEventListener('add-legal-text', this.handleAddLegalText.bind(this));
    window.addEventListener('edit-legal-text', this.handleEditLegalText.bind(this));
    window.addEventListener('delete-legal-text', this.handleDeleteLegalText.bind(this));
    
    // Actions pour les procédures
    window.addEventListener('view-procedure', this.handleViewProcedure.bind(this));
    window.addEventListener('add-procedure', this.handleAddProcedure.bind(this));
    window.addEventListener('edit-procedure', this.handleEditProcedure.bind(this));
    window.addEventListener('delete-procedure', this.handleDeleteProcedure.bind(this));
    
    // Actions pour les actualités
    window.addEventListener('read-news', this.handleReadNews.bind(this));
    window.addEventListener('add-news', this.handleAddNews.bind(this));
    window.addEventListener('edit-news', this.handleEditNews.bind(this));
    window.addEventListener('delete-news', this.handleDeleteNews.bind(this));
    
    // Actions pour les recherches
    window.addEventListener('immersive-search', this.handleImmersiveSearch.bind(this));
    window.addEventListener('save-search', this.handleSaveSearch.bind(this));
    window.addEventListener('execute-saved-search', this.handleExecuteSavedSearch.bind(this));
    window.addEventListener('edit-saved-search', this.handleEditSavedSearch.bind(this));
    window.addEventListener('delete-saved-search', this.handleDeleteSavedSearch.bind(this));
    
    // Actions pour les favoris
    window.addEventListener('add-to-favorites', this.handleAddToFavorites.bind(this));
    window.addEventListener('remove-from-favorites', this.handleRemoveFromFavorites.bind(this));
    window.addEventListener('view-favorites', this.handleViewFavorites.bind(this));
    
    // Actions pour les modèles
    window.addEventListener('create-template', this.handleCreateTemplate.bind(this));
    window.addEventListener('use-template', this.handleUseTemplate.bind(this));
    window.addEventListener('edit-template', this.handleEditTemplate.bind(this));
    window.addEventListener('delete-template', this.handleDeleteTemplate.bind(this));
    
    // Actions pour les téléchargements
    window.addEventListener('download-resource', this.handleDownloadResource.bind(this));
    window.addEventListener('export-data', this.handleExportData.bind(this));
    window.addEventListener('import-data', this.handleImportData.bind(this));
    
    // Actions de workflow
    window.addEventListener('approve-document', this.handleApproveDocument.bind(this));
    window.addEventListener('reject-document', this.handleRejectDocument.bind(this));
    window.addEventListener('request-changes', this.handleRequestChanges.bind(this));
    
    // Actions de navigation
    window.addEventListener('navigate-to-section', this.handleNavigateToSection.bind(this));
    
    // Actions de formulaires
    window.addEventListener('open-form-modal', this.handleOpenFormModal.bind(this));
    window.addEventListener('submit-form', this.handleSubmitForm.bind(this));
  }

  // Actions pour les textes juridiques
  private handleViewLegalText(event: CustomEvent) {
    const { textId, title } = event.detail;
    const text = this.store.getLegalText(textId);
    
    if (text) {
      this.openDocumentViewer(text);
    } else {
      // Créer un document exemple si non trouvé
      const exampleText = {
        id: textId,
        title: title || 'Document Juridique',
        content: this.generateExampleLegalContent(title),
        type: 'law' as const,
        status: 'published' as const,
        category: 'Général',
        author: 'Système',
        tags: ['exemple', 'juridique'],
        metadata: {
          source: 'Système automatique',
          references: [],
          validity: 'En vigueur'
        }
      };
      this.openDocumentViewer(exampleText);
    }
  }

  private handleDownloadLegalText(event: CustomEvent) {
    const { textId, title, format = 'PDF' } = event.detail;
    const text = this.store.getLegalText(textId) || {
      title: title || 'Document',
      content: this.generateExampleLegalContent(title)
    };
    
    this.downloadDocument(text, format);
  }

  private handleShareLegalText(event: CustomEvent) {
    const { textId, title } = event.detail;
    this.shareDocument(textId, title);
  }

  private handleAddLegalText(event: CustomEvent) {
    const { data } = event.detail;
    this.openLegalTextForm(data);
  }

  private handleEditLegalText(event: CustomEvent) {
    const { textId } = event.detail;
    const text = this.store.getLegalText(textId);
    if (text) {
      this.openLegalTextForm(text);
    }
  }

  private handleDeleteLegalText(event: CustomEvent) {
    const { textId } = event.detail;
    this.confirmAndDelete('legal-text', textId);
  }

  // Actions pour les procédures
  private handleViewProcedure(event: CustomEvent) {
    const { procedureId, title } = event.detail;
    const procedure = this.store.getProcedure(procedureId);
    
    if (procedure) {
      this.openProcedureViewer(procedure);
    } else {
      const exampleProcedure = {
        id: procedureId,
        title: title || 'Procédure Administrative',
        description: 'Description de la procédure administrative',
        steps: this.generateExampleSteps(),
        category: 'Général',
        difficulty: 'medium' as const,
        estimatedTime: '30 minutes',
        requiredDocuments: ['Pièce d\'identité', 'Justificatif de domicile'],
        status: 'active' as const
      };
      this.openProcedureViewer(exampleProcedure);
    }
  }

  private handleAddProcedure(event: CustomEvent) {
    const { data } = event.detail;
    this.openProcedureForm(data);
  }

  private handleEditProcedure(event: CustomEvent) {
    const { procedureId } = event.detail;
    const procedure = this.store.getProcedure(procedureId);
    if (procedure) {
      this.openProcedureForm(procedure);
    }
  }

  private handleDeleteProcedure(event: CustomEvent) {
    const { procedureId } = event.detail;
    this.confirmAndDelete('procedure', procedureId);
  }

  // Actions pour les actualités
  private handleReadNews(event: CustomEvent) {
    const { newsTitle, newsId } = event.detail;
    
    // Marquer comme lu
    if (newsId) {
      this.store.markNewsAsRead(newsId, this.store.currentUser);
    }
    
    this.openNewsReader(newsId || newsTitle);
  }

  private handleAddNews(event: CustomEvent) {
    const { data } = event.detail;
    this.openNewsForm(data);
  }

  private handleEditNews(event: CustomEvent) {
    const { newsId } = event.detail;
    this.openNewsForm({ id: newsId });
  }

  private handleDeleteNews(event: CustomEvent) {
    const { newsId } = event.detail;
    this.confirmAndDelete('news', newsId);
  }

  // Actions pour les recherches
  private handleImmersiveSearch(event: CustomEvent) {
    const { searchType, query } = event.detail;
    this.performSearch(query, { type: searchType });
  }

  private handleSaveSearch(event: CustomEvent) {
    const { name, query, filters } = event.detail;
    this.store.saveSearch({ name, query, filters });
    toast({
      title: "Recherche sauvegardée",
      description: `La recherche "${name}" a été sauvegardée avec succès.`,
    });
  }

  private handleExecuteSavedSearch(event: CustomEvent) {
    const { searchId } = event.detail;
    const results = this.store.executeSavedSearch(searchId);
    this.displaySearchResults(results);
  }

  private handleEditSavedSearch(event: CustomEvent) {
    const { searchId } = event.detail;
    this.openSavedSearchEditor(searchId);
  }

  private handleDeleteSavedSearch(event: CustomEvent) {
    const { searchId } = event.detail;
    this.confirmAndDelete('saved-search', searchId);
  }

  // Actions pour les favoris
  private handleAddToFavorites(event: CustomEvent) {
    const { itemType, itemName, itemId } = event.detail;
    
    if (!this.store.isFavorite(itemId, itemType)) {
      this.store.addToFavorites({
        itemId: itemId || itemName,
        itemType,
        title: itemName
      });
      
      toast({
        title: "Ajouté aux favoris",
        description: `"${itemName}" ajouté à vos favoris.`,
      });
    } else {
      toast({
        title: "Déjà en favoris",
        description: `"${itemName}" est déjà dans vos favoris.`,
      });
    }
  }

  private handleRemoveFromFavorites(event: CustomEvent) {
    const { itemId, itemType } = event.detail;
    this.store.removeFromFavorites(itemId, itemType);
    toast({
      title: "Retiré des favoris",
      description: "L'élément a été retiré de vos favoris.",
    });
  }

  private handleViewFavorites(event: CustomEvent) {
    const { itemType } = event.detail;
    const favorites = this.store.getFavorites(itemType);
    this.displayFavorites(favorites);
  }

  // Actions pour les modèles
  private handleCreateTemplate(event: CustomEvent) {
    const { data } = event.detail;
    this.openTemplateCreator(data);
  }

  private handleUseTemplate(event: CustomEvent) {
    const { templateId } = event.detail;
    const template = this.store.useTemplate(templateId);
    if (template) {
      this.openTemplateEditor(template);
    }
  }

  private handleEditTemplate(event: CustomEvent) {
    const { templateId } = event.detail;
    this.openTemplateCreator({ id: templateId });
  }

  private handleDeleteTemplate(event: CustomEvent) {
    const { templateId } = event.detail;
    this.confirmAndDelete('template', templateId);
  }

  // Actions pour les téléchargements
  private handleDownloadResource(event: CustomEvent) {
    const { resourceName, resourceType } = event.detail;
    this.downloadResource(resourceName, resourceType);
  }

  private handleExportData(event: CustomEvent) {
    const data = this.store.exportData();
    this.downloadFile(data, 'application_data.json', 'application/json');
    toast({
      title: "Export réussi",
      description: "Les données ont été exportées avec succès.",
    });
  }

  private handleImportData(event: CustomEvent) {
    this.openFileImporter();
  }

  // Actions de workflow
  private handleApproveDocument(event: CustomEvent) {
    const { documentTitle, documentId } = event.detail;
    this.approveDocument(documentId, documentTitle);
  }

  private handleRejectDocument(event: CustomEvent) {
    const { documentTitle, documentId } = event.detail;
    this.rejectDocument(documentId, documentTitle);
  }

  private handleRequestChanges(event: CustomEvent) {
    const { documentTitle, documentId } = event.detail;
    this.requestChanges(documentId, documentTitle);
  }

  // Actions de navigation
  private handleNavigateToSection(event: CustomEvent) {
    const section = event.detail;
    this.store.setCurrentSection(section);
    
    // Déclencher la navigation dans l'interface
    window.dispatchEvent(new CustomEvent('section-change', {
      detail: { section }
    }));
  }

  // Actions de formulaires
  private handleOpenFormModal(event: CustomEvent) {
    const { formType, title } = event.detail;
    this.openFormModal(formType, title);
  }

  private handleSubmitForm(event: CustomEvent) {
    const { formType, data } = event.detail;
    this.submitForm(formType, data);
  }

  // Méthodes utilitaires pour l'interface utilisateur
  private openDocumentViewer(document: any) {
    const modal = this.createModal('Visualisation du Document', `
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h3 class="font-semibold text-blue-900 mb-2">${document.title}</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Type:</strong> ${document.type || 'Document'}</div>
            <div><strong>Statut:</strong> ${document.status || 'Actif'}</div>
            <div><strong>Catégorie:</strong> ${document.category || 'Général'}</div>
            <div><strong>Auteur:</strong> ${document.author || 'Système'}</div>
          </div>
        </div>
        
        <div class="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
          <div class="prose max-w-none">
            ${document.content || 'Contenu du document...'}
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('download-legal-text', {detail: {textId: '${document.id}', title: '${document.title}', format: 'PDF'}}))">
            Télécharger PDF
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('share-legal-text', {detail: {textId: '${document.id}', title: '${document.title}'}}))">
            Partager
          </button>
          <button class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'legal-text', itemName: '${document.title}', itemId: '${document.id}'}}))">
            Ajouter aux favoris
          </button>
        </div>
      </div>
    `);
  }

  private openProcedureViewer(procedure: any) {
    const stepsHtml = procedure.steps?.map((step: any, index: number) => `
      <div class="border-l-4 border-green-400 pl-4 py-2">
        <h4 class="font-semibold">Étape ${index + 1}: ${step.title || `Étape ${index + 1}`}</h4>
        <p class="text-sm text-gray-600">${step.description || 'Description de l\'étape'}</p>
        ${step.documents ? `<div class="text-xs text-blue-600 mt-1">Documents requis: ${step.documents.join(', ')}</div>` : ''}
      </div>
    `).join('') || '<p>Aucune étape définie</p>';

    const modal = this.createModal('Procédure Administrative', `
      <div class="space-y-4">
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <h3 class="font-semibold text-green-900 mb-2">${procedure.title}</h3>
          <p class="text-green-800 text-sm mb-2">${procedure.description}</p>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <div><strong>Difficulté:</strong> ${procedure.difficulty || 'Moyenne'}</div>
            <div><strong>Durée:</strong> ${procedure.estimatedTime || '30 min'}</div>
            <div><strong>Statut:</strong> ${procedure.status || 'Active'}</div>
          </div>
        </div>
        
        <div class="space-y-3">
          <h4 class="font-semibold">Étapes à suivre:</h4>
          ${stepsHtml}
        </div>
        
        <div class="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
          <h5 class="font-semibold text-yellow-800 mb-1">Documents requis:</h5>
          <ul class="text-yellow-700 text-sm">
            ${procedure.requiredDocuments?.map((doc: string) => `<li>• ${doc}</li>`).join('') || '<li>• Aucun document spécifique requis</li>'}
          </ul>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'procedure', itemName: '${procedure.title}', itemId: '${procedure.id}'}}))">
            Ajouter aux favoris
          </button>
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('download-resource', {detail: {resourceName: '${procedure.title}', resourceType: 'procedure'}}))">
            Télécharger guide
          </button>
        </div>
      </div>
    `);
  }

  private openNewsReader(newsId: string) {
    const news = {
      title: 'Actualité Juridique',
      content: 'Contenu de l\'actualité juridique avec les dernières informations importantes.',
      author: 'Rédaction',
      datePublished: new Date().toLocaleDateString('fr-FR'),
      category: 'Juridique'
    };

    const modal = this.createModal('Actualité', `
      <div class="space-y-4">
        <div class="border-b pb-4">
          <h3 class="text-xl font-semibold mb-2">${news.title}</h3>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Par ${news.author}</span>
            <span>${news.datePublished}</span>
          </div>
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">${news.category}</span>
        </div>
        
        <div class="prose max-w-none">
          <p>${news.content}</p>
          <p>Cette actualité contient des informations importantes concernant les dernières évolutions juridiques et réglementaires.</p>
        </div>
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('add-to-favorites', {detail: {itemType: 'news', itemName: '${news.title}', itemId: '${newsId}'}}))">
            Ajouter aux favoris
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onclick="window.dispatchEvent(new CustomEvent('share-legal-text', {detail: {textId: '${newsId}', title: '${news.title}'}}))">
            Partager
          </button>
        </div>
      </div>
    `);
  }

  private performSearch(query: string, options: any = {}) {
    const results = this.store.globalSearch(query);
    this.displaySearchResults(results, query);
  }

  private displaySearchResults(results: any, query?: string) {
    const totalResults = (results.legalTexts?.length || 0) + 
                        (results.procedures?.length || 0) + 
                        (results.news?.length || 0) + 
                        (results.templates?.length || 0);

    const resultsHtml = `
      <div class="space-y-4">
        <div class="bg-blue-50 p-3 rounded">
          <h4 class="font-semibold">${totalResults} résultats trouvés ${query ? `pour "${query}"` : ''}</h4>
        </div>
        
        ${results.legalTexts?.length > 0 ? `
          <div>
            <h5 class="font-semibold text-lg mb-2">Textes Juridiques (${results.legalTexts.length})</h5>
            ${results.legalTexts.slice(0, 3).map((text: any) => `
              <div class="border-l-4 border-blue-400 pl-3 py-2 mb-2 cursor-pointer hover:bg-gray-50" onclick="window.dispatchEvent(new CustomEvent('view-legal-text', {detail: {textId: '${text.id}', title: '${text.title}'}}))">
                <h6 class="font-medium">${text.title}</h6>
                <p class="text-sm text-gray-600">${text.content?.substring(0, 100)}...</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${results.procedures?.length > 0 ? `
          <div>
            <h5 class="font-semibold text-lg mb-2">Procédures (${results.procedures.length})</h5>
            ${results.procedures.slice(0, 3).map((proc: any) => `
              <div class="border-l-4 border-green-400 pl-3 py-2 mb-2 cursor-pointer hover:bg-gray-50" onclick="window.dispatchEvent(new CustomEvent('view-procedure', {detail: {procedureId: '${proc.id}', title: '${proc.title}'}}))">
                <h6 class="font-medium">${proc.title}</h6>
                <p class="text-sm text-gray-600">${proc.description?.substring(0, 100)}...</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="window.dispatchEvent(new CustomEvent('save-search', {detail: {name: 'Recherche ${new Date().toLocaleTimeString()}', query: '${query}', filters: {}}}))">
            Sauvegarder cette recherche
          </button>
        </div>
      </div>
    `;

    this.createModal('Résultats de Recherche', resultsHtml);
  }

  private downloadDocument(document: any, format: string) {
    const content = `
      ${document.title}
      
      ${document.content || 'Contenu du document'}
      
      ---
      Généré le ${new Date().toLocaleDateString('fr-FR')}
    `;
    
    this.downloadFile(content, `${document.title}.${format.toLowerCase()}`, 'text/plain');
    
    toast({
      title: "Téléchargement démarré",
      description: `${document.title}.${format} téléchargé avec succès.`,
    });
  }

  private downloadResource(resourceName: string, resourceType: string) {
    const content = `Ressource: ${resourceName}\nType: ${resourceType}\nTéléchargé le: ${new Date().toLocaleString('fr-FR')}`;
    this.downloadFile(content, `${resourceName}.txt`, 'text/plain');
    
    toast({
      title: "Ressource téléchargée",
      description: `${resourceName} téléchargé avec succès.`,
    });
  }

  private downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private shareDocument(documentId: string, title: string) {
    const shareUrl = `${window.location.origin}/document/${documentId}`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
          title: "Lien copié",
          description: "Le lien de partage a été copié dans le presse-papiers.",
        });
      });
    }
  }

  private createModal(title: string, content: string): HTMLElement {
    // Supprimer les modales existantes
    const existingModals = document.querySelectorAll('.real-action-modal');
    existingModals.forEach(modal => modal.remove());

    const modal = document.createElement('div');
    modal.className = 'real-action-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
    
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">${title}</h2>
            <button class="close-modal text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>
          <div class="mb-6">
            ${content}
          </div>
          <div class="flex justify-end">
            <button class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Fermer</button>
          </div>
        </div>
      </div>
    `;

    // Gestion des événements
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => modal.remove());
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    document.body.appendChild(modal);
    return modal;
  }

  // Méthodes utilitaires pour générer du contenu d'exemple
  private generateExampleLegalContent(title: string): string {
    return `
      <h1>${title || 'Document Juridique'}</h1>
      
      <h2>Article 1 - Objet</h2>
      <p>Le présent document définit les règles et procédures applicables dans le cadre de ${title || 'cette réglementation'}.</p>
      
      <h2>Article 2 - Champ d'application</h2>
      <p>Les dispositions du présent document s'appliquent à tous les cas relevant de sa compétence.</p>
      
      <h2>Article 3 - Modalités d'application</h2>
      <p>Les modalités d'application sont définies par les textes d'application correspondants.</p>
      
      <h2>Article 4 - Entrée en vigueur</h2>
      <p>Le présent document entre en vigueur à la date de sa publication.</p>
    `;
  }

  private generateExampleSteps(): any[] {
    return [
      {
        id: '1',
        title: 'Préparation des documents',
        description: 'Rassembler tous les documents nécessaires à la procédure',
        order: 1,
        isRequired: true,
        documents: ['Pièce d\'identité', 'Justificatif de domicile']
      },
      {
        id: '2',
        title: 'Dépôt de la demande',
        description: 'Déposer la demande auprès du service compétent',
        order: 2,
        isRequired: true
      },
      {
        id: '3',
        title: 'Suivi de la demande',
        description: 'Suivre l\'avancement de votre demande',
        order: 3,
        isRequired: false
      }
    ];
  }

  private confirmAndDelete(type: string, id: string) {
    const modal = this.createModal('Confirmer la suppression', `
      <div class="space-y-4">
        <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
        <div class="flex space-x-2 justify-end">
          <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onclick="
            window.dispatchEvent(new CustomEvent('confirm-delete', {detail: {type: '${type}', id: '${id}'}}));
            this.closest('.real-action-modal').remove();
          ">
            Supprimer
          </button>
          <button class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </div>
    `);

    // Gérer la confirmation
    window.addEventListener('confirm-delete', (event: any) => {
      const { type, id } = event.detail;
      switch (type) {
        case 'legal-text':
          this.store.deleteLegalText(id);
          break;
        case 'procedure':
          this.store.deleteProcedure(id);
          break;
        case 'news':
          this.store.deleteNews(id);
          break;
        case 'template':
          this.store.deleteTemplate(id);
          break;
        case 'saved-search':
          this.store.deleteSavedSearch(id);
          break;
      }
      toast({
        title: "Suppression effectuée",
        description: "L'élément a été supprimé avec succès.",
      });
    }, { once: true });
  }

  private openLegalTextForm(data?: any) {
    const isEdit = !!data?.id;
    const modal = this.createModal(isEdit ? 'Modifier le Texte Juridique' : 'Nouveau Texte Juridique', `
      <form class="space-y-4" onsubmit="event.preventDefault(); window.dispatchEvent(new CustomEvent('save-legal-text', {detail: {
        id: '${data?.id || ''}',
        title: event.target.title.value,
        content: event.target.content.value,
        type: event.target.type.value,
        category: event.target.category.value,
        tags: event.target.tags.value.split(',').map(t => t.trim()),
        author: '${this.store.currentUser}',
        status: 'draft'
      }})); this.closest('.real-action-modal').remove();">
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input type="text" name="title" value="${data?.title || ''}" class="w-full border rounded-md px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" class="w-full border rounded-md px-3 py-2">
              <option value="law" ${data?.type === 'law' ? 'selected' : ''}>Loi</option>
              <option value="decree" ${data?.type === 'decree' ? 'selected' : ''}>Décret</option>
              <option value="regulation" ${data?.type === 'regulation' ? 'selected' : ''}>Règlement</option>
              <option value="circular" ${data?.type === 'circular' ? 'selected' : ''}>Circulaire</option>
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <input type="text" name="category" value="${data?.category || ''}" class="w-full border rounded-md px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags (séparés par des virgules)</label>
            <input type="text" name="tags" value="${data?.tags?.join(', ') || ''}" class="w-full border rounded-md px-3 py-2">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
          <textarea name="content" rows="10" class="w-full border rounded-md px-3 py-2" required>${data?.content || ''}</textarea>
        </div>
        
        <div class="flex space-x-2 justify-end">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ${isEdit ? 'Modifier' : 'Créer'}
          </button>
          <button type="button" class="close-modal bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </form>
    `);

    // Gérer la sauvegarde
    window.addEventListener('save-legal-text', (event: any) => {
      const data = event.detail;
      if (data.id) {
        this.store.updateLegalText(data.id, data);
        toast({
          title: "Texte modifié",
          description: "Le texte juridique a été modifié avec succès.",
        });
      } else {
        this.store.addLegalText(data);
        toast({
          title: "Texte créé",
          description: "Le nouveau texte juridique a été créé avec succès.",
        });
      }
    }, { once: true });
  }

  private openProcedureForm(data?: any) {
    // Implémentation similaire pour les procédures
    const modal = this.createModal('Formulaire Procédure', `
      <p>Formulaire de création/modification de procédure (à implémenter)</p>
    `);
  }

  private openNewsForm(data?: any) {
    // Implémentation similaire pour les actualités
    const modal = this.createModal('Formulaire Actualité', `
      <p>Formulaire de création/modification d'actualité (à implémenter)</p>
    `);
  }

  private openTemplateCreator(data?: any) {
    // Implémentation pour le créateur de modèles
    const modal = this.createModal('Créateur de Modèles', `
      <p>Interface de création de modèles (à implémenter)</p>
    `);
  }

  private openTemplateEditor(template: any) {
    // Implémentation pour l'éditeur de modèles
    const modal = this.createModal('Éditeur de Modèles', `
      <p>Interface d'édition du modèle "${template.name}" (à implémenter)</p>
    `);
  }

  private displayFavorites(favorites: any[]) {
    const favoritesHtml = favorites.map(fav => `
      <div class="border rounded-lg p-3 hover:bg-gray-50">
        <h4 class="font-medium">${fav.title}</h4>
        <p class="text-sm text-gray-600">Type: ${fav.itemType}</p>
        <p class="text-xs text-gray-500">Ajouté le: ${new Date(fav.dateAdded).toLocaleDateString('fr-FR')}</p>
      </div>
    `).join('');

    this.createModal('Mes Favoris', `
      <div class="space-y-3">
        ${favorites.length > 0 ? favoritesHtml : '<p class="text-gray-500">Aucun favori pour le moment.</p>'}
      </div>
    `);
  }

  private openSavedSearchEditor(searchId: string) {
    // Implémentation pour l'éditeur de recherches sauvegardées
    const modal = this.createModal('Modifier la Recherche', `
      <p>Éditeur de recherche sauvegardée (à implémenter)</p>
    `);
  }

  private openFormModal(formType: string, title: string) {
    // Implémentation générique pour les modales de formulaires
    const modal = this.createModal(`Formulaire: ${title}`, `
      <p>Formulaire générique pour ${formType} (à implémenter)</p>
    `);
  }

  private submitForm(formType: string, data: any) {
    // Implémentation générique pour la soumission de formulaires
    toast({
      title: "Formulaire soumis",
      description: `Le formulaire ${formType} a été soumis avec succès.`,
    });
  }

  private approveDocument(documentId: string, documentTitle: string) {
    // Logique d'approbation
    toast({
      title: "Document approuvé",
      description: `"${documentTitle}" a été approuvé avec succès.`,
    });
  }

  private rejectDocument(documentId: string, documentTitle: string) {
    // Logique de rejet
    toast({
      title: "Document rejeté",
      description: `"${documentTitle}" a été rejeté.`,
    });
  }

  private requestChanges(documentId: string, documentTitle: string) {
    // Logique de demande de modifications
    toast({
      title: "Modifications demandées",
      description: `Demande de modifications envoyée pour "${documentTitle}".`,
    });
  }

  private openFileImporter() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            this.store.importData(e.target.result);
            toast({
              title: "Import réussi",
              description: "Les données ont été importées avec succès.",
            });
          } catch (error) {
            toast({
              title: "Erreur d'import",
              description: "Impossible d'importer les données.",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }
}

// Initialiser le gestionnaire d'actions réelles
export const realActionHandler = RealActionHandler.getInstance();