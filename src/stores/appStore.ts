import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types pour les différentes entités
export interface LegalText {
  id: string;
  title: string;
  content: string;
  type: 'law' | 'decree' | 'regulation' | 'circular';
  status: 'draft' | 'published' | 'archived';
  category: string;
  dateCreated: Date;
  dateModified: Date;
  author: string;
  tags: string[];
  metadata: {
    source?: string;
    references?: string[];
    validity?: string;
  };
}

export interface Procedure {
  id: string;
  title: string;
  description: string;
  steps: ProcedureStep[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  requiredDocuments: string[];
  status: 'active' | 'inactive' | 'under_review';
  dateCreated: Date;
  dateModified: Date;
}

export interface ProcedureStep {
  id: string;
  title: string;
  description: string;
  order: number;
  isRequired: boolean;
  documents?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  datePublished: Date;
  author: string;
  tags: string[];
  isImportant: boolean;
  readBy: string[];
}

export interface SearchQuery {
  id: string;
  name: string;
  query: string;
  filters: Record<string, any>;
  dateCreated: Date;
  lastUsed: Date;
  useCount: number;
}

export interface Favorite {
  id: string;
  itemId: string;
  itemType: 'legal-text' | 'procedure' | 'news' | 'template';
  title: string;
  dateAdded: Date;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
  variables: string[];
  isPublic: boolean;
  createdBy: string;
  dateCreated: Date;
  usageCount: number;
}

// Nouvelles interfaces pour les fonctionnalités étendues
export interface ForumDiscussion {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  status: 'active' | 'resolved' | 'closed';
  replies: ForumReply[];
  views: number;
  tags: string[];
  dateCreated: Date;
  lastActivity: Date;
  isPinned: boolean;
  isLocked: boolean;
  votes: number;
}

export interface ForumReply {
  id: string;
  discussionId: string;
  content: string;
  author: string;
  dateCreated: Date;
  votes: number;
  isAcceptedAnswer: boolean;
  attachments?: string[];
}

export interface ForumMember {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'moderator' | 'admin';
  reputation: number;
  joinDate: Date;
  lastActive: Date;
  contributions: number;
  avatar?: string;
}

export interface Configuration {
  id: string;
  category: 'appearance' | 'notifications' | 'privacy' | 'accessibility' | 'performance';
  key: string;
  value: any;
  userId: string;
  dateModified: Date;
}

export interface SharedResource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'link' | 'file' | 'video';
  url: string;
  sharedBy: string;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  dateShared: Date;
  isPublic: boolean;
}

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  category: string;
  instructor: string;
  views: number;
  rating: number;
  tags: string[];
  datePublished: Date;
  transcript?: string;
}

// Interface du store principal étendue
interface AppStore {
  // État de l'application
  currentSection: string;
  currentUser: string;
  isLoading: boolean;
  
  // Données existantes
  legalTexts: LegalText[];
  procedures: Procedure[];
  news: NewsItem[];
  savedSearches: SearchQuery[];
  favorites: Favorite[];
  templates: DocumentTemplate[];
  
  // Nouvelles données
  forumDiscussions: ForumDiscussion[];
  forumReplies: ForumReply[];
  forumMembers: ForumMember[];
  configurations: Configuration[];
  sharedResources: SharedResource[];
  videoTutorials: VideoTutorial[];
  
  // Actions existantes pour les textes juridiques
  addLegalText: (text: Omit<LegalText, 'id' | 'dateCreated' | 'dateModified'>) => void;
  updateLegalText: (id: string, updates: Partial<LegalText>) => void;
  deleteLegalText: (id: string) => void;
  getLegalText: (id: string) => LegalText | undefined;
  searchLegalTexts: (query: string, filters?: Record<string, any>) => LegalText[];
  
  // Actions pour les procédures
  addProcedure: (procedure: Omit<Procedure, 'id' | 'dateCreated' | 'dateModified'>) => void;
  updateProcedure: (id: string, updates: Partial<Procedure>) => void;
  deleteProcedure: (id: string) => void;
  getProcedure: (id: string) => Procedure | undefined;
  searchProcedures: (query: string, filters?: Record<string, any>) => Procedure[];
  
  // Actions pour les actualités
  addNews: (news: Omit<NewsItem, 'id' | 'datePublished' | 'readBy'>) => void;
  updateNews: (id: string, updates: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  markNewsAsRead: (newsId: string, userId: string) => void;
  getUnreadNews: (userId: string) => NewsItem[];
  
  // Actions pour les recherches sauvegardées
  saveSearch: (search: Omit<SearchQuery, 'id' | 'dateCreated' | 'lastUsed' | 'useCount'>) => void;
  updateSavedSearch: (id: string, updates: Partial<SearchQuery>) => void;
  deleteSavedSearch: (id: string) => void;
  executeSavedSearch: (id: string) => any[];
  
  // Actions pour les favoris
  addToFavorites: (item: Omit<Favorite, 'id' | 'dateAdded'>) => void;
  removeFromFavorites: (itemId: string, itemType: string) => void;
  getFavorites: (itemType?: string) => Favorite[];
  isFavorite: (itemId: string, itemType: string) => boolean;
  
  // Actions pour les modèles
  addTemplate: (template: Omit<DocumentTemplate, 'id' | 'dateCreated' | 'usageCount'>) => void;
  updateTemplate: (id: string, updates: Partial<DocumentTemplate>) => void;
  deleteTemplate: (id: string) => void;
  useTemplate: (id: string) => DocumentTemplate | undefined;
  getTemplatesByCategory: (category: string) => DocumentTemplate[];
  
  // Actions pour le forum
  addForumDiscussion: (discussion: Omit<ForumDiscussion, 'id' | 'dateCreated' | 'lastActivity' | 'replies' | 'views' | 'votes'>) => void;
  updateForumDiscussion: (id: string, updates: Partial<ForumDiscussion>) => void;
  deleteForumDiscussion: (id: string) => void;
  getForumDiscussion: (id: string) => ForumDiscussion | undefined;
  searchForumDiscussions: (query: string, filters?: Record<string, any>) => ForumDiscussion[];
  
  addForumReply: (reply: Omit<ForumReply, 'id' | 'dateCreated' | 'votes'>) => void;
  updateForumReply: (id: string, updates: Partial<ForumReply>) => void;
  deleteForumReply: (id: string) => void;
  getDiscussionReplies: (discussionId: string) => ForumReply[];
  
  addForumMember: (member: Omit<ForumMember, 'id' | 'joinDate' | 'lastActive' | 'contributions' | 'reputation'>) => void;
  updateForumMember: (id: string, updates: Partial<ForumMember>) => void;
  getForumMember: (id: string) => ForumMember | undefined;
  
  // Actions pour les configurations
  getConfiguration: (key: string, userId: string) => Configuration | undefined;
  setConfiguration: (config: Omit<Configuration, 'id' | 'dateModified'>) => void;
  getUserConfigurations: (userId: string) => Configuration[];
  
  // Actions pour les ressources partagées
  addSharedResource: (resource: Omit<SharedResource, 'id' | 'dateShared' | 'downloads' | 'rating'>) => void;
  updateSharedResource: (id: string, updates: Partial<SharedResource>) => void;
  deleteSharedResource: (id: string) => void;
  getSharedResource: (id: string) => SharedResource | undefined;
  searchSharedResources: (query: string, filters?: Record<string, any>) => SharedResource[];
  
  // Actions pour les tutoriels vidéo
  addVideoTutorial: (tutorial: Omit<VideoTutorial, 'id' | 'datePublished' | 'views' | 'rating'>) => void;
  updateVideoTutorial: (id: string, updates: Partial<VideoTutorial>) => void;
  deleteVideoTutorial: (id: string) => void;
  getVideoTutorial: (id: string) => VideoTutorial | undefined;
  searchVideoTutorials: (query: string, filters?: Record<string, any>) => VideoTutorial[];
  
  // Actions avancées
  incrementDiscussionViews: (discussionId: string) => void;
  voteOnDiscussion: (discussionId: string, vote: 1 | -1) => void;
  voteOnReply: (replyId: string, vote: 1 | -1) => void;
  markReplyAsAccepted: (replyId: string) => void;
  pinDiscussion: (discussionId: string) => void;
  lockDiscussion: (discussionId: string) => void;
  
  incrementResourceDownloads: (resourceId: string) => void;
  rateResource: (resourceId: string, rating: number) => void;
  incrementTutorialViews: (tutorialId: string) => void;
  rateTutorial: (tutorialId: string, rating: number) => void;
  
  // Actions générales
  setCurrentSection: (section: string) => void;
  setCurrentUser: (user: string) => void;
  setLoading: (loading: boolean) => void;
  
  // Actions d'import/export
  exportData: () => string;
  importData: (data: string) => void;
  
  // Actions de recherche globale étendue
  globalSearch: (query: string) => {
    legalTexts: LegalText[];
    procedures: Procedure[];
    news: NewsItem[];
    templates: DocumentTemplate[];
    forumDiscussions: ForumDiscussion[];
    sharedResources: SharedResource[];
    videoTutorials: VideoTutorial[];
  };
}

// Utilitaires
const generateId = () => Math.random().toString(36).substr(2, 9);

const searchInText = (text: string, query: string): boolean => {
  return text.toLowerCase().includes(query.toLowerCase());
};

// Création du store étendu
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // État initial
      currentSection: 'dashboard',
      currentUser: 'user-1',
      isLoading: false,
      
      // Données initiales
      legalTexts: [],
      procedures: [],
      news: [],
      savedSearches: [],
      favorites: [],
      templates: [],
      
      // Nouvelles données initiales
      forumDiscussions: [],
      forumReplies: [],
      forumMembers: [],
      configurations: [],
      sharedResources: [],
      videoTutorials: [],
      
      // Actions pour les textes juridiques
      addLegalText: (textData) => {
        const newText: LegalText = {
          ...textData,
          id: generateId(),
          dateCreated: new Date(),
          dateModified: new Date(),
        };
        set((state) => ({
          legalTexts: [...state.legalTexts, newText],
        }));
      },
      
      updateLegalText: (id, updates) => {
        set((state) => ({
          legalTexts: state.legalTexts.map((text) =>
            text.id === id
              ? { ...text, ...updates, dateModified: new Date() }
              : text
          ),
        }));
      },
      
      deleteLegalText: (id) => {
        set((state) => ({
          legalTexts: state.legalTexts.filter((text) => text.id !== id),
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === id && fav.itemType === 'legal-text')
          ),
        }));
      },
      
      getLegalText: (id) => {
        return get().legalTexts.find((text) => text.id === id);
      },
      
      searchLegalTexts: (query, filters = {}) => {
        const { legalTexts } = get();
        return legalTexts.filter((text) => {
          const matchesQuery = 
            searchInText(text.title, query) ||
            searchInText(text.content, query) ||
            text.tags.some(tag => searchInText(tag, query));
          
          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return text[key as keyof LegalText] === value;
          });
          
          return matchesQuery && matchesFilters;
        });
      },
      
      // Actions pour les procédures
      addProcedure: (procedureData) => {
        const newProcedure: Procedure = {
          ...procedureData,
          id: generateId(),
          dateCreated: new Date(),
          dateModified: new Date(),
        };
        set((state) => ({
          procedures: [...state.procedures, newProcedure],
        }));
      },
      
      updateProcedure: (id, updates) => {
        set((state) => ({
          procedures: state.procedures.map((procedure) =>
            procedure.id === id
              ? { ...procedure, ...updates, dateModified: new Date() }
              : procedure
          ),
        }));
      },
      
      deleteProcedure: (id) => {
        set((state) => ({
          procedures: state.procedures.filter((procedure) => procedure.id !== id),
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === id && fav.itemType === 'procedure')
          ),
        }));
      },
      
      getProcedure: (id) => {
        return get().procedures.find((procedure) => procedure.id === id);
      },
      
      searchProcedures: (query, filters = {}) => {
        const { procedures } = get();
        return procedures.filter((procedure) => {
          const matchesQuery = 
            searchInText(procedure.title, query) ||
            searchInText(procedure.description, query) ||
            procedure.steps.some(step => 
              searchInText(step.title, query) || searchInText(step.description, query)
            );
          
          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return procedure[key as keyof Procedure] === value;
          });
          
          return matchesQuery && matchesFilters;
        });
      },
      
      // Actions pour les actualités
      addNews: (newsData) => {
        const newNews: NewsItem = {
          ...newsData,
          id: generateId(),
          datePublished: new Date(),
          readBy: [],
        };
        set((state) => ({
          news: [...state.news, newNews],
        }));
      },
      
      updateNews: (id, updates) => {
        set((state) => ({
          news: state.news.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      
      deleteNews: (id) => {
        set((state) => ({
          news: state.news.filter((item) => item.id !== id),
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === id && fav.itemType === 'news')
          ),
        }));
      },
      
      markNewsAsRead: (newsId, userId) => {
        set((state) => ({
          news: state.news.map((item) =>
            item.id === newsId && !item.readBy.includes(userId)
              ? { ...item, readBy: [...item.readBy, userId] }
              : item
          ),
        }));
      },
      
      getUnreadNews: (userId) => {
        const { news } = get();
        return news.filter((item) => !item.readBy.includes(userId));
      },
      
      // Actions pour les recherches sauvegardées
      saveSearch: (searchData) => {
        const newSearch: SearchQuery = {
          ...searchData,
          id: generateId(),
          dateCreated: new Date(),
          lastUsed: new Date(),
          useCount: 0,
        };
        set((state) => ({
          savedSearches: [...state.savedSearches, newSearch],
        }));
      },
      
      updateSavedSearch: (id, updates) => {
        set((state) => ({
          savedSearches: state.savedSearches.map((search) =>
            search.id === id ? { ...search, ...updates } : search
          ),
        }));
      },
      
      deleteSavedSearch: (id) => {
        set((state) => ({
          savedSearches: state.savedSearches.filter((search) => search.id !== id),
        }));
      },
      
      executeSavedSearch: (id) => {
        const { savedSearches, globalSearch } = get();
        const search = savedSearches.find((s) => s.id === id);
        if (!search) return [];
        
        // Mettre à jour les statistiques d'utilisation
        set((state) => ({
          savedSearches: state.savedSearches.map((s) =>
            s.id === id
              ? { ...s, lastUsed: new Date(), useCount: s.useCount + 1 }
              : s
          ),
        }));
        
        return globalSearch(search.query);
      },
      
      // Actions pour les favoris
      addToFavorites: (itemData) => {
        const newFavorite: Favorite = {
          ...itemData,
          id: generateId(),
          dateAdded: new Date(),
        };
        set((state) => ({
          favorites: [...state.favorites, newFavorite],
        }));
      },
      
      removeFromFavorites: (itemId, itemType) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === itemId && fav.itemType === itemType)
          ),
        }));
      },
      
      getFavorites: (itemType) => {
        const { favorites } = get();
        return itemType
          ? favorites.filter((fav) => fav.itemType === itemType)
          : favorites;
      },
      
      isFavorite: (itemId, itemType) => {
        const { favorites } = get();
        return favorites.some(
          (fav) => fav.itemId === itemId && fav.itemType === itemType
        );
      },
      
      // Actions pour les modèles
      addTemplate: (templateData) => {
        const newTemplate: DocumentTemplate = {
          ...templateData,
          id: generateId(),
          dateCreated: new Date(),
          usageCount: 0,
        };
        set((state) => ({
          templates: [...state.templates, newTemplate],
        }));
      },
      
      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((template) =>
            template.id === id ? { ...template, ...updates } : template
          ),
        }));
      },
      
      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((template) => template.id !== id),
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === id && fav.itemType === 'template')
          ),
        }));
      },
      
      useTemplate: (id) => {
        const { templates } = get();
        const template = templates.find((t) => t.id === id);
        if (template) {
          // Incrémenter le compteur d'utilisation
          set((state) => ({
            templates: state.templates.map((t) =>
              t.id === id ? { ...t, usageCount: t.usageCount + 1 } : t
            ),
          }));
        }
        return template;
      },
      
      getTemplatesByCategory: (category) => {
        const { templates } = get();
        return templates.filter((template) => template.category === category);
      },
      
      // Actions générales
      setCurrentSection: (section) => {
        set({ currentSection: section });
      },
      
      setCurrentUser: (user) => {
        set({ currentUser: user });
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      // Actions d'import/export
      exportData: () => {
        const state = get();
        const exportData = {
          legalTexts: state.legalTexts,
          procedures: state.procedures,
          news: state.news,
          savedSearches: state.savedSearches,
          favorites: state.favorites,
          templates: state.templates,
        };
        return JSON.stringify(exportData, null, 2);
      },
      
      importData: (data) => {
        try {
          const parsedData = JSON.parse(data);
          set((state) => ({
            ...state,
            ...parsedData,
          }));
        } catch (error) {
          console.error('Erreur lors de l\'importation des données:', error);
        }
      },
      
      // Recherche globale
      globalSearch: (query) => {
        const state = get();
        return {
          legalTexts: state.searchLegalTexts(query),
          procedures: state.searchProcedures(query),
          news: state.news.filter((item) =>
            searchInText(item.title, query) || searchInText(item.content, query)
          ),
          templates: state.templates.filter((template) =>
            searchInText(template.name, query) || searchInText(template.content, query)
          ),
        };
      },
      
      // Actions pour le forum
      addForumDiscussion: (discussionData) => {
        const newDiscussion: ForumDiscussion = {
          ...discussionData,
          id: generateId(),
          dateCreated: new Date(),
          lastActivity: new Date(),
          replies: [],
          views: 0,
          votes: 0,
        };
        set((state) => ({
          forumDiscussions: [...state.forumDiscussions, newDiscussion],
        }));
      },
      
      updateForumDiscussion: (id, updates) => {
        set((state) => ({
          forumDiscussions: state.forumDiscussions.map((discussion) =>
            discussion.id === id
              ? { ...discussion, ...updates, lastActivity: new Date() }
              : discussion
          ),
        }));
      },
      
      deleteForumDiscussion: (id) => {
        set((state) => ({
          forumDiscussions: state.forumDiscussions.filter((discussion) => discussion.id !== id),
          forumReplies: state.forumReplies.filter((reply) => reply.discussionId !== id),
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === id && fav.itemType === 'forum-discussion')
          ),
        }));
      },
      
      getForumDiscussion: (id) => {
        const { forumDiscussions, forumReplies } = get();
        const discussion = forumDiscussions.find((d) => d.id === id);
        if (discussion) {
          return {
            ...discussion,
            replies: forumReplies.filter((r) => r.discussionId === id),
          };
        }
        return undefined;
      },
      
      searchForumDiscussions: (query, filters = {}) => {
        const { forumDiscussions } = get();
        return forumDiscussions.filter((discussion) => {
          const matchesQuery = 
            searchInText(discussion.title, query) ||
            searchInText(discussion.content, query) ||
            searchInText(discussion.author, query) ||
            discussion.tags.some(tag => searchInText(tag, query));
          
          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return discussion[key as keyof ForumDiscussion] === value;
          });
          
          return matchesQuery && matchesFilters;
        });
      },
      
      addForumReply: (replyData) => {
        const newReply: ForumReply = {
          ...replyData,
          id: generateId(),
          dateCreated: new Date(),
          votes: 0,
        };
        set((state) => ({
          forumReplies: [...state.forumReplies, newReply],
          forumDiscussions: state.forumDiscussions.map((discussion) =>
            discussion.id === replyData.discussionId
              ? { ...discussion, lastActivity: new Date() }
              : discussion
          ),
        }));
      },
      
      updateForumReply: (id, updates) => {
        set((state) => ({
          forumReplies: state.forumReplies.map((reply) =>
            reply.id === id ? { ...reply, ...updates } : reply
          ),
        }));
      },
      
      deleteForumReply: (id) => {
        set((state) => ({
          forumReplies: state.forumReplies.filter((reply) => reply.id !== id),
        }));
      },
      
      getDiscussionReplies: (discussionId) => {
        const { forumReplies } = get();
        return forumReplies.filter((reply) => reply.discussionId === discussionId);
      },
      
      addForumMember: (memberData) => {
        const newMember: ForumMember = {
          ...memberData,
          id: generateId(),
          joinDate: new Date(),
          lastActive: new Date(),
          contributions: 0,
          reputation: 0,
        };
        set((state) => ({
          forumMembers: [...state.forumMembers, newMember],
        }));
      },
      
      updateForumMember: (id, updates) => {
        set((state) => ({
          forumMembers: state.forumMembers.map((member) =>
            member.id === id
              ? { ...member, ...updates, lastActive: new Date() }
              : member
          ),
        }));
      },
      
      getForumMember: (id) => {
        return get().forumMembers.find((member) => member.id === id);
      },
      
      // Actions pour les configurations
      getConfiguration: (key, userId) => {
        const { configurations } = get();
        return configurations.find((config) => config.key === key && config.userId === userId);
      },
      
      setConfiguration: (configData) => {
        const { configurations } = get();
        const existingIndex = configurations.findIndex(
          (config) => config.key === configData.key && config.userId === configData.userId
        );
        
        const newConfig: Configuration = {
          ...configData,
          id: existingIndex >= 0 ? configurations[existingIndex].id : generateId(),
          dateModified: new Date(),
        };
        
        if (existingIndex >= 0) {
          set((state) => ({
            configurations: state.configurations.map((config, index) =>
              index === existingIndex ? newConfig : config
            ),
          }));
        } else {
          set((state) => ({
            configurations: [...state.configurations, newConfig],
          }));
        }
      },
      
      getUserConfigurations: (userId) => {
        const { configurations } = get();
        return configurations.filter((config) => config.userId === userId);
      },
      
      // Actions pour les ressources partagées
      addSharedResource: (resourceData) => {
        const newResource: SharedResource = {
          ...resourceData,
          id: generateId(),
          dateShared: new Date(),
          downloads: 0,
          rating: 0,
        };
        set((state) => ({
          sharedResources: [...state.sharedResources, newResource],
        }));
      },
      
      updateSharedResource: (id, updates) => {
        set((state) => ({
          sharedResources: state.sharedResources.map((resource) =>
            resource.id === id ? { ...resource, ...updates } : resource
          ),
        }));
      },
      
      deleteSharedResource: (id) => {
        set((state) => ({
          sharedResources: state.sharedResources.filter((resource) => resource.id !== id),
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === id && fav.itemType === 'shared-resource')
          ),
        }));
      },
      
      getSharedResource: (id) => {
        return get().sharedResources.find((resource) => resource.id === id);
      },
      
      searchSharedResources: (query, filters = {}) => {
        const { sharedResources } = get();
        return sharedResources.filter((resource) => {
          const matchesQuery = 
            searchInText(resource.title, query) ||
            searchInText(resource.description, query) ||
            resource.tags.some(tag => searchInText(tag, query));
          
          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return resource[key as keyof SharedResource] === value;
          });
          
          return matchesQuery && matchesFilters;
        });
      },
      
      // Actions pour les tutoriels vidéo
      addVideoTutorial: (tutorialData) => {
        const newTutorial: VideoTutorial = {
          ...tutorialData,
          id: generateId(),
          datePublished: new Date(),
          views: 0,
          rating: 0,
        };
        set((state) => ({
          videoTutorials: [...state.videoTutorials, newTutorial],
        }));
      },
      
      updateVideoTutorial: (id, updates) => {
        set((state) => ({
          videoTutorials: state.videoTutorials.map((tutorial) =>
            tutorial.id === id ? { ...tutorial, ...updates } : tutorial
          ),
        }));
      },
      
      deleteVideoTutorial: (id) => {
        set((state) => ({
          videoTutorials: state.videoTutorials.filter((tutorial) => tutorial.id !== id),
          favorites: state.favorites.filter(
            (fav) => !(fav.itemId === id && fav.itemType === 'video-tutorial')
          ),
        }));
      },
      
      getVideoTutorial: (id) => {
        return get().videoTutorials.find((tutorial) => tutorial.id === id);
      },
      
      searchVideoTutorials: (query, filters = {}) => {
        const { videoTutorials } = get();
        return videoTutorials.filter((tutorial) => {
          const matchesQuery = 
            searchInText(tutorial.title, query) ||
            searchInText(tutorial.description, query) ||
            searchInText(tutorial.instructor, query) ||
            tutorial.tags.some(tag => searchInText(tag, query));
          
          const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return tutorial[key as keyof VideoTutorial] === value;
          });
          
          return matchesQuery && matchesFilters;
        });
      },
      
      // Actions avancées
      incrementDiscussionViews: (discussionId) => {
        set((state) => ({
          forumDiscussions: state.forumDiscussions.map((discussion) =>
            discussion.id === discussionId
              ? { ...discussion, views: discussion.views + 1 }
              : discussion
          ),
        }));
      },
      
      voteOnDiscussion: (discussionId, vote) => {
        set((state) => ({
          forumDiscussions: state.forumDiscussions.map((discussion) =>
            discussion.id === discussionId
              ? { ...discussion, votes: discussion.votes + vote }
              : discussion
          ),
        }));
      },
      
      voteOnReply: (replyId, vote) => {
        set((state) => ({
          forumReplies: state.forumReplies.map((reply) =>
            reply.id === replyId
              ? { ...reply, votes: reply.votes + vote }
              : reply
          ),
        }));
      },
      
      markReplyAsAccepted: (replyId) => {
        set((state) => ({
          forumReplies: state.forumReplies.map((reply) =>
            reply.id === replyId
              ? { ...reply, isAcceptedAnswer: true }
              : { ...reply, isAcceptedAnswer: false }
          ),
        }));
      },
      
      pinDiscussion: (discussionId) => {
        set((state) => ({
          forumDiscussions: state.forumDiscussions.map((discussion) =>
            discussion.id === discussionId
              ? { ...discussion, isPinned: !discussion.isPinned }
              : discussion
          ),
        }));
      },
      
      lockDiscussion: (discussionId) => {
        set((state) => ({
          forumDiscussions: state.forumDiscussions.map((discussion) =>
            discussion.id === discussionId
              ? { ...discussion, isLocked: !discussion.isLocked }
              : discussion
          ),
        }));
      },
      
      incrementResourceDownloads: (resourceId) => {
        set((state) => ({
          sharedResources: state.sharedResources.map((resource) =>
            resource.id === resourceId
              ? { ...resource, downloads: resource.downloads + 1 }
              : resource
          ),
        }));
      },
      
      rateResource: (resourceId, rating) => {
        set((state) => ({
          sharedResources: state.sharedResources.map((resource) =>
            resource.id === resourceId
              ? { ...resource, rating: (resource.rating + rating) / 2 }
              : resource
          ),
        }));
      },
      
      incrementTutorialViews: (tutorialId) => {
        set((state) => ({
          videoTutorials: state.videoTutorials.map((tutorial) =>
            tutorial.id === tutorialId
              ? { ...tutorial, views: tutorial.views + 1 }
              : tutorial
          ),
        }));
      },
      
      rateTutorial: (tutorialId, rating) => {
        set((state) => ({
          videoTutorials: state.videoTutorials.map((tutorial) =>
            tutorial.id === tutorialId
              ? { ...tutorial, rating: (tutorial.rating + rating) / 2 }
              : tutorial
          ),
        }));
      },
      
      // Recherche globale étendue
      globalSearch: (query) => {
        const state = get();
        return {
          legalTexts: state.searchLegalTexts(query),
          procedures: state.searchProcedures(query),
          news: state.news.filter((item) =>
            searchInText(item.title, query) || searchInText(item.content, query)
          ),
          templates: state.templates.filter((template) =>
            searchInText(template.name, query) || searchInText(template.content, query)
          ),
          forumDiscussions: state.searchForumDiscussions(query),
          sharedResources: state.searchSharedResources(query),
          videoTutorials: state.searchVideoTutorials(query),
        };
      },
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        legalTexts: state.legalTexts,
        procedures: state.procedures,
        news: state.news,
        savedSearches: state.savedSearches,
        favorites: state.favorites,
        templates: state.templates,
        forumDiscussions: state.forumDiscussions,
        forumReplies: state.forumReplies,
        forumMembers: state.forumMembers,
        configurations: state.configurations,
        sharedResources: state.sharedResources,
        videoTutorials: state.videoTutorials,
        currentUser: state.currentUser,
      }),
    }
  )
);