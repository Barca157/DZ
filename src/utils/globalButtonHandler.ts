import { toast } from "@/hooks/use-toast";

// Types pour les différentes actions
export interface ActionContext {
  type: string;
  title?: string;
  id?: string;
  data?: any;
  callback?: () => void;
}

// Gestionnaire global des actions de boutons
export class GlobalButtonHandler {
  private static instance: GlobalButtonHandler;
  private modalContainer: HTMLElement | null = null;

  static getInstance(): GlobalButtonHandler {
    if (!GlobalButtonHandler.instance) {
      GlobalButtonHandler.instance = new GlobalButtonHandler();
    }
    return GlobalButtonHandler.instance;
  }

  constructor() {
    this.initializeEventListeners();
    this.createModalContainer();
  }

  private createModalContainer() {
    if (!this.modalContainer) {
      this.modalContainer = document.createElement('div');
      this.modalContainer.id = 'global-modal-container';
      this.modalContainer.className = 'fixed inset-0 z-50 hidden';
      document.body.appendChild(this.modalContainer);
    }
  }

  private initializeEventListeners() {
    // Écouter tous les événements personnalisés
    window.addEventListener('generic-button-click', this.handleGenericClick.bind(this));
    window.addEventListener('view-legal-text', this.handleViewDocument.bind(this));
    window.addEventListener('download-legal-text', this.handleDownloadDocument.bind(this));
    window.addEventListener('share-legal-text', this.handleShareDocument.bind(this));
    window.addEventListener('browse-legal-type', this.handleBrowseType.bind(this));
    window.addEventListener('immersive-search', this.handleSearch.bind(this));
    window.addEventListener('open-form-modal', this.handleOpenForm.bind(this));
    window.addEventListener('submit-form', this.handleSubmitForm.bind(this));
    window.addEventListener('mark-message-read', this.handleMarkMessageRead.bind(this));
    window.addEventListener('delete-message', this.handleDeleteMessage.bind(this));
    window.addEventListener('join-forum', this.handleJoinForum.bind(this));
    window.addEventListener('start-discussion', this.handleStartDiscussion.bind(this));
    window.addEventListener('execute-saved-search', this.handleExecuteSavedSearch.bind(this));
    window.addEventListener('edit-saved-search', this.handleEditSavedSearch.bind(this));
    window.addEventListener('delete-saved-search', this.handleDeleteSavedSearch.bind(this));
    window.addEventListener('add-to-favorites', this.handleAddToFavorites.bind(this));
    window.addEventListener('remove-from-favorites', this.handleRemoveFromFavorites.bind(this));
    window.addEventListener('read-news', this.handleReadNews.bind(this));
    window.addEventListener('download-resource', this.handleDownloadResource.bind(this));
    window.addEventListener('search-dictionary', this.handleSearchDictionary.bind(this));
    window.addEventListener('view-timeline-item', this.handleViewTimelineItem.bind(this));
    window.addEventListener('compare-versions', this.handleCompareVersions.bind(this));
    window.addEventListener('approve-document', this.handleApproveDocument.bind(this));
    window.addEventListener('reject-document', this.handleRejectDocument.bind(this));
    window.addEventListener('request-changes', this.handleRequestChanges.bind(this));
  }

  private showModal(title: string, content: string, actions?: Array<{label: string, action: () => void, variant?: string}>) {
    if (!this.modalContainer) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto';
    
    modalContent.innerHTML = `
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">${title}</h2>
          <button class="close-modal text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="mb-6">
          ${content}
        </div>
        <div class="flex justify-end space-x-3">
          ${actions?.map(action => 
            `<button class="action-btn px-4 py-2 rounded-md ${
              action.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 
              action.variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' :
              'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }" data-action="${action.label}">${action.label}</button>`
          ).join('') || '<button class="action-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Fermer</button>'}
        </div>
      </div>
    `;

    modal.appendChild(modalContent);
    this.modalContainer.appendChild(modal);
    this.modalContainer.classList.remove('hidden');

    // Gestion des événements
    const closeBtn = modalContent.querySelector('.close-modal');
    const actionBtns = modalContent.querySelectorAll('.action-btn');

    closeBtn?.addEventListener('click', () => this.closeModal());
    
    actionBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (actions && actions[index]) {
          actions[index].action();
        }
        this.closeModal();
      });
    });

    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });
  }

  private closeModal() {
    if (this.modalContainer) {
      this.modalContainer.innerHTML = '';
      this.modalContainer.classList.add('hidden');
    }
  }

  // Handlers pour chaque type d'action
  private handleGenericClick(event: CustomEvent) {
    const { buttonText, action, context } = event.detail;
    toast({
      title: "Action exécutée",
      description: `${buttonText} - ${action} dans ${context}`,
    });
  }

  private handleViewDocument(event: CustomEvent) {
    const { textId, title, type } = event.detail;
    this.showModal(
      `Visualisation: ${title}`,
      `
        <div class="space-y-4">
          <p class="text-gray-600">Type: ${type}</p>
          <p class="text-gray-600">ID: ${textId}</p>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold mb-2">Contenu du document</h3>
            <p class="text-sm text-gray-700">
              Ceci est une simulation du contenu du document "${title}". 
              Dans une application réelle, le contenu serait chargé depuis la base de données.
            </p>
            <div class="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
              <p class="text-blue-800 text-sm">
                Document juridique officiel avec toutes les clauses et articles pertinents.
              </p>
            </div>
          </div>
        </div>
      `,
      [
        { label: 'Télécharger PDF', action: () => this.simulateDownload(title, 'PDF'), variant: 'primary' },
        { label: 'Partager', action: () => this.simulateShare(title) },
        { label: 'Fermer', action: () => {} }
      ]
    );
  }

  private handleDownloadDocument(event: CustomEvent) {
    const { textId, title, format } = event.detail;
    this.simulateDownload(title, format);
  }

  private handleShareDocument(event: CustomEvent) {
    const { textId, title } = event.detail;
    this.simulateShare(title);
  }

  private handleBrowseType(event: CustomEvent) {
    const { typeId, typeName } = event.detail;
    this.showModal(
      `Parcourir: ${typeName}`,
      `
        <div class="space-y-4">
          <p class="text-gray-600">Catégorie: ${typeName}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${Array.from({length: 6}, (_, i) => `
              <div class="border rounded-lg p-4 hover:bg-gray-50">
                <h4 class="font-semibold mb-2">Document ${i + 1}</h4>
                <p class="text-sm text-gray-600 mb-3">Description du document ${i + 1} dans la catégorie ${typeName}</p>
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">Voir</button>
                  <button class="text-green-600 hover:text-green-800 text-sm">Télécharger</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `,
      [{ label: 'Fermer', action: () => {} }]
    );
  }

  private handleSearch(event: CustomEvent) {
    const { searchType, query } = event.detail;
    this.showModal(
      `Recherche: ${searchType}`,
      `
        <div class="space-y-4">
          <div class="flex space-x-4">
            <input type="text" value="${query}" class="flex-1 border rounded-md px-3 py-2" placeholder="Terme de recherche...">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Rechercher</button>
          </div>
          <div class="space-y-3">
            <h3 class="font-semibold">Résultats de recherche:</h3>
            ${Array.from({length: 5}, (_, i) => `
              <div class="border-l-4 border-blue-400 pl-4 py-2">
                <h4 class="font-medium">Résultat ${i + 1} pour "${query}"</h4>
                <p class="text-sm text-gray-600">Description du résultat trouvé...</p>
                <div class="mt-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm mr-3">Voir détails</button>
                  <button class="text-green-600 hover:text-green-800 text-sm">Télécharger</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `,
      [{ label: 'Nouvelle recherche', action: () => {}, variant: 'primary' }, { label: 'Fermer', action: () => {} }]
    );
  }

  private handleOpenForm(event: CustomEvent) {
    const { formType, title } = event.detail;
    this.showModal(
      `Formulaire: ${title}`,
      `
        <div class="space-y-4">
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input type="text" class="w-full border rounded-md px-3 py-2" placeholder="Votre nom complet">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" class="w-full border rounded-md px-3 py-2" placeholder="votre@email.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Objet</label>
              <input type="text" class="w-full border rounded-md px-3 py-2" placeholder="Objet de votre demande">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea class="w-full border rounded-md px-3 py-2 h-24" placeholder="Votre message..."></textarea>
            </div>
          </form>
        </div>
      `,
      [
        { label: 'Soumettre', action: () => this.handleFormSubmission(title), variant: 'primary' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private handleSubmitForm(event: CustomEvent) {
    const { formType, title } = event.detail;
    this.handleFormSubmission(title);
  }

  private handleFormSubmission(title: string) {
    toast({
      title: "Formulaire soumis",
      description: `Le formulaire "${title}" a été soumis avec succès.`,
    });
  }

  private handleMarkMessageRead(event: CustomEvent) {
    const { messageId } = event.detail;
    toast({
      title: "Message marqué comme lu",
      description: `Message ${messageId} marqué comme lu.`,
    });
  }

  private handleDeleteMessage(event: CustomEvent) {
    const { messageId } = event.detail;
    this.showModal(
      'Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer ce message ?`,
      [
        { label: 'Supprimer', action: () => {
          toast({
            title: "Message supprimé",
            description: `Message ${messageId} supprimé.`,
          });
        }, variant: 'danger' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private handleJoinForum(event: CustomEvent) {
    const { forumType } = event.detail;
    toast({
      title: "Forum rejoint",
      description: `Vous avez rejoint le forum: ${forumType}`,
    });
  }

  private handleStartDiscussion(event: CustomEvent) {
    const { topic } = event.detail;
    this.showModal(
      'Nouvelle discussion',
      `
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
            <input type="text" value="${topic}" class="w-full border rounded-md px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message initial</label>
            <textarea class="w-full border rounded-md px-3 py-2 h-32" placeholder="Démarrez votre discussion..."></textarea>
          </div>
        </div>
      `,
      [
        { label: 'Publier', action: () => {
          toast({
            title: "Discussion créée",
            description: `Discussion "${topic}" créée avec succès.`,
          });
        }, variant: 'primary' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private handleExecuteSavedSearch(event: CustomEvent) {
    const { searchName } = event.detail;
    this.handleSearch({ detail: { searchType: 'Recherche sauvegardée', query: searchName } } as CustomEvent);
  }

  private handleEditSavedSearch(event: CustomEvent) {
    const { searchName } = event.detail;
    this.showModal(
      `Modifier la recherche: ${searchName}`,
      `
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom de la recherche</label>
            <input type="text" value="${searchName}" class="w-full border rounded-md px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Critères de recherche</label>
            <textarea class="w-full border rounded-md px-3 py-2 h-24" placeholder="Critères de recherche..."></textarea>
          </div>
        </div>
      `,
      [
        { label: 'Sauvegarder', action: () => {
          toast({
            title: "Recherche modifiée",
            description: `Recherche "${searchName}" modifiée avec succès.`,
          });
        }, variant: 'primary' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private handleDeleteSavedSearch(event: CustomEvent) {
    const { searchName } = event.detail;
    this.showModal(
      'Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer la recherche "${searchName}" ?`,
      [
        { label: 'Supprimer', action: () => {
          toast({
            title: "Recherche supprimée",
            description: `Recherche "${searchName}" supprimée.`,
          });
        }, variant: 'danger' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private handleAddToFavorites(event: CustomEvent) {
    const { itemType, itemName } = event.detail;
    toast({
      title: "Ajouté aux favoris",
      description: `${itemType} "${itemName}" ajouté aux favoris.`,
    });
  }

  private handleRemoveFromFavorites(event: CustomEvent) {
    const { itemName } = event.detail;
    toast({
      title: "Retiré des favoris",
      description: `"${itemName}" retiré des favoris.`,
    });
  }

  private handleReadNews(event: CustomEvent) {
    const { newsTitle } = event.detail;
    this.showModal(
      newsTitle,
      `
        <div class="space-y-4">
          <div class="text-sm text-gray-500">Publié le ${new Date().toLocaleDateString('fr-FR')}</div>
          <div class="prose max-w-none">
            <p>Ceci est le contenu de l'actualité "${newsTitle}".</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      `,
      [{ label: 'Fermer', action: () => {} }]
    );
  }

  private handleDownloadResource(event: CustomEvent) {
    const { resourceName, resourceType } = event.detail;
    this.simulateDownload(resourceName, resourceType);
  }

  private handleSearchDictionary(event: CustomEvent) {
    const { term } = event.detail;
    this.showModal(
      `Dictionnaire: ${term}`,
      `
        <div class="space-y-4">
          <div class="border-l-4 border-blue-400 pl-4">
            <h3 class="font-semibold text-lg">${term}</h3>
            <p class="text-gray-600 mt-2">
              Définition juridique du terme "${term}". Cette définition serait récupérée depuis le dictionnaire juridique intégré.
            </p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Termes connexes:</h4>
            <div class="flex flex-wrap gap-2">
              ${['Terme 1', 'Terme 2', 'Terme 3', 'Terme 4'].map(t => 
                `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm cursor-pointer hover:bg-blue-200">${t}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      `,
      [{ label: 'Fermer', action: () => {} }]
    );
  }

  private handleViewTimelineItem(event: CustomEvent) {
    const { itemTitle } = event.detail;
    this.showModal(
      `Chronologie: ${itemTitle}`,
      `
        <div class="space-y-4">
          <div class="border-l-4 border-green-400 pl-4">
            <h3 class="font-semibold">${itemTitle}</h3>
            <p class="text-sm text-gray-500">Date: ${new Date().toLocaleDateString('fr-FR')}</p>
            <p class="text-gray-600 mt-2">
              Détails de l'événement chronologique "${itemTitle}". Historique complet des modifications et évolutions.
            </p>
          </div>
        </div>
      `,
      [{ label: 'Fermer', action: () => {} }]
    );
  }

  private handleCompareVersions(event: CustomEvent) {
    const { documentTitle } = event.detail;
    this.showModal(
      `Comparaison de versions: ${documentTitle}`,
      `
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold mb-2">Version précédente</h4>
              <div class="bg-red-50 p-3 rounded border text-sm">
                <p>Ancien contenu du document...</p>
                <p class="text-red-600">- Texte supprimé</p>
              </div>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Version actuelle</h4>
              <div class="bg-green-50 p-3 rounded border text-sm">
                <p>Nouveau contenu du document...</p>
                <p class="text-green-600">+ Texte ajouté</p>
              </div>
            </div>
          </div>
        </div>
      `,
      [{ label: 'Fermer', action: () => {} }]
    );
  }

  private handleApproveDocument(event: CustomEvent) {
    const { documentTitle } = event.detail;
    this.showModal(
      'Approuver le document',
      `Êtes-vous sûr de vouloir approuver "${documentTitle}" ?`,
      [
        { label: 'Approuver', action: () => {
          toast({
            title: "Document approuvé",
            description: `"${documentTitle}" a été approuvé.`,
          });
        }, variant: 'primary' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private handleRejectDocument(event: CustomEvent) {
    const { documentTitle } = event.detail;
    this.showModal(
      'Rejeter le document',
      `
        <div class="space-y-4">
          <p>Pourquoi rejetez-vous "${documentTitle}" ?</p>
          <textarea class="w-full border rounded-md px-3 py-2 h-24" placeholder="Raison du rejet..."></textarea>
        </div>
      `,
      [
        { label: 'Rejeter', action: () => {
          toast({
            title: "Document rejeté",
            description: `"${documentTitle}" a été rejeté.`,
          });
        }, variant: 'danger' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private handleRequestChanges(event: CustomEvent) {
    const { documentTitle } = event.detail;
    this.showModal(
      'Demander des modifications',
      `
        <div class="space-y-4">
          <p>Quelles modifications demandez-vous pour "${documentTitle}" ?</p>
          <textarea class="w-full border rounded-md px-3 py-2 h-24" placeholder="Modifications demandées..."></textarea>
        </div>
      `,
      [
        { label: 'Envoyer demande', action: () => {
          toast({
            title: "Modifications demandées",
            description: `Demande de modifications envoyée pour "${documentTitle}".`,
          });
        }, variant: 'primary' },
        { label: 'Annuler', action: () => {} }
      ]
    );
  }

  private simulateDownload(filename: string, format: string) {
    toast({
      title: "Téléchargement démarré",
      description: `Téléchargement de "${filename}.${format.toLowerCase()}" en cours...`,
    });

    // Simuler le téléchargement
    setTimeout(() => {
      toast({
        title: "Téléchargement terminé",
        description: `"${filename}.${format.toLowerCase()}" téléchargé avec succès.`,
      });
    }, 2000);
  }

  private simulateShare(title: string) {
    this.showModal(
      `Partager: ${title}`,
      `
        <div class="space-y-4">
          <p>Choisissez comment partager ce document:</p>
          <div class="grid grid-cols-2 gap-4">
            <button class="p-4 border rounded-lg hover:bg-gray-50">
              <div class="text-blue-600 mb-2">📧</div>
              <div class="font-semibold">Email</div>
            </button>
            <button class="p-4 border rounded-lg hover:bg-gray-50">
              <div class="text-green-600 mb-2">🔗</div>
              <div class="font-semibold">Lien</div>
            </button>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lien de partage</label>
            <div class="flex">
              <input type="text" value="https://app.dz/share/${title.toLowerCase().replace(/\s+/g, '-')}" class="flex-1 border rounded-l-md px-3 py-2 bg-gray-50" readonly>
              <button class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Copier</button>
            </div>
          </div>
        </div>
      `,
      [{ label: 'Fermer', action: () => {} }]
    );
  }
}

// Initialiser le gestionnaire global
export const globalButtonHandler = GlobalButtonHandler.getInstance();