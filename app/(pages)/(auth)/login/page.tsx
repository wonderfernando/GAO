"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { error } from "console";
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";
import SvgIlustration from "@/public/assets/img/for-login.svg";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";

// Definindo o esquema do formulário
const formSchema = z.object({
  email: z.string().email("Email invalido"),
  senha: z.string().min(1, "Pass invalida"),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("enviando:", values);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        senha: values.senha,
        redirect: false,
      });

      console.log("result:", result);

      if (result?.error) {
        toast({
          title: "Error",
          description:
            "A credenciais não estão correctas ou a tua conta está inativa" +
            result.error,
          variant: "destructive",
        });
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "algo deu errado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 mt-16">
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Bem Vindo de Volta</h1>
              <p className="text-muted-foreground mt-2">
                inicie sessão na sua conta para continuar
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 bg-blue-300 to-blue-800"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Ainda não se registou?{" "}
              <Link href="/register" className="text-primary hover:underline">
                crie uma conta
              </Link>
            </p>
          </div>
        </div>

        {/* Imagem Ilustrativa à Direita */}
        <div className="hidden md:block w-1/2">
          <Image
            src={SvgIlustration}
            alt="Job Illustration"
            className="w-full h-full  "
          />
        </div>
      </div>
    </>
  );
}
