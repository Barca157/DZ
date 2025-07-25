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

// Interface du store principal
interface AppStore {
  // État de l'application
  currentSection: string;
  currentUser: string;
  isLoading: boolean;
  
  // Données
  legalTexts: LegalText[];
  procedures: Procedure[];
  news: NewsItem[];
  savedSearches: SearchQuery[];
  favorites: Favorite[];
  templates: DocumentTemplate[];
  
  // Actions pour les textes juridiques
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
  
  // Actions générales
  setCurrentSection: (section: string) => void;
  setCurrentUser: (user: string) => void;
  setLoading: (loading: boolean) => void;
  
  // Actions d'import/export
  exportData: () => string;
  importData: (data: string) => void;
  
  // Actions de recherche globale
  globalSearch: (query: string) => {
    legalTexts: LegalText[];
    procedures: Procedure[];
    news: NewsItem[];
    templates: DocumentTemplate[];
  };
}

// Utilitaires
const generateId = () => Math.random().toString(36).substr(2, 9);

const searchInText = (text: string, query: string): boolean => {
  return text.toLowerCase().includes(query.toLowerCase());
};

// Création du store
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
        currentUser: state.currentUser,
      }),
    }
  )
);