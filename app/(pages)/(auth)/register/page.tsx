"use client";

import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
  Form,
} from "@/components/ui/form";
import {
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";
import SvgIlustration from "@/public/assets/img/for-create.svg";
import UploadInput from "@/components/ui/upload-input";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import SelectWithSearch from "@/components/Select";
import { use } from 'react';
import { LucideSquareDashedMousePointer } from "lucide-react";
import FileUpload from "@/components/upload-component";

// 📦 Schema completo

const formSchema = z.discriminatedUnion("tipo", [
  z.object({
    tipo: z.literal("EMPRESA"),
    nome: z.string(),
    email: z.string(),
    senha: z.string(),
    nif: z.string(),
    sector: z.string(),
    profissao: z.optional(z.string()),
    experiencia: z.optional(z.string()),
    bio: z.optional(z.string()),
  }),
  z.object({
    tipo: z.literal("PROFISSIONAL"),
    nome: z.string(),
    email: z.string(),
    senha: z.string(),
    profissao: z.string(),
    experiencia: z.string(),
    bio: z.string(),
    nif: z.optional(z.string()),
    sector: z.optional(z.string()),
  }),
]);
type FormSchema = z.infer<typeof formSchema>;
export interface Categoria {
  id: string,
  nome: string,

}
async function getFetch() {
  const response = await fetch("/api/categorias", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      tipo: "PROFISSIONAL",
      nif: "",
      sector: "",
      profissao: "",
      experiencia: "",
      bio: "",
    },
  });

  async function handleNextStep() {
    const currentValues = form.getValues();

    try {
      if (step === 1) {
        const step1Schema = z.object({
          nome: z.string().min(5, "Nome deve ter no minimo 5 caratcteres"),
          email: z.string().email("Email invalido"),
          senha: z.string().min(8, " A senha deve 8 caracteres no minimo"),
        });

        await step1Schema.parseAsync(currentValues);
      } else if (step === 2) {
        const step2Schema = z.object({
          tipo: z.enum(["EMPRESA", "PROFISSIONAL"]),
        });
        await step2Schema.parseAsync(currentValues);
      } else if (step === 3) {
        const tipo = currentValues.tipo;
        if (tipo === "EMPRESA") {
          const step3EmpresaSchema = z.object({
            nif: z.string().min(10, "o nif deve ter no minimo 10 caracteres"),
            sector: z.string().min(1, "o sector eh origatorio"),
          });
          await step3EmpresaSchema.parseAsync(currentValues);
        } else {
          const step3ProfissionalSchema = z.object({
            profissao: z.string().min(1, "Você não disse a tua profissão."),
            experiencia: z.string().min(1, "Você não contou a tua experiêcia"),
            bio: z
              .string()
              .min(10, " Fale sobre você em no minimo 10 caracteres"),
          });
          await step3ProfissionalSchema.parseAsync(currentValues);
        }
      } else if (step === 4 && currentValues.tipo === "PROFISSIONAL") {
        const step4Schema = z.object({
          // anexosIds: z.string().min(1),
        });
        await step4Schema.parseAsync(currentValues);
      }

      setStep(step + 1);
    } catch (error) {
      // ZodErrors já são tratados pelos campos individuais
      if (error instanceof z.ZodError) {
        const messages = error.errors
          .map((e) => `• ${e.path.join(".")} - ${e.message}`)
          .join("\n");
        toast({
          title: "Erro de validação",
          description: messages,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro",
          description:
            error instanceof Error ? error.message : "Erro desconhecido",
          variant: "error",
        });
      }
    }
  }
  const isLastStep = () => {
    const tipo = form.watch("tipo");
    if (tipo === "PROFISSIONAL") {
      return step === 5;
    } else if (tipo === "EMPRESA") {
      return step === 4;
    }
    return false;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Submissão final
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      toast({
        title: "Conta criada com sucesso",
        description: "Agora você pode fazer login",
      });

      router.push("/login");
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  useEffect(() => {
    getFetch().then((data) => setCategorias(data));
  }, []);
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 mt-16">
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Junte-se à BusinessWave</h1>
              <p className="text-muted-foreground mt-2">
                Cadastre-se para se conectar com profissionais
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="nome"
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
                            <Input
                              type="email"
                              placeholder="Digite seu email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="senha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Crie uma senha"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quem é você?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione seu perfil" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PROFISSIONAL">
                              Sou um profissional
                            </SelectItem>
                            <SelectItem value="EMPRESA">
                              Sou uma empresa
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* STEP 3 - CAMPOS DINÂMICOS */}
                {step === 3 && form.watch("tipo") === "EMPRESA" && (
                  <>
                    <FormField
                      control={form.control}
                      name="nif"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NIF</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Número de identificação fiscal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Setor de atuação</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: Tecnologia, Construção"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {step === 3 && form.watch("tipo") === "PROFISSIONAL" && (
                  <>
                    <FormField
                      control={form.control}
                      name="nif"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NIF</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Número de identificação fiscal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="profissao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Setor</FormLabel>
                          <FormControl>
                            <SelectWithSearch
                              resource="Setor"
                              isLoading={false}
                              onChange={field.onChange}
                              data={categorias?.map(m => ({ id: m.id, name: m.nome }))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experiencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anos de experiência</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 3 anos"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Conte algo sobre você"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
     

                {/* STEP 4 = Enviar */}
                {step === 4 && (
                  <p className="text-center text-muted-foreground">
                    Clique abaixo para finalizar seu cadastro.
                  </p>
                )}

                {/* BOTÕES */}
                <div className="flex justify-between mt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    type={isLastStep() ? "submit" : "button"}
                    onClick={isLastStep() ? undefined : handleNextStep}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Enviando..."
                      : isLastStep()
                        ? "Criar conta"
                        : "Próximo"}
                  </Button>
                </div>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>

        {/* Ilustração */}
        <div className="hidden md:block w">
          <Image
            src={SvgIlustration}
            alt="Ilustração de cadastro"
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
}
