# 🇩🇿 Guide OCR + IA Juridique Algérienne

## Vue d'ensemble

Ce système d'OCR (Reconnaissance Optique de Caractères) couplé à l'Intelligence Artificielle a été développé spécifiquement pour traiter les documents juridiques algériens. Il implémente l'algorithme d'extraction et de structuration des données selon les spécifications fournies.

## Fonctionnalités principales

### 1. Extraction OCR avancée
- **Algorithme d'extraction complet** : Implémente les 16 étapes de l'algorithme spécifié
- **Détection des lignes** : Utilise les techniques de dilatation et érosion + HoughLinesP
- **Suppression des bordures** : Élimination automatique des éléments visuels non essentiels
- **Extraction des tables** : Détection et extraction des cellules de tableaux
- **Support multi-langue** : Français, arabe et mixte

### 2. Structuration des données juridiques
- **Expressions régulières spécialisées** : Adaptées aux documents juridiques algériens
- **Détection des entités** : Institutions, dates (hégirien/grégorien), références, personnes
- **Analyse des relations** : Types de liens entre publications (vu, modification, abrogation, etc.)
- **Hiérarchie juridique** : Classification selon l'ordre juridique algérien

### 3. Mapping intelligent vers formulaires
- **Nomenclature algérienne** : Utilise la base de données des institutions, wilayas, etc.
- **IA contextuelle** : Analyse le contexte pour mapper les champs appropriés
- **Validation automatique** : Contrôles de cohérence et suggestions
- **Suggestions intelligentes** : Alternatives et recommandations

## Architecture technique

### Services principaux

#### 1. `AlgerianLegalOCRService` (`src/services/ocrService.ts`)
```typescript
// Algorithme principal d'extraction
async extractFromPDF(file: File): Promise<ExtractedData>

// Étapes de l'algorithme :
// 1. Extraire les pages
// 2. Détecter lignes horizontales/verticales  
// 3. Enlever les bordures
// 4. Détecter lignes séparatrices de texte
// 5. Détecter les tables
// 6. Extraire rectangles texte/tables
// 7. Pour chaque rectangle : extraire contenu
// 8. Structurer les données avec regex
```

#### 2. `AlgerianLegalAIMappingService` (`src/services/aiMappingService.ts`)
```typescript
// Mapping vers formulaires
async mapToForm(extractedData: ExtractedData, formTemplate: any): Promise<MappingResult>

// Étapes du mapping :
// 1. Détecter entités juridiques spécifiques
// 2. Analyser contexte juridique algérien
// 3. Mapper vers champs formulaire
// 4. Générer suggestions intelligentes
// 5. Valider données mappées
```

### Composants UI

#### 1. `AlgerianLegalOCRComponent` (`src/components/ocr/AlgerianLegalOCRComponent.tsx`)
- Interface utilisateur complète
- Drag & drop de fichiers PDF
- Indicateur de progression en temps réel
- Résultats détaillés avec onglets
- Export des résultats
- Intégration fil d'approbation

#### 2. `OCRDemoComponent` (`src/components/ocr/OCRDemoComponent.tsx`)
- Démonstration interactive
- Données simulées réalistes
- Progression étape par étape
- Résultats détaillés

## Guide d'utilisation

### 1. Accès au système
1. Naviguez vers **"OCR + IA Juridique"** dans le menu principal
2. Sélectionnez **"🇩🇿 Traitement Documents Algériens"**

### 2. Test avec la démonstration
1. Cliquez sur **"Lancer la démonstration"**
2. Observez le processus étape par étape
3. Explorez les résultats dans les différents onglets :
   - **Document** : Informations extraites
   - **Mapping** : Données mappées vers formulaire
   - **Entités** : Entités juridiques détectées
   - **Validation** : Contrôles et suggestions

### 3. Traitement de vos documents
1. Glissez-déposez un fichier PDF ou cliquez pour parcourir
2. Cliquez sur **"Traiter le document"**
3. Attendez la fin du traitement
4. Consultez les résultats détaillés
5. Exportez ou enregistrez dans le fil d'approbation

## Emplacements des composants pour test

### Composants principaux
- **Section OCR principale** : Menu → OCR + IA Juridique → 🇩🇿 Traitement Documents Algériens
- **Extraction avancée** : Menu → OCR + IA Juridique → Extraction et Mapping
- **Fil d'approbation** : Menu → OCR + IA Juridique → Fil d'approbation *(en développement)*

### Services backend
- **Service OCR** : `src/services/ocrService.ts`
- **Service Mapping IA** : `src/services/aiMappingService.ts`

### Hooks et utilitaires
- **Nomenclature algérienne** : `src/hooks/useAlgerianNomenclatureData.ts`
- **Types** : `src/types/legal.ts`

## Spécifications techniques

### Types de documents supportés
- Constitution
- Lois (organiques et ordinaires)
- Ordonnances
- Décrets (présidentiels et exécutifs)
- Arrêtés (ministériels et interministériels)
- Décisions, Instructions, Circulaires

### Entités détectées
- **Institutions** : Président, Premier Ministre, Ministres, Walis, etc.
- **Dates** : Format hégirien et grégorien
- **Références juridiques** : Liens vers autres textes
- **Personnes** : Noms et titres
- **Lieux** : Wilayas algériennes
- **Concepts juridiques** : Abrogation, modification, etc.

### Expressions régulières utilisées
```javascript
// Type de publication et numéro
publicationType: /(?:loi|décret|arrêté|ordonnance|instruction|circulaire)\s*n°?\s*(\d+[\-\d]*)/gi

// Dates hégirien
dateHijri: /(\d+)\s+(Moharram|Safar|Rabia\s+El\s+Aouel|...)\s+(\d{4})/gi

// Dates grégorien  
dateGregorian: /correspondant\s+au\s+(\d{1,2})\s+(janvier|février|...)\s+(\d{4})/gi

// Institutions algériennes
institution: /(?:Président\s+de\s+la\s+République|Ministre|Premier\s+Ministre|Wali|...)/gi

// Articles
article: /Article\s+(\d+)\s*[:\-\.]\s*([^]*?)(?=Article\s+\d+|$)/gi

// Références "Vu"
vuReference: /Vu\s+(?:la\s+)?(?:loi|le\s+décret|l'arrêté|l'ordonnance)\s+n°?\s*([\d\-]+)[^;]*?;/gi
```

## Tests et validation

### Scénarios de test recommandés

#### 1. Test de base
- Document PDF simple (1-2 pages)
- Texte en français uniquement
- Structure standard (titre, articles, signature)

#### 2. Test avancé
- Document multipage (3+ pages)
- Texte mixte français/arabe
- Présence de tables
- Multiples références juridiques

#### 3. Test de performance
- Document volumineux (10+ pages)
- Qualité d'image variable
- Structures complexes

### Métriques de performance attendues
- **Confiance OCR** : > 85% pour documents de bonne qualité
- **Temps de traitement** : < 5 secondes par page
- **Précision mapping** : > 90% pour champs principaux
- **Entités détectées** : > 80% de rappel

## Intégration avec l'application existante

### Menu de navigation
Le système est intégré dans le menu principal avec l'icône `Scan` :
```typescript
{
  id: "ocr-ia-juridique",
  label: "OCR + IA Juridique", 
  icon: Scan,
  submenu: [
    { label: "🇩🇿 Traitement Documents Algériens", section: "algerian-ocr" },
    { label: "Extraction et Mapping", section: "ocr-extraction" },
    { label: "Fil d'approbation", section: "approval-workflow" }
  ]
}
```

### Nomenclature existante
Le système utilise les hooks existants :
- `useAlgerianNomenclatureData()` : Données spécifiques algériennes
- `useNomenclatureData()` : Nomenclature générale

### Formulaires
Integration avec la bibliothèque de formulaires existante via :
- `getAlgerianFormTemplateWithNomenclature(type)`
- Mapping automatique selon le type de document détecté

## Fil d'approbation

### Workflow prévu
1. **Extraction** : Document traité par OCR + IA
2. **Validation automatique** : Contrôles de cohérence
3. **Révision humaine** : Validation par expert juridique
4. **Approbation** : Intégration dans la base de données
5. **Publication** : Mise à disposition dans les catalogues

### États des documents
- `En traitement` : OCR en cours
- `En attente de validation` : Prêt pour révision humaine
- `Validé` : Approuvé par expert
- `Rejeté` : Nécessite retraitement
- `Publié` : Intégré dans les catalogues

## Dépendances techniques

### Bibliothèques OCR
- `tesseract.js` : Reconnaissance de caractères
- `pdfjs-dist` : Manipulation PDF
- `pdf2pic` : Conversion PDF vers images
- `sharp` : Traitement d'images

### Bibliothèques IA
- `nlp-compromise` : Traitement du langage naturel
- `@huggingface/transformers` : Modèles de langage

### Interface utilisateur
- `@radix-ui/*` : Composants UI
- `lucide-react` : Icônes
- `tailwindcss` : Styles

## Maintenance et évolution

### Améliorations prévues
1. **Modèles IA spécialisés** : Entraînement sur corpus juridique algérien
2. **Support OCR manuscrit** : Documents manuscrits et tampons
3. **API REST** : Intégration avec systèmes externes
4. **Traitement par lot** : Traitement de multiples documents
5. **Historique et versioning** : Suivi des modifications

### Monitoring et logs
- Logs détaillés de traitement dans la console
- Métriques de performance automatiques
- Alertes en cas d'erreur

## Support et contact

Pour tout problème ou suggestion d'amélioration :
1. Vérifiez les logs de la console navigateur
2. Testez d'abord avec la démonstration
3. Vérifiez la qualité du document PDF source
4. Consultez ce guide pour les cas d'usage supportés

---

*Ce système respecte les spécifications techniques fournies et implémente l'algorithme d'extraction complet pour les documents juridiques algériens.*