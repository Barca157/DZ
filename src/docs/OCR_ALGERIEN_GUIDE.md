# 🇩🇿 Guide OCR - Textes Juridiques et Procédures Administratives Algériennes

## Vue d'ensemble

Cette fonctionnalité OCR avancée est spécialement conçue pour traiter les documents juridiques et administratifs algériens, avec support complet pour :
- Documents bilingues (français/arabe)
- Nomenclature algérienne officielle
- Institutions et organismes algériens
- Wilayas et communes
- Validation contextuelle

## Fonctionnalités Principales

### 🔍 Détection Automatique
- **Type de document** : Texte juridique ou procédure administrative
- **Langue** : Français, arabe ou bilingue
- **Institution émettrice** : Ministères, wilayas, communes
- **Niveau administratif** : National, régional, local

### 📋 Types de Documents Supportés

#### Textes Juridiques Algériens
- Constitution (الدستور)
- Lois organiques (قانون عضوي)
- Lois (قانون)
- Ordonnances (أمر)
- Décrets présidentiels (مرسوم رئاسي)
- Décrets exécutifs (مرسوم تنفيذي)
- Arrêtés ministériels (قرار وزاري)
- Arrêtés interministériels (قرار مشترك)
- Décisions (قرار)
- Instructions (تعليمة)
- Circulaires (منشور)

#### Procédures Administratives Algériennes
- **État Civil** (الحالة المدنية) : Actes de naissance, certificats de résidence
- **Commerce** (التجارة) : Registre de commerce, licences d'importation
- **Urbanisme** (التعمير) : Permis de construire, certificats d'urbanisme
- **Fiscalité** (الضرائب) : Déclarations fiscales, quitus fiscaux
- **Transport** (النقل) : Permis de conduire, cartes grises
- **Santé** (الصحة) : Certificats médicaux, carte Chifa
- **Éducation** (التربية والتعليم) : Inscriptions, équivalences de diplômes

## Comment Utiliser la Fonctionnalité

### 1. Accès à la Fonctionnalité
- Naviguer vers la section "Procédures Administratives"
- Cliquer sur "Ajouter une procédure"
- Sélectionner l'onglet "Scanner OCR"

### 2. Scan de Document
1. **Upload de fichier** : Images (JPG, PNG) ou PDF
2. **Capture caméra** : Prise de photo directe
3. **Traitement automatique** : Reconnaissance multilingue

### 3. Validation des Données
Le système affiche :
- **Confiance de l'extraction** (0-100%)
- **Type de document détecté**
- **Institution émettrice**
- **Langue(s) détectée(s)**
- **Données extraites** avec aperçu

### 4. Intégration au Formulaire
- Mapping automatique vers les champs appropriés
- Enrichissement avec la nomenclature algérienne
- Validation contextuelle
- Pré-remplissage intelligent

## Niveaux de Confiance

| Confiance | Description | Action Recommandée |
|-----------|-------------|-------------------|
| 80-100% | 🟢 Haute confiance | Utilisation directe |
| 60-79% | 🟡 Confiance moyenne | Vérification recommandée |
| 0-59% | 🔴 Confiance faible | Vérification manuelle obligatoire |

## Données Extraites Automatiquement

### Pour les Textes Juridiques
- **Titre** et références
- **Type** de texte (loi, décret, arrêté...)
- **Institution** émettrice
- **Date** de publication
- **Journal Officiel** (numéro et date)
- **Signataire**
- **Bases juridiques**
- **Wilaya/Commune** si applicable

### Pour les Procédures Administratives
- **Nom** de la procédure
- **Type** (demande, autorisation, certificat...)
- **Secteur** d'activité
- **Public cible**
- **Documents requis**
- **Étapes** de la procédure
- **Durée** de traitement
- **Coût** et modalités
- **Lieu** de dépôt
- **Contacts**

## Institutions Algériennes Reconnues

### Niveau National
- Présidence de la République (رئاسة الجمهورية)
- Premier Ministère (الوزارة الأولى)
- Ministères sectoriels

### Niveau Régional
- 58 Wilayas avec codes officiels
- Daïras et subdivisions

### Niveau Local
- Communes urbaines et rurales
- APC (Assemblées Populaires Communales)

## Documents Typiquement Algériens

### Documents d'Identité
- Acte de naissance (شهادة الميلاد)
- Certificat de résidence (شهادة الإقامة)
- Carte d'identité nationale (بطاقة التعريف الوطنية)
- Casier judiciaire (صحيفة السوابق العدلية)

### Documents Administratifs
- Certificat de nationalité algérienne
- Attestation de travail
- Certificat médical
- Carte Chifa (carte d'assurance maladie)

## Conseils d'Optimisation

### Qualité des Images
- **Résolution** : Minimum 300 DPI
- **Éclairage** : Uniforme, sans ombres
- **Contraste** : Texte noir sur fond blanc
- **Orientation** : Document droit, non incliné

### Documents Bilingues
- Le système reconnaît automatiquement les deux langues
- Priorité donnée au français pour l'interface
- Conservation du texte arabe pour la validation

### Cas Particuliers
- **Documents manuscrits** : Confiance réduite
- **Cachets et signatures** : Peuvent interférer
- **Documents anciens** : Qualité variable

## Dépannage

### Problèmes Courants
1. **Confiance faible** : Améliorer la qualité de l'image
2. **Texte manqué** : Vérifier l'éclairage et le contraste
3. **Mauvaise détection** : S'assurer que le document est algérien
4. **Erreurs de mapping** : Vérifier la nomenclature utilisée

### Support Technique
- Logs détaillés dans la console du navigateur
- Messages d'erreur contextuels
- Validation en temps réel

## Évolutions Futures

### Prévues
- Support de l'amazigh (tamazight)
- Reconnaissance de signatures et cachets
- Intégration avec les bases de données officielles
- Export vers différents formats

### En Développement
- IA avancée pour la correction automatique
- Apprentissage automatique sur les documents algériens
- Interface mobile dédiée

## Conformité et Sécurité

- **Confidentialité** : Traitement local, pas de transmission externe
- **RGPD** : Respect de la réglementation
- **Sécurité** : Chiffrement des données sensibles
- **Audit** : Traçabilité des opérations

---

**Note importante** : Cette fonctionnalité est spécialement optimisée pour les documents officiels algériens. Pour d'autres types de documents, utiliser la fonctionnalité OCR générique.