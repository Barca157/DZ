
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Brain, 
  Zap, 
  Target,
  BookOpen,
  FileText,
  Scale,
  Users
} from 'lucide-react';
import { buttonHandlers } from '@/utils/buttonUtils';

export function ImmersiveSearchInterface() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMode, setActiveMode] = useState('semantic');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Interface de Recherche Immersive</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explorez notre base de données juridique avec des outils de recherche avancés et intelligents
        </p>
      </div>

      {/* Search Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <CardTitle className="text-indigo-900">Recherche Sémantique</CardTitle>
            <CardDescription>
              Recherche intelligente basée sur le sens et le contexte
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={buttonHandlers.search('sémantique', searchQuery || 'recherche contextuelle')}
            >
              <Brain className="w-4 h-4 mr-2" />
              Lancer la recherche
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-900">Recherche par Mots-clés</CardTitle>
            <CardDescription>
              Recherche précise par termes spécifiques
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={buttonHandlers.search('mots-clés', searchQuery || 'recherche par termes')}
            >
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Recherche IA Avancée</CardTitle>
            <CardDescription>
              Intelligence artificielle pour des résultats optimaux
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={buttonHandlers.search('IA avancée', searchQuery || 'recherche intelligente')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Recherche IA
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <Button 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={buttonHandlers.browseType('loi', 'Lois')}
            >
              <Scale className="w-4 h-4 mr-1" />
              Lois
            </Button>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={buttonHandlers.browseType('decret', 'Décrets')}
            >
              <FileText className="w-4 h-4 mr-1" />
              Décrets
            </Button>
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={buttonHandlers.browseType('arrete', 'Arrêtés')}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Arrêtés
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
