"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Globe, Mail, MapPin, Phone, Star } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
// Mock Professional Data
const mockProfessional = {
  id: "1",
  name: "Maria Silva",
  title: "Tax Consultant",
  bio: "Experienced tax consultant with over 10 years of experience helping businesses optimize their tax strategies and ensure compliance with local and international regulations.",
  specialties: ["Corporate Tax", "Tax Planning", "International Tax", "Tax Compliance", "Tax Audit"],
  hourlyRate: 150,
  rating: 4.8,
  reviews: 127,
  email: "maria.silva@businesswave.co.ca",
  phone: "+244 925 220 199",
  website: "www.mariasilva.co.ca",
  location: "Luanda, Angola",
  availability: "Monday to Friday, 9:00 - 17:00",
  languages: ["Portuguese", "English", "Spanish"],
  experience: [
    {
      title: "Senior Tax Consultant",
      company: "Big4 Consulting",
      period: "2018 - Present",
    },
    {
      title: "Tax Consultant",
      company: "Global Tax Solutions",
      period: "2013 - 2018",
    },
  ],
  education: [
    {
      degree: "Master's in Taxation",
      institution: "University of Luanda",
      year: "2012",
    },
    {
      degree: "Bachelor's in Business Administration",
      institution: "University of Luanda",
      year: "2010",
    },
  ],
  skills: ["Tax Strategy", "Financial Analysis", "Regulatory Compliance"],
  recommendations: [
    {
      name: "João Santos",
      relation: "Former Manager",
      comment: "Maria is an exceptional tax consultant with great attention to detail.",
    },
    {
      name: "Ana Costa",
      relation: "Client",
      comment: "Her expertise helped us save a lot on taxes.",
    },
  ],
  activities: [
    {
      title: "Webinar sobre Planejamento Tributário",
      description: "Participe do nosso webinar sobre as melhores práticas de planejamento tributário.",
      date: "2023-10-15",
      link: "https://example.com/webinar",
      imageUrl: "https://via.placeholder.com/800x400", // URL da imagem do post
    },
    {
      title: "Artigo: Como Reduzir Impostos Legalmente",
      description: "Leia nosso artigo sobre estratégias legais para reduzir impostos.",
      date: "2023-09-20",
      link: "https://example.com/artigo",
      imageUrl: "https://via.placeholder.com/800x400", // URL da imagem do post
    },
  ],
  photoUrl: "https://example.com/photos/maria-silva.jpg", // URL da foto do profissional
  coverPhotoUrl: "", // URL da foto de capa (deixe vazio para usar a API)
}

// Função para gerar a URL da foto de capa
const getCoverPhotoUrl = (name: string) => {
  return `https://ui-avatars.com/api/?name=${name}&background=random&size=800` // Tamanho ajustado para a capa
}

const PostCard = ({ activity }: { activity: any }) => {
  return (
    <Card className="border rounded-lg shadow-md mb-4">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{activity.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{activity.description}</p>
        <a href={activity.link} className="text-blue-500 hover:underline">Leia mais</a>
      </CardContent>
    </Card>
  )
}

const SuggestedProfessionalCard = ({ professional }: { professional: any }) => {
  return (
    <Card className="border rounded-lg shadow-md mb-4">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{professional.name}</CardTitle>
        <p className="text-sm text-gray-500">{professional.title}</p>
      </CardHeader>
      <CardContent>
        <img src={professional.photoUrl} alt={professional.name} className="w-full h-32 object-cover rounded-t-lg" />
        <p className="text-sm">{professional.bio}</p>
        <Button variant="outline" className="mt-2">Ver Perfil</Button>
      </CardContent>
    </Card>
  )
}

const SuggestedProfessionalsList = ({ mockProfessionals }: { mockProfessionals: any }) => {
  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Profissionais Sugeridos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProfessionals?.map((professional: any) => (
              <SuggestedProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Ver Todos</Button>

        </CardFooter>
      </Card>
    </div>
  )
}
 function ProfessionalProfile() {
  const params = useParams()
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [budget, setBudget] = useState("")

  const handleContact = () => {
    // TODO: Implement contact functionality
    setIsContactDialogOpen(false)
  }

  // Usar a URL da foto de capa ou gerar uma se não estiver disponível
  const coverPhotoUrl = mockProfessional.coverPhotoUrl || getCoverPhotoUrl(mockProfessional.name)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Profile Information */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            {/* Capa do Profissional */}
            <div
              className="h-32 bg-cover bg-center"
              style={{ backgroundImage: `url(${coverPhotoUrl})` }}
            />
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <img
                      src={mockProfessional.photoUrl}
                      alt={mockProfessional.name}
                      className="h-16 w-16 rounded-full mr-4"
                    />
                    <div>
                      <h1 className="text-3xl font-bold">{mockProfessional.name}</h1>
                      <p className="text-xl text-muted-foreground">
                        {mockProfessional.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">
                      {mockProfessional.rating} ({mockProfessional.reviews} reviews)
                    </span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactCard professional={mockProfessional} />
              <p className="text-gray-600 m-6">{mockProfessional.bio}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {mockProfessional.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{mockProfessional.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{mockProfessional.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span>{mockProfessional.website}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{mockProfessional.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>{mockProfessional.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span>{mockProfessional.hourlyRate.toLocaleString('pt-AO')} KZ/hour</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Experiência Profissional */}
          <Card>
            <CardHeader>
              <CardTitle>Experiência Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProfessional.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-blue-600 pl-4">
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seção de Educação */}
          <Card>
            <CardHeader>
              <CardTitle>Educação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProfessional.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-green-600 pl-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seção de Habilidades */}
          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockProfessional.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seção de Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProfessional.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-2 border-purple-600 pl-4">
                    <h3 className="font-semibold">{rec.name} - {rec.relation}</h3>
                    <p className="text-muted-foreground">"{rec.comment}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seção de Atividades */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProfessional.activities.map((activity, index) => (
                  <PostCard key={index} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}

      </div>
    </div>
  )
}

const LanguagesCard = ({ languages }: { languages: string[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Idiomas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <Badge key={language}>{language}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ContactCard = ({ professional }: { professional: any }) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");

  const handleContact = () => {
    // TODO: Implement contact functionality
    setIsContactDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" size="lg">
            Contatar {professional.name}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contatar {professional.name}</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para discutir os requisitos do seu projeto
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 space-x-4">
            <div>
              <label className="text-sm font-medium">Mensagem</label>
              <Textarea
                placeholder="Descreva seu projeto ou requisitos..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Orçamento (KZ)</label>
              <Input
                type="number"
                placeholder="Insira seu orçamento"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleContact} className="w-full">
              Enviar Mensagem
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
const MainContent = () => {
  return (
    <div className="container mx-auto py-8 px-4 mt-16 flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 pr-4">
        <ProfessionalProfile />
      </div>
      <div className="w-full md:w-1/3 h-screen flex flex-col sticky top-0">
        <LanguagesCard languages={mockProfessional.languages} />

        <SuggestedProfessionalsList mockProfessionals={[mockProfessional, mockProfessional]} />

      </div>
    </div>
  )
}

export default ProfessionalProfile;



