"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Filter, Search, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Componente Avatar
const Avatar = ({ name }: { name: string }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=random`;

  const handleError = (event: any) => {
    event.target.src = 'https://example.com/default-avatar.png'; // URL da imagem padrão
  };

  return (
    <img
      src={avatarUrl}
      alt={name}
      onError={handleError}
      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
    />
  );
};

interface Professional {
  id: string
  name: string
  title: string
  specialties: string[]
  hourlyRate: number
  rating: number
  photoUrl: string // Adicionando a propriedade photoUrl
}

const mockProfessionals: Professional[] = [
  {
    id: "1",
    name: "Maria Silva",
    title: "Tax Consultant",
    specialties: ["Corporate Tax", "Tax Planning", "International Tax"],
    hourlyRate: 150,
    rating: 4.8,
    photoUrl: "https://example.com/photos/maria-silva.jpg", // URL de exemplo para a foto
  },
  {
    id: "2",
    name: "João Santos",
    title: "Legal Advisor",
    specialties: ["Corporate Law", "Contracts", "Labor Law"],
    hourlyRate: 200,
    rating: 4.9,
    photoUrl: "https://example.com/photos/joao-santos.jpg", // URL de exemplo para a foto
  },
  {
    id: "3",
    name: "Adre Jao",
    title: "Business Consultant",
    specialties: ["Strategic Planning", "Process Optimization", "Management"],
    hourlyRate: 175,
    rating: 2.7,
    photoUrl: "https://example.com/photos/ana-costa.jpg", // URL de exemplo para a foto
  },
  {
    id: "4",
    name: "Celson Fernado",
    title: "Programador",
    specialties: ["Strategic Planning", "Process Optimization", "Management"],
    hourlyRate: 175,
    rating: 2.7,
    photoUrl: "https://example.com/photos/ana-costa.jpg", // URL de exemplo para a foto
  },
  {
    id: "4",
    name: "Alcino Bita",
    title: "Programador web fullstack",
    specialties: ["Deops", "Automação de TI", "Gestor de Projetos", "Desenvolvimento de Software","Desenvolvimento de Aplicações Web"],
    hourlyRate: 175,
    rating: 5,
    photoUrl: "https://example.com/photos/ana-costa.jpg", // URL de exemplo para a foto
  },
  // Adicione mais profissionais conforme necessário
]

const categories = [
  "Tax Services",
  "Legal Services",
  "Business Consulting",
  "Accounting",
  "Human Resources",
  "Marketing",
]

export default function ServicesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProfessionals = mockProfessionals.filter((professional) => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialties.some(specialty =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )

    if (selectedCategory) {
      return matchesSearch && professional.specialties.some(specialty =>
        specialty.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    return matchesSearch
  }).sort((a, b) => b.rating - a.rating); // Ordena por rating em ordem decrescente

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Professional Services</h1>
        <p className="text-muted-foreground">
          Connect with verified professionals for your business needs
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name, title, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map((professional) => (
          <Card key={professional.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <Avatar name={professional.name} /> {/* Usando o componente Avatar */}
                <div className="ml-4">
                  <CardTitle className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{professional.name}</h3>
                      <p className="text-muted-foreground">{professional.title}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{professional.rating}</span>
                    </div>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {professional.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {professional.hourlyRate.toLocaleString('pt-AO')} KZ/hour
                </span>
                <Button
                  onClick={() => router.push(`/professionals/${professional.id}`)}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}