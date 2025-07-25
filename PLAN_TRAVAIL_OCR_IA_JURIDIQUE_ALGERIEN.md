# Plan de Travail - OCR-IA Juridique Algérien 🇩🇿

## 📋 Vue d'ensemble du projet

**Objectif** : Compléter le développement des outils OCR-IA pour assurer que les données extraites sont correctement mappées dans les champs des formulaires selon le contenu des textes juridiques algériens.

**Contexte** : Application 100% locale pour traitement des textes juridiques et procédures administratives algériennes.

## 🏗️ Architecture Technique Proposée

### 1. Pipeline d'Extraction (Basé sur l'Algorithme 1 de l'annexe)

```
PDF → Extraction Pages → Détection Lignes → Suppression Bordures → 
Détection Tables → Extraction Texte → Structuration → Mapping Formulaires
```

### 2. Technologies Recommandées (100% Local)

- **Extraction texte** : PyMuPDF (fonctionne hors ligne)
- **Traitement NLP** : spaCy avec modèles téléchargés localement
- **Extraction entités** : Modèles Hugging Face en local (DistilBERT, CamemBERT français)
- **Relations juridiques** : Regex personnalisées + modèles légers stockés localement
- **Interface** : React + TypeScript (déjà en place)

## 📊 Modules à Développer/Améliorer

### Module 1 : Détection et Traitement d'Images (OpenCV-like en JS)
**Localisation** : `src/services/imageProcessingService.ts`

```typescript
// Fonctionnalités à implémenter :
- Conversion PDF → Images
- Détection lignes horizontales/verticales (HoughLines simulation)
- Suppression bordures automatique
- Segmentation zones texte/tables
- Dilatation/érosion pour améliorer détection
```

**Statut** : ✅ Partiellement existant, à améliorer

### Module 2 : Extraction et Structuration
**Localisation** : `src/services/legalOCRExtractionService.ts`

```typescript
// Améliorations requises :
- Implémentation complète de l'Algorithme 1
- Détection des lignes verticales séparatrices
- Gestion des "implicit rows" dans les tables
- Extraction cellules avec correspondance/fusion
- Patterns regex pour tous les types de publications légales
```

**Statut** : ✅ Existant, à compléter selon l'annexe

### Module 3 : Analyse des Relations Juridiques
**Localisation** : `src/services/legalRelationshipService.ts` (À créer)

```typescript
// Types de liens à détecter :
- Liens "Vu" (références à autres publications)
- Modifications législatives
- Abrogations et annulations partielles/totales
- Approbations et endorsements
- Contrôle de conformité/constitutionnalité
- Extensions et applications
- Annexes et listes complémentaires
```

**Statut** : 🔴 À créer

### Module 4 : Mapping Intelligent vers Formulaires
**Localisation** : `src/services/legalFormMappingService.ts`

```typescript
// Améliorations requises :
- Récupération dynamique depuis nomenclature
- Mapping contextuel selon type de document
- Validation des données extraites
- Gestion des champs conditionnels
- Suggestions automatiques pour champs non mappés
```

**Statut** : ✅ Existant, à améliorer

### Module 5 : Nomenclature et Templates
**Localisation** : `src/components/configuration/NomenclatureSection.tsx`

```typescript
// Templates de formulaires à créer/adapter :
- Tous les types juridiques algériens (40+ types identifiés)
- Champs spécifiques aux institutions algériennes
- Validation des numéros de publications
- Gestion calendriers hégirien/grégorien
```

**Statut** : ✅ Structure existante, contenus à adapter

## 🎯 Plan d'Implémentation par Phases

### Phase 1 : Amélioration Extraction de Base (Semaine 1)
1. **Compléter l'implémentation de l'Algorithme 1**
   - ✅ Détection pages : Déjà fonctionnel
   - 🔄 Améliorer détection lignes horizontales/verticales
   - 🔄 Perfectionner suppression bordures (3 lignes haut, 2 bas, 2 côtés)
   - 🔄 Optimiser détection lignes verticales séparatrices
   - 🔄 Améliorer extraction tables avec gestion "implicit rows"

2. **Tests et validation**
   - Navigation : `Menu Principal → DZ OCR-IA → Extraction et Mapping`
   - Fichier de test : Documents PDF journaux officiels algériens

### Phase 2 : Analyse NLP Avancée (Semaine 2)
1. **Implémenter service de relations juridiques**
   - Créer `legalRelationshipService.ts`
   - Patterns regex pour les 7 types de liens identifiés
   - Extraction entités juridiques (institutions, dates, numéros)
   - Graphe de relations entre publications

2. **Tests et validation**
   - Navigation : `Menu Principal → DZ OCR-IA → Analyse Relations`
   - Vérification des liens "Vu", modifications, abrogations

### Phase 3 : Mapping Intelligent (Semaine 3)
1. **Améliorer le service de mapping**
   - Récupération dynamique des formulaires depuis nomenclature
   - Mapping contextuel intelligent selon type de document
   - Suggestions pour champs non automatiquement mappés
   - Validation et contrôle qualité

2. **Adapter les formulaires de la nomenclature**
   - Ajouter champs spécifiques algériens manquants
   - Templates pour institutions algériennes
   - Validation numéros de publications algériennes
   - Support calendriers hijri/grégorien

3. **Tests et validation**
   - Navigation : `Menu Principal → DZ OCR-IA → Mapping Formulaires`
   - Vérification mapping automatique vers formulaires nomenclature

### Phase 4 : Interface et Configuration (Semaine 4)
1. **Améliorer l'onglet Configuration OCR**
   - Navigation : `Menu Principal → Intégrations et Interopérabilité → ⚙️ Configuration OCR`
   - Paramètres fin tuning pour documents algériens
   - Gestion des templates de documents
   - Monitoring qualité extraction

2. **Fil d'approbation**
   - Workflow validation/enregistrement après mapping
   - Navigation : `Menu Principal → DZ OCR-IA → Fil d'Approbation`
   - Historique des validations

## 📍 Emplacements de Test

### Tests Fonctionnels
1. **Section DZ OCR-IA** : `Menu Principal → DZ OCR-IA`
   - `🔍 Extraction et Mapping` : Test extraction complète
   - `🧠 Analyse Relations` : Test détection relations juridiques
   - `📋 Mapping Formulaires` : Test mapping vers nomenclature
   - `✅ Fil d'Approbation` : Test workflow validation

2. **Configuration OCR** : `Menu Principal → Intégrations et Interopérabilité → ⚙️ Configuration OCR`
   - Paramètres extraction par type de document
   - Gestion des templates
   - Monitoring qualité

### Tests Techniques
- **URL locale** : `http://localhost:5173`
- **Console de développement** : Logs de débogage OCR
- **Dossier de test** : `/public/test-documents/` (documents PDF échantillons)

## 🔧 Modifications Prévues

### Fichiers à Modifier (Existants)
1. `src/services/legalOCRExtractionService.ts` - Amélioration algorithme extraction
2. `src/services/legalFormMappingService.ts` - Mapping intelligent
3. `src/components/configuration/NomenclatureSection.tsx` - Templates algériens
4. `src/components/configuration/IntegrationsInteroperabilitySection.tsx` - ✅ Déjà récupéré avec 5 onglets
5. `src/components/ocr/DZOCRIAProcessor.tsx` - Interface utilisateur

### Fichiers à Créer (Nouveaux)
1. `src/services/legalRelationshipService.ts` - Analyse relations juridiques
2. `src/services/imageProcessingService.ts` - Traitement d'images
3. `src/components/ocr/ApprovalWorkflowComponent.tsx` - Fil d'approbation
4. `src/data/algerianLegalTemplates.ts` - Templates juridiques algériens
5. `src/hooks/useOCRQualityMonitoring.ts` - Monitoring qualité

### Aucune Modification sur
- Menu principal et navigation existante
- Autres fonctionnalités de l'application
- Structure générale des composants existants

## 🎯 Objectifs de Qualité

- **Précision extraction** : >95% pour textes juridiques algériens
- **Mapping automatique** : >90% des champs mappés correctement
- **Performance** : <5 secondes pour documents <10 pages
- **Local uniquement** : Aucune dépendance externe, fonctionnement hors ligne
- **Robustesse** : Gestion erreurs et documents de qualité variable

## 📈 Métriques de Succès

1. **Extraction** : Texte extrait fidèle à l'original
2. **Structuration** : Tables et zones correctement identifiées
3. **Relations** : Liens juridiques détectés et validés
4. **Mapping** : Formulaires pré-remplis correctement
5. **Validation** : Workflow d'approbation fonctionnel

---

**Notes importantes** :
- Toutes les fonctionnalités doivent fonctionner 100% en local
- Respect de la structure existante de l'application
- Tests systématiques après chaque phase
- Documentation des changements apportés