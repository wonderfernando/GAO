"use client"

import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormMessage,
    FormField,
    FormLabel,
    FormItem,
    Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Definindo o esquema do formulário
const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres").optional(),
})

export default function EditProfilePanel() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user") // Substitua pela sua API
        const data = await response.json()
        setUserData(data)
        form.reset(data) // Preenche o formulário com os dados do usuário
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao carregar os dados do usuário",
          variant: "destructive",
        })
      }
    }

    fetchUserData()
  }, [form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/user", {
        method: "PUT", // Método para atualizar os dados
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso",
      })
      router.push("/profile") // Redireciona para a página de perfil
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Algo deu errado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu e-mail" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha (deixe em branco para manter a atual)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite uma nova senha"
                    type="password"
                    {...field }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Atualizando..." : "Atualizar Perfil"}
          </Button>
        </form>
      </Form>
    </div>
  )
}