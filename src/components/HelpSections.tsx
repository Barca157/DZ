import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, MessageSquare, Phone, Mail, Search, Plus, Filter, FileText
} from "lucide-react";
import { TechnicalSpecification } from "@/components/docs/TechnicalSpecification";
import { UserGuideSection } from "@/components/help/UserGuideSection";
import { AdminGuideSection } from "@/components/help/AdminGuideSection";
import { APIDocumentationSection } from "@/components/help/APIDocumentationSection";
import { VideoTutorialsSection } from "@/components/help/VideoTutorialsSection";
import { TechnicalDashboard } from "@/components/help/TechnicalDashboard";

interface HelpSectionsProps {
  section: string;
  language?: string;
}

export function HelpSections({ section, language = "fr" }: HelpSectionsProps) {
  const [activeTab, setActiveTab] = useState("faq");

  const getText = (key: string) => {
    const translations = {
      fr: {
        aboutTitle: "À propos",
        aboutDesc: "Informations sur Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Nous contacter",
        supportTitle: "Support technique",
        supportDesc: "Assistance et support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Centre d'aide",
        technicalSpec: "Fiche technique",
        userGuide: "Guide utilisateur",
        adminGuide: "Guide administrateur",
        apiDoc: "Documentation API",
        videoTutorials: "Tutoriels vidéo"
      },
      ar: {
        aboutTitle: "حول",
        aboutDesc: "معلومات حول Dalil.dz",
        contactTitle: "اتصل بنا",
        contactDesc: "تواصل معنا",
        supportTitle: "الدعم الفني",
        supportDesc: "المساعدة والدعم",
        faq: "الأسئلة الشائعة",
        chatSupport: "دعم المحادثة",
        helpCenter: "مركز المساعدة",
        technicalSpec: "المواصفات الفنية",
        userGuide: "دليل المستخدم",
        adminGuide: "دليل المدير",
        apiDoc: "وثائق API",
        videoTutorials: "دروس الفيديو"
      },
      en: {
        aboutTitle: "About",
        aboutDesc: "Information about Dalil.dz",
        contactTitle: "Contact",
        contactDesc: "Contact us",
        supportTitle: "Technical Support",
        supportDesc: "Assistance and support",
        faq: "FAQ",
        chatSupport: "Chat Support",
        helpCenter: "Help Center",
        technicalSpec: "Technical Specification",
        userGuide: "User Guide",
        adminGuide: "Admin Guide",
        apiDoc: "API Documentation",
        videoTutorials: "Video Tutorials"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  const getSectionContent = () => {
    switch (section) {
      case "about":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-green-600" />
                {getText("aboutTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("aboutDesc")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>À propos de Dalil.dz</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Dalil.dz est la plateforme nationale de veille juridique et réglementaire de l'Algérie.
                      Elle offre un accès centralisé aux textes juridiques, procédures administratives et 
                      ressources juridiques du pays.
                    </p>
                    <p className="text-gray-600">
                      Notre mission est de faciliter l'accès à l'information juridique pour tous les 
                      professionnels du droit, les institutions et les citoyens.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques de la plateforme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">2,847</div>
                      <div className="text-sm text-gray-600">Textes juridiques</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,234</div>
                      <div className="text-sm text-gray-600">Procédures</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">15,672</div>
                      <div className="text-sm text-gray-600">Utilisateurs actifs</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">98.7%</div>
                      <div className="text-sm text-gray-600">Taux de satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notre équipe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm">
                      Une équipe de juristes, développeurs et experts en digitalisation 
                      travaille quotidiennement pour améliorer vos services.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">25+ experts juridiques</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">15+ développeurs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Support 24h/7j</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Partenaires institutionnels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Ministère de la Justice</p>
                    <p>• Conseil d'État</p>
                    <p>• Cour Suprême</p>
                    <p>• Ministère de l'Intérieur</p>
                    <p>• Ordre des Avocats</p>
                    <p>• Chambre Notariale</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Version et mise à jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Version actuelle</p>
                      <Badge variant="outline">v2.3.1</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Dernière mise à jour</p>
                      <p className="text-sm text-gray-600">{new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Prochaine version</p>
                      <p className="text-sm text-gray-600">v2.4.0 - Q2 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Mail className="w-8 h-8 text-green-600" />
                {getText("contactTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("contactDesc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">contact@dalil.dz</p>
                  <p className="text-gray-600">support@dalil.dz</p>
                  <p className="text-gray-600">info@dalil.dz</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">+213 21 XX XX XX</p>
                  <p className="text-gray-600">Numéro vert: 3020</p>
                  <p className="text-gray-600">Lun-Ven: 8h-17h</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    Localisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium">Adresse</p>
                    <p className="text-gray-600 text-sm">Ministère de la Justice, Alger, Algérie</p>
                    <p className="text-gray-600 font-medium">GPS</p>
                    <p className="text-gray-600 text-sm">36.7528° N, 3.0420° E</p>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Voir sur la carte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Autres moyens de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Réseaux sociaux</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Facebook: @DalilDZ</p>
                      <p>LinkedIn: Dalil.dz</p>
                      <p>Twitter: @dalil_dz</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Horaires d'ouverture</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Lundi - Jeudi: 8h00 - 16h30</p>
                      <p>Vendredi: 8h00 - 12h00</p>
                      <p>Support en ligne 24h/7j</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "technical-support":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <MessageSquare className="w-8 h-8 text-green-600" />
                {getText("supportTitle")}
              </h2>
              <p className="text-gray-600 text-lg">{getText("supportDesc")}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="faq" className="flex items-center gap-2 text-sm">
                  {getText("faq")}
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2 text-sm">
                  {getText("chatSupport")}
                </TabsTrigger>
                <TabsTrigger value="user-guide" className="flex items-center gap-2 text-sm">
                  {getText("userGuide")}
                </TabsTrigger>
                <TabsTrigger value="video-tutorials" className="flex items-center gap-2 text-sm">
                  {getText("videoTutorials")}
                </TabsTrigger>
                <TabsTrigger value="admin-guide" className="flex items-center gap-2 text-sm">
                  {getText("adminGuide")}
                </TabsTrigger>
                <TabsTrigger value="technical-doc" className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  Documentation Technique
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      Questions fréquemment posées
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input placeholder="Rechercher une question..." className="flex-1" />
                        <Button variant="outline">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment rechercher un texte juridique ?</h4>
                            <p className="text-gray-600 text-sm">
                              Utilisez la barre de recherche principale ou accédez au catalogue des textes juridiques 
                              pour une recherche avancée.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-green-600">
                          <CardContent className="pt-4">
                            <h4 className="font-semibold mb-2">Comment créer un compte ?</h4>
                            <p className="text-gray-600 text-sm">
                              Cliquez sur "Créer un compte" et suivez les instructions. L'inscription est gratuite 
                              pour tous les utilisateurs.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      Support en ligne
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">Notre équipe de support est disponible pour vous aider.</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Démarrer une conversation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>


              <TabsContent value="user-guide" className="space-y-4">
                <UserGuideSection />
              </TabsContent>

              <TabsContent value="admin-guide" className="space-y-4">
                <AdminGuideSection />
              </TabsContent>

              <TabsContent value="video-tutorials" className="space-y-4">
                <VideoTutorialsSection />
              </TabsContent>

              <TabsContent value="technical-doc" className="space-y-4">
                {/* Tableau de bord technique */}
                <TechnicalDashboard />
                
                <Tabs defaultValue="architecture" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="architecture">Architecture</TabsTrigger>
                    <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="security">Sécurité</TabsTrigger>
                    <TabsTrigger value="api-doc">Documentation API</TabsTrigger>
                  </TabsList>
                  <TabsContent value="architecture">
                    <TechnicalSpecification activeTab="architecture" />
                  </TabsContent>
                  <TabsContent value="features">
                    <TechnicalSpecification activeTab="features" />
                  </TabsContent>
                  <TabsContent value="performance">
                    <TechnicalSpecification activeTab="performance" />
                  </TabsContent>
                  <TabsContent value="security">
                    <TechnicalSpecification activeTab="security" />
                  </TabsContent>
                  <TabsContent value="api-doc">
                    <APIDocumentationSection />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return <div>Section non trouvée</div>;
    }
  };

  return getSectionContent();
}
