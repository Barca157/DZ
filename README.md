# Application DZ - OCR Juridique Optimisé

Application web moderne pour l'analyse et l'extraction de documents juridiques algériens avec IA avancée optionnelle.

## 🚀 Fonctionnalités principales

- **OCR Optimisé** : Extraction de texte avec mode rapide par défaut et IA avancée à la demande
- **Analyse Juridique** : Reconnaissance d'entités légales (lois, décrets, articles)
- **Interface Moderne** : React + TypeScript + Tailwind CSS
- **Performance** : Chargement initial optimisé (4.1MB au lieu de 26MB)
- **Multilingue** : Support français et arabe

## 🛠️ Technologies

- **Frontend** : React 18, TypeScript, Tailwind CSS
- **Build** : Vite avec optimisations avancées
- **OCR** : Tesseract.js (mode rapide) + Hugging Face Transformers (IA avancée)
- **PDF** : PDF.js pour l'extraction de documents
- **Base de données** : Supabase

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/lisbone931/DZ.git
cd DZ

# Basculer vers la branche optimisée
git checkout LYO

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

L'application sera disponible sur http://localhost:8080

## 🎯 Optimisations appliquées

### Performance
- **-84% de taille** : 26MB → 4.1MB au chargement initial
- **Lazy loading** : IA lourde (21MB) chargée seulement à la demande
- **Code splitting** : 7 chunks séparés pour un meilleur caching
- **Minification** : Bundle principal réduit de 35%

### Architecture
- **Service OCR optimisé** : Mode rapide par défaut avec fallback intelligent
- **Configuration Vite** : Exclusion des dépendances lourdes du bundle principal
- **Interface adaptative** : L'utilisateur choisit le niveau d'analyse

## 📁 Structure du projet

```
├── src/
│   ├── components/          # Composants React
│   │   ├── ocr/            # Composants OCR
│   │   └── OptimizedOCRUpload.tsx
│   ├── services/           # Services métier
│   │   ├── optimizedOCRService.ts
│   │   └── autoMappingService.ts
│   ├── pages/              # Pages de l'application
│   └── types/              # Types TypeScript
├── public/                 # Assets statiques
├── docs/                   # Documentation
└── dist/                   # Build de production (exclu du Git)
```

## 🔧 Scripts disponibles

```bash
npm run dev          # Démarrage en mode développement
npm run build        # Build de production optimisé
npm run preview      # Prévisualisation du build
npm run lint         # Vérification du code
```

## 📊 Métriques de performance

| Métrique | Avant optimisation | Après optimisation | Amélioration |
|----------|-------------------|-------------------|--------------|
| Taille totale | 26MB | 4.1MB | **-84%** |
| Bundle principal | 4.3MB | 2.8MB | **-35%** |
| Fichier WASM | 21MB (inclus) | Exclu (lazy) | **-100%** |
| Temps de chargement | Lent | Quasi-instantané | **Drastique** |

## 🧠 Modes d'analyse

### Mode Rapide (par défaut)
- **Tesseract.js** pour l'OCR d'images
- **PDF.js** pour l'extraction PDF
- **NLP basique** pour l'analyse d'entités
- **Chargement** : Instantané

### Mode IA Avancée (optionnel)
- **Hugging Face Transformers** pour l'analyse sémantique
- **Reconnaissance d'entités** avancée
- **Classification de texte** intelligente
- **Chargement** : ~21MB téléchargés une fois

## 🌟 Utilisation

1. **Upload de document** : Glissez-déposez un PDF ou une image
2. **Analyse rapide** : Extraction immédiate avec Tesseract.js
3. **IA optionnelle** : Cliquez sur "Charger IA" pour l'analyse avancée
4. **Résultats** : Texte extrait + entités juridiques détectées

## 📚 Documentation

- [Guide d'optimisation des assets](./OPTIMISATION_ASSETS_LOURDS.md)
- [Synchronisation des branches](./SYNCHRONISATION_BRANCHE_LYO.md)
- [Documentation OCR](./docs/archive/)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens utiles

- [Repository GitHub](https://github.com/lisbone931/DZ)
- [Branche optimisée LYO](https://github.com/lisbone931/DZ/tree/LYO)
- [Documentation Vite](https://vitejs.dev/)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers.js/)

---

**Version optimisée** - Branche LYO  
**Performance** : 84% d'amélioration du temps de chargement  
**Architecture** : Lazy loading intelligent pour l'IA avancée
