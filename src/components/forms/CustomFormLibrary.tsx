import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  Download,
  Upload,
  Star,
  Calendar
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

interface CustomForm {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: number;
  responses: number;
  createdDate: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
  isStarred: boolean;
}

export function CustomFormLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const customForms: CustomForm[] = [
    {
      id: '1',
      title: 'Demande de permis de construire',
      description: 'Formulaire personnalisé pour les demandes de permis de construire',
      category: 'Urbanisme',
      fields: 12,
      responses: 45,
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'published',
      isStarred: true
    },
    {
      id: '2',
      title: 'Déclaration d\'activité commerciale',
      description: 'Formulaire pour les déclarations d\'activité commerciale',
      category: 'Commerce',
      fields: 8,
      responses: 23,
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      status: 'published',
      isStarred: false
    },
    {
      id: '3',
      title: 'Demande de subvention',
      description: 'Formulaire de demande de subvention pour associations',
      category: 'Associations',
      fields: 15,
      responses: 12,
      createdDate: '2024-01-05',
      lastModified: '2024-01-12',
      status: 'draft',
      isStarred: false
    }
  ];

  const categories = ['all', 'Urbanisme', 'Commerce', 'Associations', 'Social', 'Fiscal'];

  const filteredForms = customForms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bibliothèque de Formulaires</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos formulaires personnalisés
          </p>
        </div>
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={buttonHandlers.generic('Créer formulaire', 'Création d\'un nouveau formulaire', 'Formulaires')}
        >
          <Plus className="w-4 h-4" />
          Créer un formulaire
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher un formulaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'Toutes les catégories' : category}
            </option>
          ))}
        </select>
        <Button 
          variant="outline"
          onClick={buttonHandlers.generic('Filtres avancés', 'Ouverture des filtres avancés', 'Formulaires')}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grille</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(form.status)}>
                          {form.status}
                        </Badge>
                        <Badge variant="outline">{form.category}</Badge>
                        {form.isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <CardTitle className="text-lg">{form.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-2">{form.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">{form.fields}</span> champs
                      </div>
                      <div>
                        <span className="font-medium">{form.responses}</span> réponses
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Créé le {new Date(form.createdDate).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Modifié le {new Date(form.lastModified).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.viewDocument(form.id, form.title, 'formulaire')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.generic(`Modifier: ${form.title}`, 'Modification du formulaire', 'Formulaires')}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.generic(`Dupliquer: ${form.title}`, 'Duplication du formulaire', 'Formulaires')}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Dupliquer
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.downloadDocument(form.id, form.title)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-red-600 hover:text-red-700"
                      onClick={buttonHandlers.generic(`Supprimer: ${form.title}`, 'Suppression du formulaire', 'Formulaires')}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4 mt-6">
          <div className="space-y-4">
            {filteredForms.map((form) => (
              <Card key={form.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{form.title}</h3>
                        <Badge className={getStatusColor(form.status)}>
                          {form.status}
                        </Badge>
                        <Badge variant="outline">{form.category}</Badge>
                        {form.isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <p className="text-gray-600 mb-2">{form.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{form.fields} champs</span>
                        <span>{form.responses} réponses</span>
                        <span>Modifié le {new Date(form.lastModified).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.viewDocument(form.id, form.title, 'formulaire')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={buttonHandlers.generic(`Modifier: ${form.title}`, 'Modification du formulaire', 'Formulaires')}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={buttonHandlers.generic(`Actions: ${form.title}`, 'Menu d\'actions', 'Formulaires')}
                      >
                        Plus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Modèles populaires', 'Consultation des modèles populaires', 'Formulaires')}
            >
              <Star className="w-5 h-5" />
              Modèles populaires
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Importer formulaire', 'Import d\'un formulaire externe', 'Formulaires')}
            >
              <Upload className="w-5 h-5" />
              Importer
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Statistiques', 'Affichage des statistiques', 'Formulaires')}
            >
              <Eye className="w-5 h-5" />
              Statistiques
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={buttonHandlers.generic('Aide formulaires', 'Guide d\'aide pour les formulaires', 'Formulaires')}
            >
              <Calendar className="w-5 h-5" />
              Aide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}