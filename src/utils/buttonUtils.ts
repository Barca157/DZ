// Utility functions for button onClick handlers

export const createButtonHandler = (eventType: string, details: any = {}) => {
  return () => {
    console.log(`Button clicked: ${eventType}`, details);
    window.dispatchEvent(new CustomEvent(eventType, { detail: details }));
  };
};

// Common button handlers
export const buttonHandlers = {
  // Generic handlers
  generic: (buttonText: string, action: string, context: string) =>
    createButtonHandler('generic-button-click', { buttonText, action, context }),

  // Document actions
  viewDocument: (id: string, title: string, type: string = 'document') =>
    createButtonHandler('view-legal-text', { textId: id, title, type }),

  downloadDocument: (id: string, title: string, format: string = 'pdf') =>
    createButtonHandler('download-legal-text', { textId: id, title, format }),

  shareDocument: (id: string, title: string) =>
    createButtonHandler('share-legal-text', { textId: id, title }),

  // Search and browse
  browseType: (typeId: string, typeName: string) =>
    createButtonHandler('browse-legal-type', { typeId, typeName }),

  search: (searchType: string, query: string) =>
    createButtonHandler('immersive-search', { searchType, query }),

  // Form actions
  openForm: (formType: string, title: string) =>
    createButtonHandler('open-form-modal', { formType, title }),

  submitForm: (formType: string, title: string) =>
    createButtonHandler('submit-form', { formType, title }),

  // Messages
  markRead: (messageId: string) =>
    createButtonHandler('mark-message-read', { messageId }),

  deleteMessage: (messageId: string) =>
    createButtonHandler('delete-message', { messageId }),

  // Collaboration
  joinForum: (forumType: string) =>
    createButtonHandler('join-forum', { forumType }),

  startDiscussion: (topic: string) =>
    createButtonHandler('start-discussion', { topic }),

  // Saved searches
  executeSavedSearch: (searchName: string) =>
    createButtonHandler('execute-saved-search', { searchName }),

  editSavedSearch: (searchName: string) =>
    createButtonHandler('edit-saved-search', { searchName }),

  deleteSavedSearch: (searchName: string) =>
    createButtonHandler('delete-saved-search', { searchName }),

  // Favorites
  addToFavorites: (itemType: string, itemName: string) =>
    createButtonHandler('add-to-favorites', { itemType, itemName }),

  removeFromFavorites: (itemName: string) =>
    createButtonHandler('remove-from-favorites', { itemName }),

  // News and resources
  readNews: (newsTitle: string) =>
    createButtonHandler('read-news', { newsTitle }),

  downloadResource: (resourceName: string, resourceType: string) =>
    createButtonHandler('download-resource', { resourceName, resourceType }),

  // Dictionary
  searchDictionary: (term: string) =>
    createButtonHandler('search-dictionary', { term }),

  // Timeline
  viewTimelineItem: (itemTitle: string) =>
    createButtonHandler('view-timeline-item', { itemTitle }),

  compareVersions: (documentTitle: string) =>
    createButtonHandler('compare-versions', { documentTitle }),

  // Approval workflow
  approveDocument: (documentTitle: string) =>
    createButtonHandler('approve-document', { documentTitle }),

  rejectDocument: (documentTitle: string) =>
    createButtonHandler('reject-document', { documentTitle }),

  requestChanges: (documentTitle: string) =>
    createButtonHandler('request-changes', { documentTitle })
};